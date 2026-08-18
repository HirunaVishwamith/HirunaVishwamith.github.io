---
layout: page
title: Parametric RISC-V multi-core emulator
description: RISC-V multi-core emulator capable of booting both Linux and bare-metal programs
img: assets/img/multi_core.png
importance: 2
category: processors
github: https://github.com/HirunaVishwamith/fyp18-riscv-emulator
related_publications: false
---

### Project Overview

This project showcases the development of a **RISC-V multi-core emulator** capable of booting both **Linux** and **bare-metal programs**.  
It represents a major step toward a **full-system simulation platform** for **multi-core RISC-V architectures**, offering a controlled environment for testing kernel-level and hardware-interaction behaviors.

The emulator successfully boots **Linux in a multi-core configuration**, demonstrating support for **Symmetric Multi-Processing (SMP)**.  
It integrates key RISC-V components such as the **CLINT (Core Local Interruptor)** for managing **inter-core timer and software interrupts**, enabling synchronization and scheduling between multiple processor cores.

---

### Motivation

Building and validating real RISC-V hardware can be both costly and time-consuming.  
To accelerate development and testing of multicore systems, this project provides a **software emulator** that mirrors realistic hardware behavior — including **interrupt handling**, **multi-core startup**, and **OS-level interactions**.

The goal is to deliver a **functional, cycle-accurate simulation framework** that researchers and developers can use to study:

- Multi-core boot flows under Linux  
- Interrupt delivery and timer management via CLINT  
- Synchronization mechanisms and inter-core communication  
- Bare-metal program execution without OS dependencies  

---

### Key Features

- **Multi-core RISC-V Emulation:**  
  Supports multiple cores executing concurrently, managed by a central scheduler.

- **Linux and Bare-metal Booting:**  
  Capable of running both **SMP Linux kernels** and standalone RISC-V programs.

- **CLINT Integration:**  
  Implements a **Core Local Interruptor** that handles **timer** and **software interrupts**, ensuring correct Linux kernel operation in multi-core mode.

- **Device Tree Customization:**  
  A carefully constructed **Device Tree Blob (DTB)** accurately describes the hardware topology — including cores, memory map, and interrupts — for correct OS-level initialization.

- **Simplified Debug Environment:**  
  The Linux image was configured **without an MMU**, allowing direct memory access for easier debugging and verification of system calls and context switching.

---

### System Architecture

The emulator architecture is composed of several main components:

1. **CPU Core Instances** — Multiple RISC-V harts running in parallel, each with its own register file and CSR state.  
2. **CLINT (Core Local Interruptor)** — Manages per-core timer and software interrupts for SMP operation.  
3. **Memory Subsystem** — Provides a unified address space shared among all harts.  
4. **Device Tree Interface** — Passes hardware configuration details to the booting Linux kernel.  
5. **Boot Manager** — Handles system initialization and core startup sequencing.

---

### Visualization & Gallery

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid 
        loading="eager" 
        path="assets/img/multi_core.png" 
        title="RISC-V Multi-core Emulator Booting Linux" 
        class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="caption">
  Multi-core RISC-V emulator running Linux SMP initialization — showing multiple cores successfully booted and synchronized via CLINT.
</div>

---

### Technical Insights

| Component | Description |
|------------|-------------|
| **Language** | C++ |
| **Architecture** | Multi-core RISC-V (RV64) |
| **Key Module** | CLINT – Core Local Interruptor for timer and software interrupts |
| **OS Support** | Linux (SMP) and bare-metal |
| **Device Tree** | Custom DTB describing multi-core topology |
| **MMU** | Disabled for simplified hardware interaction |
| **Output Interface** | UART console |
| **Use Case** | Kernel testing, interrupt handling validation, and multicore boot studies |

---

### Future Enhancements

- Add **PLIC (Platform-Level Interrupt Controller)** for external interrupt support.  
- Introduce **MMU support** to boot standard Linux distributions with virtual memory.  
- Integrate **performance counters** for benchmarking emulator efficiency.  
- Expand device support (e.g., UART, GPIO, SPI) for more complete system modeling.  
- Develop a **visual debugging interface** for stepwise core execution and interrupt tracing.

---

### Summary

This project delivers a **functional and modular RISC-V multi-core emulator** designed for exploring and validating **multi-core system behavior under Linux**.  
By integrating CLINT-based interrupt handling, a customized device tree, and support for both bare-metal and SMP Linux booting, it provides a powerful tool for **researchers, developers, and students** studying multi-core RISC-V architectures.

It bridges the gap between simulation and real hardware, enabling **early-stage OS testing and microarchitectural exploration** before physical prototypes exist.

---

[View Project on GitHub](https://github.com/HirunaVishwamith/fyp18-riscv-emulator)

