---
layout: post
title: "An End-to-End Cache-Coherent, Out-of-Order RISC-V Multicore"
date: 2025-06-15 12:00:00-0530
description: How a final-year project — out-of-order cores, a coherent cache hierarchy, and enough of a system to boot Linux — went from Chisel RTL onto an FPGA, and became the processor I now call Chiron.
tags: computer-architecture risc-v fpga
categories: projects
giscus_comments: true
related_posts: false
---

Most undergraduate processor projects stop at a single in-order core running a handful of assembly tests. The project I led at the University of Moratuwa went the other way: a **modular, cache-coherent, out-of-order RISC-V multicore** that runs bare-metal C programs and **boots Linux images** — taken from Chisel RTL all the way down to an FPGA.

That design is the ancestor of what is now [**Chiron**]({{ '/projects/chiron/' | relative_url }}), the quad-core processor described elsewhere on this site. This post is about the first half of the story: why multicore, and what it costs to make one real.

### Why multicore, and why coherent

Single-core design teaches you the pipeline. Multicore design teaches you the parts of computer architecture that actually limit modern systems: **memory ordering, cache coherence, and the interconnect.** The moment you have two cores sharing memory, correctness stops being a property of one pipeline and becomes a property of the whole system. That's the regime real processors live in, and it's the regime I wanted to build in.

The design brings together:

- **Out-of-order cores** with register renaming and dynamic scheduling.
- A **coherent cache hierarchy** keeping per-core caches consistent under sharing.
- A **system** complete enough — interrupts, memory map, peripherals — to bring up a real OS rather than just toy binaries.

### From RTL to a board that boots an OS

Getting a design to simulate is one milestone; getting it to **boot Linux on an FPGA** is a different one entirely. It forces every loose end closed — privilege levels, exception handling, MMU behavior, device interaction. Doing that end-to-end is where a processor project stops being an exercise and becomes a real system you can stand behind.

### What it grew into

The FPGA bring-up was the end of the coursework and the beginning of the interesting part. Everything after it went into [**Chiron**]({{ '/projects/chiron/' | relative_url }}): four out-of-order harts behind an AXI-ACE coherent interconnect, a 4-table TAGE frontend, 164 hardware performance counters, **Linux SMP booting to an interactive shell**, and — the part I care most about — every committed instruction checked in lock-step against a golden C++ model, on all four harts. I wrote about that verification methodology [here]({{ '/blog/2025/verifying-out-of-order-riscv/' | relative_url }}).

Around it sits a cluster of supporting work, each attacking a different layer:

- A **[multi-threaded RISC-V benchmark framework]({{ '/projects/riscv-benchmark-suite/' | relative_url }})** for stressing multicore designs.
- A **[parametric multi-core emulator]({{ '/projects/riscv-multicore-emulator/' | relative_url }})** that boots both Linux and bare-metal programs — and doubles as the golden model.
- A **[parameterized SIMD processor]({{ '/projects/simd-matrix-processor/' | relative_url }})** with a custom ISA for matrix acceleration on FPGA.

Together they reflect how I like to work: pick a hard systems problem, build it from the silicon up, and don't call it done until it runs something real. The [projects page]({{ '/projects/' | relative_url }}) has the full write-ups.
