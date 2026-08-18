---
layout: page
title: Multi-threaded RISC-V Benchmark Framework
description: A portable and extensible RISC-V benchmark suite for multicore processors.
img: assets/img/mt-benchmark_profile.png
importance: 3
category: processors
github: https://github.com/HirunaVishwamith/Mt-Benchmark
related_publications: false
---


### Project Overview

This project focuses on developing a **multi-threaded RISC-V benchmark framework** designed to evaluate and compare the performance of **custom RISC-V multicore processors** and **emulator environments**. The framework integrates a set of **standard RISC-V benchmarks** as a foundation, with ongoing efforts to incorporate **multi-threaded and memory-intensive workloads** for more comprehensive testing.

The primary goal is to provide a **lightweight, extensible, and freestanding benchmarking environment** that can run on both **bare-metal RISC-V hardware** and **software simulators** without relying on an operating system.

**Benchmarks included:**  
`mt-matmul` | `mt-csaxpy` | `mt-vvadd` | `mt-histo` | `mt-masks-filter`

**Summary:**  
These benchmarks collectively evaluate various aspects of multicore performance — including **arithmetic throughput**, **memory bandwidth**, **cache utilization**, **load balancing**, and **synchronization efficiency**.  
Each test targets a distinct computational pattern:  
- `mt-vvadd` performs vector addition to test memory bandwidth and data-level parallelism.  
- `mt-csaxpy` stresses arithmetic pipelines through scalar-vector fused multiply-add operations.  
- `mt-histo` measures synchronization overhead and cache coherence under shared data access.  
- `mt-masks-filter` evaluates control divergence, branch prediction, and conditional data movement.  
- `mt-matmul` represents compute-intensive matrix multiplication to assess arithmetic throughput and cache locality.  

Together, these workloads provide a **balanced and realistic performance profile** across computation-heavy and memory-bound applications — making this suite a robust tool for benchmarking **RISC-V multicore architectures**.

---

### Motivation

As RISC-V continues to evolve as an open and modular ISA, there is a growing need for **flexible benchmarking tools** that can assess multicore performance under realistic workloads. Traditional benchmark suites often assume the presence of an OS or large runtime environment, making them unsuitable for early-stage hardware testing or custom simulators.

This framework was created to fill that gap, offering:

- A **freestanding benchmarking suite** that runs directly on hardware without OS support.
- **Multi-threaded test scenarios** to evaluate synchronization, communication, and load distribution.
- An easy path for developers to **extend the benchmark set** with their own workloads.

---

### Key Features

- **ISA Compatibility:**  
  Designed to compile with the **RISC-V I (integer), M (multiplication/division), and A (atomic)** extensions.  
  Additional support for **FENCE** and **CSR** instructions ensures compatibility with most standard processor configurations.

- **Multi-threaded Execution:**  
  Supports **parallel test workloads** that can be distributed across multiple cores, enabling the evaluation of thread management, synchronization primitives, and inter-core communication latency.

- **Freestanding Design:**  
  The benchmarks run **independently of any operating system**, making them suitable for **bare-metal testing**, early-stage processor bring-up, or **FPGA-based hardware verification**.

- **UART-based Output:**  
  Results and progress information are transmitted through **UART**, allowing users to view benchmark results directly in a **terminal** or collect data through logging scripts.

---

### System Architecture

The framework consists of three main components:

1. **Benchmark Library:**  
   Contains a set of standard RISC-V workloads (e.g., arithmetic, memory, synchronization tests).  
   Each benchmark can be compiled independently or linked into a multi-test binary.

2. **Thread Manager:**  
   Handles basic multi-threading by assigning benchmark tasks to different cores (harts).  
   It uses shared memory structures and atomic operations for synchronization.

3. **Output and Reporting Module:**  
   Encodes performance metrics (execution cycles, throughput, etc.) and sends formatted data over UART for external analysis.

---

### Visualization & Gallery

<div class="row justify-content-sm-center">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid 
        loading="eager" 
        path="assets/img/mt-benchmark-asm.png" 
        title="RISC-V assembly instructions for example test case" 
        class="img-fluid rounded z-depth-1" %}
  </div>

  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid 
        loading="eager" 
        path="assets/img/mt-benchmark.png" 
        title="UART result display" 
        class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="caption">
  Left: Example RISC-V assembly sequence used in a multi-threaded test case.  
  Right: UART terminal output showing benchmark execution and results.
</div>


---

### Technical Insights

- Modular codebase written in **C and RISC-V assembly** for fine-grained hardware control.  
- Thread management implemented using **atomic operations** from the RISC-V “A” extension.  
- Supports **build automation** via Makefiles using the `riscv64-unknown-elf-gcc` toolchain.  
- Designed for both **FPGA-based systems** and **cycle-accurate RISC-V emulators**.

---

### Future Enhancements

- Integration of **multi-threaded DSP kernels** and **machine learning workloads**.  
- Development of a **performance visualization tool** to plot metrics automatically.  
- Adding **cache and memory bandwidth tests** to better model realistic workloads.  
- Providing **JSON-based benchmark output** for easier scripting and automation.

---

### Tools & Technologies

| Component | Description |
|------------|-------------|
| **Language** | C, RISC-V Assembly |
| **Target Platform** | Bare-metal multicore RISC-V processors |
| **Output Interface** | UART (serial terminal) |
| **Toolchain** | RISC-V GCC (`riscv64-unknown-elf-gcc`) |
| **Supported Extensions** | I, M, A, CSR, FENCE |
| **Environment** | Emulator or FPGA hardware |

---

### Summary

This project delivers a **comprehensive and extensible benchmarking platform** for RISC-V processors, focusing on **multi-threaded performance evaluation**.  
By removing OS dependencies and providing direct hardware interfacing through UART, the framework offers a practical solution for both **hardware developers** and **researchers** interested in analyzing RISC-V core efficiency.

---

[View Project on GitHub](https://github.com/HirunaVishwamith/Mt-Benchmark")



