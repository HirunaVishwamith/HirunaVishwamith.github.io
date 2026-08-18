---
layout: about
title: about
permalink: /
description: >
  Computer architecture researcher and FPGA design engineer, co-designing hardware and
  algorithms for efficient foundation-model computing — a lock-step verified quad-core
  out-of-order RISC-V processor that boots Linux SMP, systolic-array and FPGA/CGRA
  accelerators, and hardware for efficient AI.
subtitle: FPGA Design Engineer at Apex Compute · computer architecture & AI acceleration
profile:
  align: right
  image: prof_pic.jpg
  image_circular: false # crops the image to make it circular
  more_info: >

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: true # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: true
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

I build **processors and accelerators from the RTL up**, and I verify them until the claims hold. My work sits in **computer architecture**, aimed at one problem: **co-designing hardware and algorithms for efficient foundation-model computing** — making large transformers and their successors tractable in compute, memory, and energy.

Today I'm an **FPGA Design Engineer at [Apex Compute](https://www.apexcompute.com/)** (California), designing high-performance reconfigurable architectures and accelerators for LLM workloads. Previously I was a **Research Scholar at the [National University of Singapore](https://www.nus.edu.sg/)**, where I implemented a **3DRA CGRA on FPGA at 650 MHz** and optimized data movement for a **100 Gbps TCP/IP offload engine**. I hold a **BSc (Hons) in Electronics and Telecommunications Engineering** from the **[University of Moratuwa](https://ent.uom.lk/)**, where I led a team building a cache-coherent out-of-order multicore RISC-V processor from Chisel RTL onto an FPGA.

My published work — at **IEEE HPEC, CHEP, ISARC, and INTCEC** — maps modern AI onto custom and emerging hardware: hardware-accelerated transformers for real-time systems, and neuromorphic computing for particle physics, audio, and CFD.

---

## what i'm building

<div class="row row-cols-1 row-cols-md-2">
  <div class="col mb-4">
    <a href="{{ '/projects/chiron/' | relative_url }}">
      <div class="card h-100 hoverable">
        <div class="card-body">
          <h3 class="card-title">Chiron</h3>
          <p class="card-text">A <b>quad-core out-of-order RV64IMA processor</b> in Chisel. Four OoO harts behind an ACE-coherent, non-blocking cache hierarchy — every committed instruction checked in lock-step against a golden model, all 84 RISC-V ISA tests passing, and <b>Linux SMP booting to an interactive shell</b>.</p>
        </div>
      </div>
    </a>
  </div>
  <div class="col mb-4">
    <a href="{{ '/projects/talos/' | relative_url }}">
      <div class="card h-100 hoverable">
        <div class="card-body">
          <h3 class="card-title">Talos</h3>
          <p class="card-text">A <b>cycle-accurate systolic array simulator</b> that steps a real PE mesh one clock at a time and shows where the cycles and the joules actually went — efficiency waterfall, energy breakdown, roofline, and a design-space search, validated against published TPUv1 silicon.</p>
        </div>
      </div>
    </a>
  </div>
  <div class="col mb-4">
    <a href="{{ '/projects/simd-matrix-processor/' | relative_url }}">
      <div class="card h-100 hoverable">
        <div class="card-body">
          <h3 class="card-title">SIMD Matrix Processor</h3>
          <p class="card-text">A fully <b>parameterized SIMD processor</b> with a custom ISA for matrix arithmetic, built for hardware acceleration on FPGA — the datapath side of the same question Talos models.</p>
        </div>
      </div>
    </a>
  </div>
  <div class="col mb-4">
    <a href="{{ '/projects/astra/' | relative_url }}">
      <div class="card h-100 hoverable">
        <div class="card-body">
          <h3 class="card-title">ASTRA</h3>
          <p class="card-text">A <b>physics-accurate LEO constellation simulator</b> in pure C11 coupling real Kepler orbital mechanics to per-timestep routing — validated to <b>machine precision</b> (3×10⁻¹² km orbital parity, bit-exact routing over 30k+ paths), with a hand-rolled OpenGL renderer.</p>
        </div>
      </div>
    </a>
  </div>
</div>

<p class="text-right"><a href="{{ '/projects/' | relative_url }}">See all projects →</a></p>

---

## selected highlights

- **5 peer-reviewed publications** at **IEEE HPEC, CHEP, ISARC, and INTCEC** on hardware-accelerated transformers and neuromorphic systems — most recently two papers at **HPEC 2025**. [See publications →]({{ '/publications/' | relative_url }})
- **Linux SMP running on a processor I designed and verified** — four out-of-order RISC-V harts, every committed instruction checked against a golden model, deployed to FPGA.
- **2nd place in latency** at the [ACM/IEEE TinyML Design Contest @ ICCAD 2023](https://tinymlcontest.github.io/TinyML-Design-Contest-2023/Winners.html), and **finalist** at the [IEEE VIP Cup 2023](https://alregib.ece.gatech.edu/).
- **650 MHz CGRA on FPGA** and a **100 Gbps TCP/IP offload engine** at NUS.

<p>
<br>
</p>
