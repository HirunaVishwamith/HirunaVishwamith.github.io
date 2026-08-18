---
layout: page
title: "ASTRA: Autonomous Satellite Traffic & Routing Architecture"
description: A physics-accurate LEO satellite constellation simulator in pure C11 with custom OpenGL visualization, dynamic-topology routing, and machine-precision validation.
img: assets/img/astra_dashboard.png
importance: 3
category: accelerators
github: https://github.com/HirunaVishwamith/ASTRA
related_publications: false
---

### Project Overview

**ASTRA** (_Autonomous Satellite Traffic & Routing Architecture_) is a research-grade simulator for **Low Earth Orbit (LEO) satellite constellations**, written **entirely in C11** with a **hand-rolled OpenGL renderer** and **zero external dependencies** beyond system libraries. It models how orbital mechanics drive **dynamic network topology**, and measures the **routing efficiency and traffic performance** that result.

LEO mega-constellations (Starlink, Kuiper, and the like) present a networking problem that classical simulators handle poorly: the topology is never static. Satellites move at orbital velocity, inter-satellite links form and break continuously, and ground visibility changes by the second. ASTRA tackles this head-on by coupling **real two-body orbital propagation** to a **per-timestep network model**, so routing and traffic decisions are made over a topology that is physically correct at every instant.

---

### Motivation

Most network simulators either treat satellite links as a fixed graph or bolt on a coarse mobility model. Neither captures what actually makes LEO networking hard: a topology that is **continuously reshaped by orbital geometry**, with line-of-sight occlusion, elevation masking, and distance-dependent link budgets all changing in lock-step.

ASTRA was built to be **physics-accurate first** — getting the orbital mechanics right to machine precision — and then to study routing, resilience, and traffic delivery on top of that faithful foundation.

---

### Key Features

- **Physics-accurate orbital mechanics**
  A **universal-variables Kepler solver** propagates real two-body dynamics, with full **ECI ↔ ECEF** coordinate transforms and **line-of-sight occlusion** that accounts for Earth's geometry.

- **Dynamic network modeling**
  Topology is **recomputed every timestep**, stored as a **CSR sparse adjacency matrix** for efficient queries, with **inverse-square link-budget** calculations governing which links are viable.

- **Routing algorithms**
  Both **Dijkstra** (lazy-heap) and **Distance-Vector** implementations produce **all-pairs next-hop tables** synchronously, enabling direct comparison of routing strategies on identical topologies.

- **Traffic generation & metrics**
  **Uniform, hotspot, and burst** traffic models feed a **zero-allocation packet pool**, measuring **delivery ratio, latency, hop count, and link utilization**.

- **Failure & resilience simulation**
  Scripted **link blackouts, latency spikes, loss scaling, and node strikes**, with automatic system reboot — purpose-built for network-resilience studies.

- **Custom OpenGL visualization**
  A from-scratch **3D viewer** (GLX/EGL) renders a graticule globe with **ISL and ground links colored by utilization**, interactive orbit-camera controls, and **headless rendering with PNG export** for batch studies.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/astra_dashboard.png" title="ASTRA real-time constellation dashboard rendered in custom OpenGL" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  The ASTRA dashboard, rendered entirely in hand-written OpenGL — inter-satellite and ground links colored by utilization over a graticule globe, with live routing and traffic metrics.
</div>

---

### Architecture

ASTRA is built as a set of **independent compilation units** — orbit mechanics, graph operations, routing, ground stations, traffic generation, failures, and metrics — each with a focused responsibility. A standout engineering detail is the **lock-free synchronization boundary** between the simulation and rendering threads, which lets the model advance and the viewer draw **simultaneously, with no data races**. Operational realism comes from **ground-station elevation masking** and **per-link bandwidth budgeting**.

---

### Validation — Correct to Machine Precision

ASTRA treats correctness as a first-class deliverable, validated against a frozen reference rather than assumed:

- ✅ **Orbital parity:** the C implementation matches the original Python prototype to **3 × 10⁻¹² km** — machine precision — on orbital propagation.
- ✅ **Routing parity:** **bit-exact Dijkstra** results across **30,000+ path pairs**.
- ✅ **Thread safety:** the simulation–render pipeline is validated clean under **ThreadSanitizer**.
- ✅ **Regression suite:** **9 verification tests** check output against frozen reference vectors.

The project also ships profiling tooling for **100–1024 satellite scaling studies** and scripted failure scenarios for resilience research.

---

### Technical Summary

| Aspect            | Detail                                                                |
| ----------------- | --------------------------------------------------------------------- |
| **Language**      | C11 (~99% of codebase), zero external dependencies                    |
| **Physics**       | Universal-variables Kepler solver; ECI/ECEF transforms; LOS occlusion |
| **Graph storage** | CSR sparse adjacency, recomputed per timestep                         |
| **Routing**       | Dijkstra (lazy heap) + Distance-Vector, all-pairs next-hop            |
| **Traffic**       | Uniform / hotspot / burst, zero-allocation packet pools               |
| **Visualization** | Hand-rolled OpenGL (GLX/EGL), 3D viewer with PNG export               |
| **Concurrency**   | Lock-free sim/render boundary, ThreadSanitizer-clean                  |
| **Validation**    | 3e-12 km orbital parity; bit-exact routing over 30k+ pairs            |
| **Scale studies** | 100–1024 satellites                                                   |
| **License**       | MIT (academic use)                                                    |

---

### Skills Demonstrated

Orbital mechanics & numerical methods · graph algorithms and routing · high-performance systems programming in C · cache-friendly data structures (CSR, packet pools) · lock-free concurrency · real-time 3D graphics from scratch (OpenGL/GLX/EGL) · rigorous numerical validation and regression testing · network modeling and resilience analysis.

<div class="mt-4">
  <a class="btn btn-sm z-depth-0" role="button" href="https://github.com/HirunaVishwamith/ASTRA">View ASTRA on GitHub</a>
  <a class="btn btn-sm z-depth-0" role="button" href="{{ '/blog/2025/leo-satellite-networks-machine-precision/' | relative_url }}">Read the write-up</a>
</div>
