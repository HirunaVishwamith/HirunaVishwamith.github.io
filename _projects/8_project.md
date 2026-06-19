---
layout: page
title: "Chiron: An Out-of-Order RISC-V Processor"
description: A fully verified, teaching-grade out-of-order RV64IMA core in Chisel that boots Linux and proves correctness in lock-step against a golden model.
img: assets/img/chiron.png
importance: 1
category: work
related_publications: false
---

### Project Overview

**Chiron** is a complete, fully-verified **64-bit out-of-order (OoO) RISC-V processor** written in **Chisel**. It was built to answer a question that sits at the heart of computer-architecture education and research: _can a microarchitecture be simultaneously aggressive enough to be interesting, transparent enough to teach from, and rigorous enough to trust?_

Most educational cores force a compromise — either a simplified in-order pipeline that hides the mechanisms that make modern CPUs fast, or an opaque industrial design that is impossible to read. Chiron rejects that trade-off. It implements a modern speculative, out-of-order machine with register renaming, dynamic scheduling, and a coherent multi-level cache hierarchy, while keeping **every line of RTL readable and every committed instruction verified** against a golden C++ reference model.

The result is a processor that **boots Linux** and runs bare-metal graphics demos, yet whose architectural state is checked **cycle-by-cycle, instruction-by-instruction** for correctness.

---

### Motivation

Out-of-order execution is the foundation of essentially every high-performance processor shipped today, yet it is notoriously difficult to learn by building. The hard parts — renaming, wake-up/select logic, precise exceptions through a reorder buffer, and memory ordering — are exactly the parts that simplified teaching cores omit.

Chiron was designed to close that gap. The goals were deliberate:

- **Transparency** — clean, well-structured Chisel that a student or researcher can read, modify, and extend.
- **Realism** — a genuine OoO pipeline with speculation and a coherent memory system, not a toy.
- **Provable correctness** — confidence backed by lock-step verification rather than spot-checked test cases.

---

### Microarchitecture

Chiron implements the **RV64IMA** ISA on a classic modern pipeline — _fetch → decode/rename → issue → execute → memory → commit_ — where execution is fully decoupled from in-order retirement.

| Stage / Unit            | Design                                                                 |
| ----------------------- | --------------------------------------------------------------------- |
| **Register renaming**   | 64-entry physical register file eliminating false dependencies         |
| **Issue**               | Centralized 8-entry issue queue with dynamic wake-up logic              |
| **Reorder buffer**      | 16-entry ROB enabling out-of-order execution with precise commit        |
| **Commit**              | 4-wide, in-order retirement preserving architectural state              |
| **Integer / Mul-Div**   | Radix-4 divider (2 bits/cycle) alongside the integer ALU pipeline       |

**Branch prediction** is a two-level effort: a **bimodal predictor** paired with a 2-way, 64-set **BTB** for fast steering, backed by a **4-table TAGE predictor** with geometrically varying history lengths for accuracy on hard-to-predict branches.

**Memory subsystem:**

- Split **L1 instruction/data caches** (2-way, 64 sets each)
- A **non-blocking L2 cache** with **MSHRs** for multiple outstanding misses and **pseudo-LRU** replacement
- An **ACE-compatible coherent interconnect**, laying the groundwork for multicore coherence

---

### Verification — The Core Contribution

Chiron's defining feature is its verification methodology. Rather than relying on a handful of directed tests, the processor runs in **lock-step against a golden C++ architectural model**: after **every committed instruction**, the RTL's architectural state (register file, PC, memory) is compared against the reference. Any divergence halts simulation at the exact offending instruction.

- ✅ **All 84 official RISC-V ISA tests pass**
- ✅ **Boots Linux** end-to-end
- ✅ Runs bare-metal workloads with **cycle-accurate** correctness

This approach demonstrates that **pedagogical clarity and verification rigor are not in conflict** — the same design that is easy to read is also provably correct.

---

### Performance

Performance was improved through staged microarchitectural optimization, with each step measured rather than assumed:

- **0.272 IPC** on a vector-add workload — a **2.18× improvement** over the baseline through successive scheduling and memory optimizations
- Target operating frequency of **75 MHz**
- Profiling shows the remaining bottlenecks are **latency-bound** (load and divide latency), **not width-limited** — a precise, data-driven characterization that points directly at the next round of improvements

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/chiron_profile.png" title="Chiron performance profiling report" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Profiling report tracking IPC across optimization stages, isolating latency-bound load and divide behavior as the dominant remaining bottleneck.
</div>

---

### Demonstration

To show the core running real, observable workloads on RTL, Chiron renders a **bare-metal "Doom-fire" effect directly from the processor's UART** — an 80×50 grid of half-block glyphs with scrolling embers, computed entirely on the simulated hardware (`make fire`).

<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/chiron_fire.gif" title="Bare-metal fire effect rendered live on Chiron RTL via UART" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  A real-time fire effect rendered live from the core's UART on actual RTL — a tangible demonstration of correct, end-to-end execution.
</div>

---

### Technical Summary

| Aspect              | Detail                                                              |
| ------------------- | ------------------------------------------------------------------ |
| **ISA**             | RV64IMA (64-bit RISC-V, integer + multiply/divide)                 |
| **Microarch.**      | Out-of-order, speculative, register-renamed                        |
| **HDL**             | Chisel 3.5.4 (Scala-based)                                          |
| **Simulation**      | Verilator                                                          |
| **Golden model**    | C++ architectural reference for lock-step verification              |
| **Build**           | SBT + Make-driven orchestration                                    |
| **Verification**    | Per-instruction lock-step; all 84 RISC-V ISA tests pass            |
| **Milestones**      | Boots Linux; runs bare-metal graphics demos                        |

---

### Skills Demonstrated

Out-of-order microarchitecture · register renaming & dynamic scheduling · branch prediction (bimodal, BTB, TAGE) · non-blocking caches & MSHRs · cache coherence (ACE) · Chisel/Scala RTL design · Verilator-based verification · golden-model co-simulation · performance profiling & optimization · RISC-V toolchain and Linux bring-up.

---

[View Chiron on GitHub](https://github.com/HirunaVishwamith/Chiron)

---
