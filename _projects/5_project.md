---
layout: page
title: Parameterized SIMD Processor for Matrix Operations
description: Fully parameterized SIMD processor with custom ISA for matrix arithmetic and hardware acceleration on FPGA
img: assets/img/SIMD_processor.png
importance: 5
category: work
related_publications: false
---

### Project Overview

This project presents the design and development of a **fully parameterized SIMD (Single Instruction, Multiple Data) processor** capable of executing **matrix multiplication**, **addition**, and **subtraction** using a **custom instruction set architecture (ISA)**.
The processor is implemented in **Verilog** and built around a **4-stage pipelined microarchitecture**, where each stage operates in a **multicycle mode** to optimize throughput and resource utilization.

This work demonstrates how **custom hardware architectures** can significantly accelerate **matrix-based computations**, combining the benefits of **SIMD parallelism**, **pipeline efficiency**, and **FPGA programmability**.

---

### Motivation

Matrix computations are central to numerous domains, including **machine learning**, **signal processing**, and **computer graphics**.
General-purpose CPUs often struggle to deliver real-time performance for such workloads due to limited data-level parallelism.

To address this, the project introduces a **custom SIMD processor** with a tailored ISA for matrix arithmetic.
By leveraging **FPGA hardware parallelism** and **customized instruction design**, the processor achieves **higher computational efficiency** and **lower latency** compared to software-only implementations.

---

### Key Features

* **Custom SIMD ISA:**
  Designed specifically for matrix operations (multiplication, addition, subtraction), maximizing throughput for data-parallel workloads.

* **4-Stage Pipelined Microarchitecture:**
  Pipeline stages include **Fetch**, **Decode**, **Execute**, and **Write-Back**, each supporting multicycle operation for performance optimization.

* **Parameterization:**
  Core datapath width, vector length, and instruction word size are fully configurable for scalability and design flexibility.

* **AXI & DMA Integration:**
  Incorporates **AXI interfaces** and **DMA controllers** for high-speed data transfer between processor and memory subsystems.

* **FPGA Deployment:**
  Implemented on the **ZYBO Z7 development board**, using **Xilinx Vivado** for design and synthesis, and **Vitis** for software-hardware integration.

---

### System Architecture

The processor architecture consists of the following major components:

1. **Instruction Fetch Unit (IFU)** — Retrieves instructions from memory via AXI interface.
2. **Decode & Control Unit** — Decodes custom SIMD instructions and issues control signals to execution units.
3. **Vector ALU (VALU)** — Performs parallel arithmetic operations on multiple data elements simultaneously.
4. **Pipeline Registers** — Maintain stage isolation and enable pipelined execution.
5. **Memory & DMA Controller** — Handles efficient data movement between the processor and on-chip memory.
6. **AXI Bus Interface** — Enables seamless communication with external memory and peripherals.

---

### Visualization & Gallery

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid 
        loading="eager" 
        path="assets/img/SIMD_processor.png" 
        title="Parameterized SIMD Processor Architecture" 
        class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="caption">
  Block diagram of the parameterized SIMD processor showing the 4-stage pipeline, vector ALU, and AXI-based memory interface for high-speed matrix computation.
</div>

<div class="row justify-content-sm-center mt-4">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid 
        loading="lazy" 
        path="assets/img/test_soc.jpg" 
        title="SIMD Processor Test Output on FPGA" 
        class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="caption">
  Test output captured from the ZYBO Z7 FPGA board — demonstrating correct execution of matrix multiplication, addition, and subtraction using the custom SIMD ISA.
</div>

---

### Technical Insights

| Component            | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| **Language**         | Verilog HDL                                                    |
| **Platform**         | ZYBO Z7 FPGA Board                                             |
| **Toolchain**        | Xilinx Vivado & Vitis                                          |
| **Processor Type**   | SIMD (Single Instruction, Multiple Data)                       |
| **Pipeline Stages**  | 4 (Fetch, Decode, Execute, Write-Back)                         |
| **ISA**              | Custom ISA optimized for matrix arithmetic                     |
| **Interfaces**       | AXI4 & DMA controller for data transfer                        |
| **Parameterization** | Configurable data width and vector length                      |
| **Applications**     | Matrix computation, hardware acceleration, parallel processing |

---

### Future Enhancements

* Extend the ISA to support **floating-point arithmetic** and **transcendental functions**.
* Implement **branch prediction** and **hazard detection** mechanisms for enhanced pipeline efficiency.
* Add **cache hierarchy** to improve memory bandwidth utilization.
* Explore **Chisel** or **SystemVerilog** reimplementation for higher abstraction and reuse.
* Integrate **software-level compiler support** for automatic SIMD instruction generation.

---

### Summary

This project delivers a **scalable and efficient SIMD processor** with a **custom matrix-oriented ISA**, **multicycle pipelining**, and **AXI/DMA integration**, showcasing deep expertise in **digital design**, **computer architecture**, and **FPGA-based acceleration**.
It bridges the gap between **hardware-level optimization** and **algorithmic computation**, providing a foundation for future research in **parallel computing**, **custom accelerators**, and **reconfigurable architectures**.

---

[View Project on GitHub](https://github.com/HirunaVishwamith/SIMD_Processor)

---

