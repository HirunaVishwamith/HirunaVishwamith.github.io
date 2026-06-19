---
layout: post
title: "An End-to-End Cache-Coherent, Out-of-Order RISC-V Multicore"
date: 2025-06-15 12:00:00-0530
description: Building a modular multicore RISC-V processor — out-of-order cores, a coherent cache hierarchy, and enough of a system to boot Linux — from RTL all the way to FPGA.
tags: computer-architecture risc-v fpga
categories: projects
giscus_comments: true
related_posts: false
---

Most undergraduate processor projects stop at a single in-order core running a handful of assembly tests. The project I led at the University of Moratuwa went the other way: a **modular, cache-coherent, out-of-order RISC-V multicore** that runs bare-metal C programs and **boots Linux images** — taken from RTL all the way down to FPGA.

### Why multicore, and why coherent

Single-core design teaches you the pipeline. Multicore design teaches you the parts of computer architecture that actually limit modern systems: **memory ordering, cache coherence, and the interconnect.** The moment you have two cores sharing memory, correctness stops being a property of one pipeline and becomes a property of the whole system. That's the regime real processors live in, and it's the regime I wanted to build in.

The design brings together:

- **Out-of-order cores** with register renaming and dynamic scheduling.
- A **coherent cache hierarchy** keeping per-core caches consistent under sharing.
- A **system** complete enough — interrupts, memory map, peripherals — to bring up a real OS rather than just toy binaries.

### From RTL to a board that boots an OS

Getting a design to simulate is one milestone; getting it to **boot Linux on an FPGA** is a different one entirely. It forces every loose end closed — privilege levels, exception handling, MMU behavior, device interaction. Doing that end-to-end is where a processor project stops being an exercise and becomes a real system you can stand behind.

### A family of related work

This multicore sits at the center of a cluster of projects I've built around the RISC-V ecosystem, each attacking a different layer:

- **[Chiron](https://github.com/HirunaVishwamith/Chiron)** — a teaching-grade out-of-order core whose every committed instruction is verified in lock-step against a golden model.
- A **multi-threaded RISC-V benchmark framework** for stressing multicore designs.
- A **parametric multi-core emulator** that boots both Linux and bare-metal programs.
- A **parameterized SIMD processor** with a custom ISA for matrix acceleration on FPGA.

Together they reflect how I like to work: pick a hard systems problem, build it from the silicon up, and don't call it done until it runs something real. The [projects page](/projects/) has the full write-ups.
