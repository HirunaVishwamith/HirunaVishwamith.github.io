---
layout: post
title: "Simulating LEO Satellite Networks to Machine Precision in C"
date: 2025-11-03 10:00:00-0500
description: ASTRA couples real orbital mechanics to a per-timestep network model so that routing and traffic decisions are made over a physically correct, continuously-changing topology.
tags: systems networking research
categories: projects
giscus_comments: false
related_posts: false
featured: true
thumbnail: assets/img/astra_dashboard.png
---

Low Earth Orbit mega-constellations — Starlink, Kuiper, and their successors — break an assumption baked into most network simulators: that the topology holds still. In a LEO network it never does. Satellites move at orbital velocity, inter-satellite links form and break continuously, and ground visibility changes by the second. **[ASTRA](https://github.com/HirunaVishwamith/ASTRA)** is my attempt to simulate that world honestly — physics first, in pure C11, with no external dependencies.

### Physics first, not a mobility hack

Most simulators either treat satellite links as a fixed graph or bolt on a coarse mobility model. ASTRA instead propagates **real two-body orbital dynamics** with a universal-variables Kepler solver, complete with ECI ↔ ECEF coordinate transforms and line-of-sight occlusion that accounts for Earth's geometry. Every timestep, the network topology is **recomputed from the actual positions of the satellites** — stored as a CSR sparse adjacency matrix, gated by inverse-square link-budget calculations.

On top of that faithful foundation sit the things I actually wanted to study: **Dijkstra and distance-vector routing** producing all-pairs next-hop tables; **uniform, hotspot, and burst traffic** through a zero-allocation packet pool; and **failure injection** — link blackouts, latency spikes, loss scaling, node strikes — for resilience experiments.

### Correctness as a deliverable

A simulator is only as useful as it is trustworthy, so ASTRA is validated against a frozen reference rather than eyeballed:

- **Orbital parity to 3 × 10⁻¹² km** against the original Python prototype — machine precision.
- **Bit-exact Dijkstra** routing across 30,000+ path pairs.
- A **ThreadSanitizer-clean** simulation/render pipeline.
- A 9-test regression suite checking output against frozen reference vectors.

### A lock-free render boundary

ASTRA also renders itself — through a **from-scratch OpenGL viewer** (GLX/EGL), no game engine, drawing a graticule globe with inter-satellite and ground links colored by utilization. The detail I'm most proud of is the **lock-free synchronization boundary** between the simulation and render threads: the model can advance while the viewer draws, simultaneously, with no data races (verified, not assumed). It also runs headless with PNG export, which is what makes 100-to-1024-satellite scaling studies practical.

The throughline of the project is a single idea: if you get the physics right to machine precision, every networking question you ask on top of it inherits that credibility.

[Explore ASTRA on GitHub →](https://github.com/HirunaVishwamith/ASTRA)
