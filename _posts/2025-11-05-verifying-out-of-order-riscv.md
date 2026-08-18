---
layout: post
title: "Verifying an Out-of-Order RISC-V Core in Lock-Step"
date: 2025-11-05 09:00:00-0700
description: How Chiron proves a speculative, out-of-order, quad-core processor correct — instruction by instruction, on every hart — against a golden model, without sacrificing readability.
tags: computer-architecture risc-v verification
categories: projects
giscus_comments: true
related_posts: false
featured: true
thumbnail: assets/img/chiron.png
---

Out-of-order (OoO) execution is the engine behind essentially every high-performance processor shipped today — and it is also the part of computer architecture that is hardest to learn by building. Register renaming, dynamic wake-up/select, precise exceptions through a reorder buffer, memory ordering: these are exactly the mechanisms that simplified teaching cores leave out. So when I built **[Chiron](https://github.com/HirunaVishwamith/Chiron)**, a 64-bit OoO RISC-V processor in Chisel, I set myself a constraint that most educational cores quietly avoid: **it had to be provably correct, not just "passes a few tests."**

### The problem with "it seems to work"

A speculative OoO machine has an enormous state space. Instructions execute in one order and retire in another; branches are predicted and rolled back; loads and stores reorder around each other. Directed tests catch the bugs you thought of. They say nothing about the ones you didn't — and in OoO design, the bugs you didn't think of are the whole game.

### Lock-step against a golden model

Chiron's answer is **lock-step co-simulation**. Alongside the RTL runs a golden C++ architectural model — a simple, obviously-correct, in-order reference implementation of RV64IMA. Every time the RTL **commits** an instruction, the harness steps the golden model by one instruction and compares the full architectural state: register file, program counter, and memory effects.

The moment they disagree, simulation halts **at the exact offending instruction**. There is no "the test failed somewhere in the last million cycles" — you get the precise PC, the expected value, and the observed value. This turns debugging an OoO pipeline from archaeology into a pinpoint operation.

The payoff:

- **All 84 official RISC-V ISA tests pass.**
- The processor **boots Linux SMP** on four harts, all the way to an interactive shell.
- It runs bare-metal workloads with cycle-accurate, continuously-verified correctness.

### Four harts make it harder, and more worth doing

Chiron is now a **quad-core** machine: four independent OoO harts sharing a non-blocking L2 behind an AXI-ACE coherent interconnect. Lock-step runs in 4-hart mode too, which matters more than it sounds. A coherence bug does not announce itself — it produces a plausible-looking wrong number, thousands of cycles after the protocol actually misbehaved. Checking all four harts against the golden model on every commit turns that class of bug back into what single-core lock-step gives you: a halt, at an exact instruction, on an exact core.

The practical obstacle was speed. A Linux boot is roughly three billion RTL cycles; the Verilated model runs at ~40 K cycles/s multithreaded, so a boot is a day's work — and it checkpoints, so it is a day _once_.

### Why this is the interesting part

The conventional wisdom is that you trade rigor for clarity: an industrial verified core is unreadable, and a readable teaching core isn't really verified. Chiron's microarchitecture is genuinely aggressive — 64-entry physical register file, an 8-entry issue queue with wake-up logic, a 16-entry reorder buffer, precise in-order commit, and a 4-table TAGE predictor over a bimodal base, sitting on a non-blocking, MSHR-backed cache hierarchy — yet **every committed instruction is checked**. The design shows that pedagogical transparency and verification rigor are not opposites; the same structure that makes the RTL easy to read makes it easy to verify.

If you want to see it run, `make fire` renders a bare-metal Doom-fire effect straight from the core's UART on live RTL. There's something clarifying about watching embers scroll up a terminal and knowing that every instruction behind them was checked against a golden model.

[Explore Chiron on GitHub →](https://github.com/HirunaVishwamith/Chiron) · [Full project write-up →]({{ '/projects/chiron/' | relative_url }})
