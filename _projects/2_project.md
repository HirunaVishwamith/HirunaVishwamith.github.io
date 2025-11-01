---
layout: page
title: Cache-Coherent, Out-of-Order RISC-V Multicore Processor
description: A modular, cache-coherent RISC-V out-of-order multicore processor capable of running bare-metal workloads and Linux images.
img: assets/img/main_hq.png
importance: 1
category: work
related_publications: false
---

### Project Overview

This project presents a **modular out-of-order (OoO) multicore RISC-V processor** designed for **research and academic exploration** of modern microarchitectural concepts.  
Built entirely using the **Chisel hardware description language**, the processor evolves from a **single-core out-of-order design** into a **cache-coherent multicore system** that prioritizes **scalability, modularity, and educational accessibility**.

The architecture integrates multiple OoO cores, each equipped with private Level 1 caches, and a shared coherent Level 2 cache maintained through a **snoopy-based AXI-ACE cache coherence protocol**.  
Performance is further enhanced by a **TAGE (Tagged Geometric History Length) branch predictor**, a state-of-the-art mechanism for reducing pipeline stalls and improving fetch efficiency.

The system includes **simulation, emulation, and FPGA deployment**, forming a unified framework for studying performance, memory coherence, and instruction-level parallelism.

---

### Motivation

The growing complexity of modern processors makes it increasingly difficult for academic environments to support realistic hardware experimentation.  
Many universities lack platforms capable of testing **out-of-order multicore architectures**, which are fundamental to both **high-performance** and **energy-efficient embedded systems**.

This project addresses that limitation by providing an **open, flexible, and FPGA-deployable RISC-V multicore platform**, enabling:

- Exploration of **advanced out-of-order and speculative execution**  
- Hands-on experimentation with **cache coherence and synchronization**  
- **Educational and research use** in teaching computer architecture and systems design  

By bridging theoretical understanding and real hardware implementation, this platform serves as a robust foundation for both **teaching** and **research innovation**.

---

### Key Features

- **Out-of-Order Multicore Architecture**  
  Multiple RISC-V OoO cores interconnected through a coherent cache and memory hierarchy.

- **Cache Coherence via AXI-ACE**  
  Implements a **snoopy-based coherence protocol** to maintain data consistency across cores.

- **Advanced Branch Prediction**  
  Features a **two-stage TAGE predictor**, improving IPC by reducing branch mispredictions.

- **Chisel-based Modular Design**  
  Enables quick reconfiguration of microarchitectural components and experimentation with new designs.

- **Complete Verification Flow**  
  Includes a **cycle-accurate C++ simulator**, a **multi-core emulator** capable of running μCLinux, and **FPGA deployment** for hardware validation.

---

### System Architecture

The processor comprises several tightly integrated components:

1. **Out-of-Order Core (per hart)**  
   Each core supports speculative and dynamic instruction scheduling, with private L1 instruction and data caches.

2. **Shared L2 Cache**  
   A coherent, banked Level-2 cache shared among all cores, ensuring low-latency inter-core data access.

3. **Coherent Interconnect**  
   Implements a **snoopy-based AXI-ACE interconnect**, managing coherence traffic and synchronization efficiently.

4. **Fetch & Branch Prediction Unit**  
   Enhanced with a **TAGE branch predictor** to improve front-end throughput across all threads.

5. **Simulation & FPGA Framework**  
   The full stack supports cycle-accurate simulation, emulation, and synthesis on FPGA platforms.

---

### Visualization & Gallery

<div class="row justify-content-sm-center">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid 
        loading="eager" 
        path="assets/img/main_hq.png" 
        title="Full multicore RISC-V architecture" 
        class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid 
        loading="eager" 
        path="assets/img/core_hq.png" 
        title="Architecture of a single out-of-order core" 
        class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="caption">
  Left: Overview of the multicore RISC-V system with shared memory hierarchy.  
  Right: Internal microarchitecture of a single out-of-order core, including pipeline and buffers.
</div>

---

<div class="row justify-content-sm-center">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid 
        loading="eager" 
        path="assets/img/dcache_hq.png" 
        title="Private L1 Data Cache" 
        class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid 
        loading="eager" 
        path="assets/img/L2_hq.png" 
        title="Shared L2 Cache" 
        class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="caption">
  Left: Per-core private data cache with coherence logic.  
  Right: Shared L2 cache ensuring data consistency and efficient access across cores.
</div>

---

<div class="row justify-content-sm-center">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid 
        loading="eager" 
        path="assets/img/interconect_hq.png" 
        title="AXI-ACE Coherent Interconnect" 
        class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid 
        loading="eager" 
        path="assets/img/Frontend_hq.png" 
        title="Instruction Fetch Unit with TAGE Predictor" 
        class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="caption">
  Left: Coherent interconnect maintaining cache and memory consistency via ACE transactions.  
  Right: Enhanced fetch unit with integrated TAGE branch predictor for improved front-end performance.
</div>

---

### Technical Insights

| Component | Description |
|------------|-------------|
| **HDL** | Chisel (Scala-based hardware construction language) |
| **ISA** | RISC-V RV64IMAFDC with atomic and coherence extensions |
| **Cache System** | L1 (private) and L2 (shared) with snoopy-based coherence |
| **Branch Predictor** | Two-stage TAGE predictor |
| **FPGA Target** | AMD Virtex UltraScale+ (VCU118) |
| **Clock Frequency** | 40 MHz |
| **Simulation Tools** | Custom cycle-accurate C++ simulator |
| **Emulation OS** | μCLinux |
| **Benchmarks** | Standard multicore RISC-V suite (`mt-matmul`, `mt-vvadd`, etc.) |

Performance evaluation demonstrated **functional correctness and near-linear scalability** for compute-bound workloads.  
For example, **matrix multiplication achieved a 3.92× speedup** on a quad-core configuration compared to a single-core baseline.

---

### Future Enhancements

- Integration of **heterogeneous core configurations** for asymmetric processing.  
- Addition of **non-blocking caches** and speculative memory access support.  
- Development of **performance profiling and visualization utilities**.  
- Expansion toward **chiplet-based or cluster-level coherence**.  
- Inclusion of **hardware-managed synchronization primitives** for multi-threaded applications.

---

### Summary

This project introduces a **comprehensive RISC-V multicore research platform** that unites modular Chisel design, hardware coherence, and FPGA validation.  
It provides a tangible framework for studying **out-of-order execution**, **memory hierarchy behavior**, and **cache coherence mechanisms**.  

By integrating a **TAGE branch predictor**, **AXI-ACE protocol**, and **FPGA-ready verification flow**, it serves as a **practical bridge between theoretical architecture and real-world hardware design** — empowering both education and research in next-generation processor systems.

<!-- --- -->

<!-- [View Project on GitHub](https://github.com/YourUsername/OoO-Multicore-RISCV) -->

