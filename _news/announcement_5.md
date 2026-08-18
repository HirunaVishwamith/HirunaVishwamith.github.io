---
layout: post
title: Chiron boots quad-core Linux SMP
date: 2026-08-17 12:00:00-0700
inline: false
related_posts: false
---

**[Chiron](https://github.com/HirunaVishwamith/Chiron)** now runs as a **quad-core out-of-order RV64IMA processor** — four OoO harts sharing a non-blocking L2 behind an AXI-ACE coherent interconnect — and **boots Linux SMP to an interactive shell**, where `nproc` answers `4`.

Every committed instruction is still checked in lock-step against a C++ golden model, in both single-core and 4-hart modes, and all 84 official RISC-V ISA tests pass. The RTL now exposes **164 hardware performance counters** (41 per core), with aggregate quad-core IPC reaching **0.946** on `vvadd` at scale and a **3.92× matmul speedup** over the single-core baseline.

Read the [project write-up]({{ '/projects/chiron/' | relative_url }}) or browse the [code](https://github.com/HirunaVishwamith/Chiron).
