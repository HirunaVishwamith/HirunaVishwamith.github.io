---
layout: page
title: Parallel System Bus on FPGA
description: Multi-master, multi-slave bus architecture enabling efficient parallel communication on DE0-Nano FPGA
img: assets/img/system_bus.jpg
importance: 4
category: work
related_publications: false
---

### Project Overview

This project presents the design and implementation of a **parallel system bus** on the **DE0-Nano FPGA board**, developed using **Verilog** and **Intel Quartus Prime**.
The architecture enables **parallel communication** between **two master devices** and **three slave devices**, supporting efficient **data transfer** and **resource sharing** across the system.

Through careful design and verification, this bus infrastructure provides a scalable and modular foundation for **multi-master embedded systems**, where multiple hardware modules can operate and communicate concurrently.

---

### Motivation

Modern embedded and FPGA-based systems often integrate multiple processing and peripheral modules that require efficient communication and shared access to resources.
Traditional single-master buses can create **bottlenecks**, limiting parallelism and throughput.

This project addresses that challenge by creating a **multi-master, multi-slave bus** that supports **parallel communication** and **conflict-free arbitration**, enabling smooth and deterministic data exchange between multiple components in real time.

---

### Key Features

* **Multi-Master, Multi-Slave Architecture:**
  Supports two masters and three slaves operating concurrently, enabling **parallel data transactions**.

* **Verilog Implementation:**
  Entire design written in **Verilog HDL**, ensuring portability and efficient hardware synthesis.

* **FPGA Deployment:**
  Implemented and tested on the **Intel DE0-Nano FPGA board**, using **Quartus Prime** for synthesis, timing analysis, and programming.

* **Real-Time Debugging:**
  Integrated with **In-System Memory Content Editor** for live memory inspection, aiding real-time monitoring and debugging.

* **Pre-Hardware Verification:**
  Verified functionality using **Verilator**, ensuring correctness and robustness before FPGA deployment.

---

### System Architecture

The system bus architecture is composed of several core modules:

1. **Bus Arbiter** — Manages access from multiple masters, ensuring fair and deterministic bus usage.
2. **Master Interfaces** — Two master devices initiate read/write transactions concurrently.
3. **Slave Interfaces** — Three slave modules handle requests from any master via the shared bus.
4. **Shared Data and Address Lines** — Enable synchronized and parallel data transfer across the system.
5. **Debug and Monitoring Interface** — Provides in-system visibility into bus transactions and memory states.

---

### Visualization & Gallery

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid 
        loading="eager" 
        path="assets/img/system_bus.jpg" 
        title="Parallel System Bus on DE0-Nano FPGA" 
        class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="caption">
  Verilog-based multi-master, multi-slave system bus implemented on the DE0-Nano FPGA — demonstrating parallel data communication between masters and slaves.
</div>

---

### Technical Insights

| Component        | Description                                                         |
| ---------------- | ------------------------------------------------------------------- |
| **Language**     | Verilog HDL                                                         |
| **Platform**     | Intel DE0-Nano FPGA                                                 |
| **Toolchain**    | Intel Quartus Prime                                                 |
| **Verification** | Verilator simulation                                                |
| **Bus Type**     | Multi-master, multi-slave parallel bus                              |
| **Masters**      | 2 concurrent bus masters                                            |
| **Slaves**       | 3 address-mapped slave devices                                      |
| **Debug Tools**  | In-System Memory Content Editor                                     |
| **Applications** | Embedded systems, interconnect design, FPGA-based SoC architectures |

---

### Future Enhancements

* Integrate **AXI-lite** or **Wishbone-compatible interface** for broader interoperability.
* Add **bus performance counters** for transaction latency analysis.
* Introduce **DMA (Direct Memory Access)** for high-throughput data movement.
* Expand scalability to support **more masters and slaves** dynamically.
* Develop a **graphical monitoring tool** for visualizing bus traffic and arbitration events in real time.

---

### Summary

This project demonstrates a **fully functional parallel system bus** implemented on FPGA, designed for **multi-master communication** and **shared resource access**.
It highlights core competencies in **FPGA design**, **digital communication protocols**, and **hardware verification**, providing a foundation for scalable **System-on-Chip (SoC)** development.

By combining **Verilog-based design**, **FPGA prototyping**, and **simulation-driven validation**, the project bridges theoretical architecture and practical hardware realization — showcasing efficient, concurrent data communication in embedded hardware systems.

---

[View Project on GitHub](https://github.com/HirunaVishwamith/System_Bus_Design)

---
