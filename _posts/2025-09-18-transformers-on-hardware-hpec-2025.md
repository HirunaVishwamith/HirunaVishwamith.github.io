---
layout: post
title: "Putting Transformers and Spiking Networks on Silicon"
date: 2025-09-18 11:00:00-0400
description: A look at the thread running through my research — mapping modern AI and neuromorphic models onto hardware for real-time scientific workloads, from HPEC and CHEP to ISARC.
tags: fpga research neuromorphic
categories: research
giscus_comments: true
related_posts: false
---

My research keeps returning to one question: **how do we run modern AI models — transformers, spiking neural networks — fast enough, and efficiently enough, to be useful in real-time scientific and engineering systems?** General-purpose hardware rarely gets you there. Custom and emerging architectures do. Below is the thread that connects the work I've published at **IEEE HPEC**, **CHEP**, **ISARC**, and **INTCEC**.

### Transformers, but in hardware

At **HPEC 2025** we presented a **[Hardware-Accelerated Transformer Framework for Real-Time Battery State-of-Health Estimation](https://www.researchgate.net/profile/Hiruna-Vishwamith/publication/395305485_Hardware-Accelerated_Transformer_Framework_for_Real-Time_Battery_SoH_Estimation/links/68bcf9f86fe8e57ec8e2f9db/Hardware-Accelerated-Transformer-Framework-for-Real-Time-Battery-SoH-Estimation.pdf)**. Battery SoH estimation is exactly the kind of problem where accuracy and latency are both non-negotiable: you want a transformer's modeling power, but you need it to run inside a real-time control loop. The framework maps the attention computation onto hardware so the model can keep up with the system it's monitoring.

### Neuromorphic computing for physics and signals

The other half of my work asks what **neuromorphic** hardware can do for workloads it isn't normally associated with:

- **[Exploring Neuromorphic Computing with Loihi-2 for High-Performance CFD Simulations](https://www.researchgate.net/profile/Hiruna-Vishwamith/publication/395305489_Exploring_Neuromorphic_Computing_with_Loihi-2_for_High-Performance_CFD_Simulations/links/68bcf9c56fe8e57ec8e2f9d9/Exploring-Neuromorphic-Computing-with-Loihi-2-for-High-Performance-CFD-Simulations.pdf)** (HPEC 2025) — taking computational fluid dynamics, a deeply numerical workload, onto Intel's Loihi-2 spiking architecture.
- **HPCNeuroNet** (INTCEC 2024 and CHEP 2024) — merging SNN temporal dynamics with transformer attention, applied to neuromorphic audio signal processing and to FPGA-based particle-physics triggering.
- **NeuroSec** (ISARC 2024) — FPGA-based neuromorphic audio security.

### The common thread

What ties these together — and what connects them to my computer-architecture projects like the [Chiron](https://github.com/HirunaVishwamith/Chiron) out-of-order RISC-V core — is a single conviction: **the most interesting performance gains come from co-designing the algorithm and the hardware it runs on.** Whether that hardware is an FPGA fabric, a neuromorphic chip, or a custom processor I built from RTL up, the goal is the same — make demanding models run in real time, on the systems where they actually matter.

See the [publications page](/publications/) for the full list and papers.
