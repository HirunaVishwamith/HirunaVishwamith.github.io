---
layout: page
permalink: /research/
title: research
description: Co-designing hardware and algorithms for efficient foundation-model computing.
nav: true
nav_order: 1
---

Foundation models are now the dominant workload in computing, and their cost in compute, memory, and energy is growing faster than general-purpose hardware can absorb. My research argues that the decisive gains will not come from the model or the machine alone, but from **designing the two against each other** — shaping the microarchitecture, the memory hierarchy, and the algorithm so that each is chosen in light of the others.

I work on this from the register-transfer level upward. Every claim I make about efficiency is grounded in hardware that has been built, verified, and measured — a processor that boots an operating system, an accelerator model checked against published silicon — rather than in simulation results alone.

---

## Research themes

<div class="research-themes row">
  <div class="col-md-6">
    <div class="theme">
      <h4>Processor microarchitecture</h4>
      <p>Out-of-order execution, speculation, branch prediction, and cache coherence — together with the verification methodology required to trust an aggressive design, from a single core to a coherent multicore running SMP Linux.</p>
    </div>
  </div>
  <div class="col-md-6">
    <div class="theme">
      <h4>Reconfigurable and accelerated computing</h4>
      <p>FPGA and CGRA architectures for AI and scientific workloads, where custom datapaths and application-specific memory hierarchies reach efficiencies that general-purpose hardware structurally cannot.</p>
    </div>
  </div>
  <div class="col-md-6">
    <div class="theme">
      <h4>Memory systems and dataflow</h4>
      <p>The memory wall is the binding constraint on modern AI: attention is memory-bound, and energy is dominated by data movement rather than arithmetic. I study memory hierarchies, on-chip dataflow, and bandwidth-aware accelerator design.</p>
    </div>
  </div>
  <div class="col-md-6">
    <div class="theme">
      <h4>Hardware–algorithm co-design</h4>
      <p>Quantization, sparsity, and attention variants change what the ideal machine looks like; the machine, in turn, decides which of them are worth having. I treat the two as a single design problem.</p>
    </div>
  </div>
</div>

---

## Research statement

Computing is increasingly bottlenecked not by algorithms but by the hardware that executes them. Treating that hardware as a fixed substrate leaves most of the available efficiency on the table. My work pursues co-design across three levels of the stack.

### At the processor level

I build and verify real microarchitectures. **[Chiron]({{ '/projects/chiron/' | relative_url }})** is a quad-core out-of-order RV64IMA processor in Chisel: register renaming and dynamic scheduling per core, a four-table TAGE frontend, and split L1 caches behind an AXI-ACE coherent interconnect and a shared non-blocking L2. It is verified in lock-step against a golden C++ model — _every committed instruction, on every hart_ — passes all 84 official RISC-V ISA tests, boots Linux SMP to an interactive shell, and has been deployed to FPGA. It grew out of the final-year multicore project I led at the University of Moratuwa.

Building it established the conviction behind the rest of my work: the hard problems in architecture — memory ordering, speculation, coherence, and the verification that keeps them honest — are inseparable, and a design is only as credible as the evidence that it is correct.

### At the acceleration level

I design and model hardware for workloads that punish general-purpose machines. At the National University of Singapore I implemented a **3DRA CGRA on FPGA operating at 650 MHz** and optimized data communication for a **100 Gbps TCP/IP offload engine**. I have built a parameterized **[SIMD matrix processor]({{ '/projects/simd-matrix-processor/' | relative_url }})** with a custom ISA, and **[Talos]({{ '/projects/talos/' | relative_url }})**, a cycle-accurate systolic-array simulator that accounts for every MAC, wire hop, and picojoule, and reproduces published TPUv1 throughput to within a fraction of a percent. Talos is how I reason about dataflow, sparsity, and the memory wall before committing anything to RTL. At Apex Compute I currently design hardware accelerators for LLM workloads.

### At the model level

My published work maps modern AI onto custom and emerging hardware: hardware-accelerated **transformers** for real-time battery state-of-health estimation, and **neuromorphic** computing — spiking networks merged with transformer attention — for audio signal processing, FPGA-based particle physics, and computational fluid dynamics. This work has appeared at **IEEE HPEC**, **CHEP**, **ISARC**, and **INTCEC**.

---

## Direction

I intend to pursue a PhD on **co-designing hardware and algorithms for efficient foundation-model computing**. The cost of large models has become an architecture problem: attention is memory-bound, inference is latency-critical, and energy is the binding constraint at scale. I want to attack it from both sides at once — rethinking accelerators, memory hierarchies, and dataflows alongside the algorithms that run on them — while keeping the resulting designs _verifiable by construction_, not merely fast in the common case.

Experience building and verifying real processors and accelerators from the RTL up is what makes that agenda credible to me: it is the difference between proposing an architecture and knowing what it costs to make one work.

---

## Selected work

| Work                                   | Contribution         |
| -------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \*\*[Chiron]({{ '/projects/chiron/'    | relative_url }})\*\* | Quad-core out-of-order RISC-V processor; lock-step verified, boots Linux SMP, deployed to FPGA. [Code](https://github.com/HirunaVishwamith/Chiron)              |
| \*\*[Talos]({{ '/projects/talos/'      | relative_url }})\*\* | Cycle-accurate systolic-array simulator for dataflow, sparsity, and energy analysis; validated against TPUv1. [Code](https://github.com/HirunaVishwamith/Talos) |
| \*\*[ASTRA]({{ '/projects/astra/'      | relative_url }})\*\* | Physics-accurate LEO satellite-network simulator in C11, validated to machine precision. [Code](https://github.com/HirunaVishwamith/ASTRA)                      |
| \*\*[Publications]({{ '/publications/' | relative_url }})\*\* | Five peer-reviewed papers on hardware-accelerated transformers and neuromorphic computing.                                                                      |
