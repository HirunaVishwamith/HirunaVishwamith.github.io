---
layout: page
permalink: /research/
title: research
description: What I work on, why it matters, and where I want to take it.
nav: true
nav_order: 1
---

My research is in **computer architecture**, with a specific aim: **co-designing hardware and algorithms for efficient foundation-model computing.** Foundation models — large transformers and their successors — are now the dominant workload in computing, and their cost in compute, memory, and energy is growing far faster than general-purpose hardware can absorb. I believe the decisive gains will come not from the model or the hardware alone, but from **designing the two together** — shaping the architecture, the memory hierarchy, and the algorithm so they fit each other.

I approach this the way I approach everything: **from the RTL up**. I build and verify real processors and accelerators, so that my claims about efficiency are grounded in hardware that actually runs.

---

### Research interests

<div class="row">
  <div class="col-md-6">
    <h4>🧠 Processor microarchitecture</h4>
    <p>Out-of-order execution, branch prediction, cache coherence, and the verification methodology needed to trust an aggressive design — from a single core to a coherent multicore.</p>
  </div>
  <div class="col-md-6">
    <h4>⚡ Reconfigurable & accelerated computing</h4>
    <p>FPGA and CGRA architectures for AI and scientific workloads, where custom datapaths and memory hierarchies unlock performance that general-purpose hardware cannot reach.</p>
  </div>
</div>
<div class="row mt-3">
  <div class="col-md-6">
    <h4>🧮 Memory systems & dataflow</h4>
    <p>The memory wall is the binding constraint for modern AI: attention is memory-bound and energy is dominated by data movement. I work on memory hierarchies, on-chip dataflow, and bandwidth-aware accelerator design.</p>
  </div>
  <div class="col-md-6">
    <h4>🛠️ HW–algorithm co-design for foundation models</h4>
    <p>My core aim: co-designing architectures and algorithms for efficient foundation-model computing — making large transformers and their successors tractable in compute, memory, and energy.</p>
  </div>
</div>

---

### Research statement

Modern computing is increasingly **bottlenecked not by algorithms but by the hardware that executes them**. The most consequential performance and efficiency gains now come from designing the architecture and the workload together, rather than treating hardware as a fixed substrate. My research pursues that co-design across three layers.

**At the processor level**, I build and verify real microarchitectures. With **[Chiron](/projects/)**, I designed a fully out-of-order RV64IMA core — register renaming, TAGE branch prediction, a non-blocking coherent cache hierarchy — and proved it correct *instruction by instruction* in lock-step against a golden model, to the point of booting Linux. I led a related effort building an **end-to-end cache-coherent, out-of-order multicore RISC-V** processor from RTL to FPGA. These projects taught me that the hard, interesting problems in architecture — memory ordering, speculation, coherence, and the verification that keeps them honest — are exactly where the field's open questions live.

**At the acceleration level**, I design reconfigurable hardware for workloads that punish general-purpose machines. At NUS I implemented a **3DRA CGRA on FPGA running at 650 MHz** and optimized communication for a **100 Gbps TCP/IP offload engine**; I have built a parameterized SIMD processor with a custom ISA for matrix acceleration, and at Apex Compute I now design hardware accelerators for LLM workloads.

**At the model level**, my published work maps modern AI onto custom and emerging hardware: hardware-accelerated **transformers** for real-time battery state-of-health estimation, and **neuromorphic** computing — spiking networks merged with attention — for audio signal processing, FPGA-based particle physics, and CFD. This work has appeared at **IEEE HPEC, CHEP, ISARC, and INTCEC**.

**Where I want to go.** I want to pursue a PhD focused on **co-designing hardware and algorithms for efficient foundation-model computing.** The cost of large models is now an architecture problem: attention is memory-bound, inference is latency-critical, and energy is the binding constraint at scale. I want to attack this from both sides at once — rethinking accelerators, memory hierarchies, and dataflows alongside the algorithms (quantization, sparsity, and attention variants) that run on them — and to keep the resulting designs *verifiable and trustworthy* by construction, not just fast in the common case. My experience building and verifying real processors and accelerators from RTL up is what lets me pursue that co-design credibly, in hardware rather than only in simulation.

---

### Selected work

- **[Chiron — verified out-of-order RISC-V](/projects/)** · a teaching-grade OoO core proven correct in lock-step, boots Linux. <a href="https://github.com/HirunaVishwamith/Chiron">code</a>
- **[Cache-coherent OoO multicore RISC-V](/projects/)** · RTL → FPGA, boots Linux in multicore mode.
- **[ASTRA — physics-accurate LEO network simulation](/projects/)** · validated to machine precision. <a href="https://github.com/HirunaVishwamith/ASTRA">code</a>
- **[Publications](/publications/)** · 5 peer-reviewed papers on hardware-accelerated transformers and neuromorphic computing.

<div class="mt-3">
  <a class="btn btn-sm z-depth-0" role="button" href="/publications/">View publications</a>
  <a class="btn btn-sm z-depth-0" role="button" href="/projects/">View projects</a>
  <a class="btn btn-sm z-depth-0" role="button" href="/cv/">View CV</a>
</div>
