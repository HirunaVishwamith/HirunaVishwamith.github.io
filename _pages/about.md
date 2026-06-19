---
layout: about
title: about
permalink: /
subtitle: FPGA Design Engineer Intern at Apex Compute

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

# Hi 👋!
I broadly work on problems at the intersection of **computer architecture**, **reconfigurable computing**, and **AI acceleration**. My work explores how we can push the limits of performance and efficiency in systems.

Currently, I’m an **FPGA Design Engineer Intern at [Apex Compute](https://www.apexcompute.com//)** (California), where I design high-performance reconfigurable architectures.  
Previously, I was a **Research Scholar at the [National University of Singapore (NUS)](https://www.nus.edu.sg/)**, where I implemented a **3DRA CGRA** on FPGA running at **650 MHz** and optimized data communication for a **100 Gbps TCP/IP Offload Engine**.

I received my **BSc (Hons) in Electronics and Telecommunications Engineering** from the **[University of Moratuwa](https://ent.uom.lk/)**, where I led projects on **cache-coherent, out-of-order multi-core RISC-V CPUs** and **hardware-accelerated systems for AI and scientific computing**.

My research has been published at venues like **IEEE HPEC**, **CHEP**, **ISARC**, and **INTCEC**, focusing on **neuromorphic computing**, **FPGA acceleration**, and **transformer-based architectures** for real-time scientific applications.  

Before diving into research, I enjoyed building embedded systems and participating in hardware–ML competitions, securing **2nd place in latency** at the **[ACM/IEEE TinyML Design Contest @ ICCAD 2023](https://tinymlcontest.github.io/TinyML-Design-Contest-2023/Winners.html)** and advancing to the finals of the **[IEEE VIP Cup 2023](https://alregib.ece.gatech.edu/)**.

When I’m not optimizing FPGA designs, I like exploring new AI models, and occasionally tinkering with low-level systems that connect software and silicon.

---

### selected highlights:

<ul>
  <li><b>5 peer-reviewed publications</b> across <b>IEEE HPEC, CHEP, ISARC, and INTCEC</b> on hardware-accelerated transformers and neuromorphic computing — including, most recently, the <a href="https://www.researchgate.net/profile/Hiruna-Vishwamith/publication/395305485_Hardware-Accelerated_Transformer_Framework_for_Real-Time_Battery_SoH_Estimation/links/68bcf9f86fe8e57ec8e2f9db/Hardware-Accelerated-Transformer-Framework-for-Real-Time-Battery-SoH-Estimation.pdf">Hardware-Accelerated Transformer Framework for Real-Time Battery SoH Estimation</a> and <a href="https://www.researchgate.net/profile/Hiruna-Vishwamith/publication/395305489_Exploring_Neuromorphic_Computing_with_Loihi-2_for_High-Performance_CFD_Simulations/links/68bcf9c56fe8e57ec8e2f9d9/Exploring-Neuromorphic-Computing-with-Loihi-2-for-High-Performance-CFD-Simulations.pdf">Exploring Neuromorphic Computing with Loihi-2 for High-Performance CFD Simulations</a>, both at <b>IEEE HPEC 2025</b>.</li>

  <li><b><a href="/projects/">Chiron</a> — a fully-verified out-of-order RISC-V processor</b>: a teaching-grade RV64IMA core in Chisel with register renaming, TAGE branch prediction, and a coherent non-blocking cache hierarchy. Every committed instruction is checked in <b>lock-step against a golden model</b> — all 84 RISC-V ISA tests pass, and it <b>boots Linux</b>.</li>

  <li><b>End-to-end cache-coherent multicore</b>: an out-of-order, cache-coherent multicore RISC-V processor taken from RTL to FPGA, running bare-metal C programs and booting Linux images.</li>

  <li><b><a href="/projects/">ASTRA</a> — physics-accurate LEO satellite-network simulation</b>: a constellation simulator in pure C11 coupling real Kepler orbital mechanics to per-timestep routing, validated to <b>machine precision</b> (3×10⁻¹² km orbital parity, bit-exact routing over 30k+ paths) with a hand-rolled OpenGL renderer.</li>

  <li><b>Competition results</b>: <b>2nd place in latency</b> at the <a href="https://tinymlcontest.github.io/TinyML-Design-Contest-2023/Winners.html">ACM/IEEE TinyML Design Contest @ ICCAD 2023</a>, and <b>finalist</b> at the <a href="https://alregib.ece.gatech.edu/">IEEE VIP Cup 2023</a>.</li>
</ul>
<!-- in  and <a href="https://arxiv.org/abs/2302.04449">guiding</a> agent behavior in different data modalities</b> to create more reliable, interpretable, and less data hungry AI models. I'm also very interested -->

<p>
<br>
</p>

<!-- Write your biography here. Tell the world about yourself. Link to your favorite [subreddit](http://reddit.com). You can put a picture in, too. The code is already in, just name your picture `prof_pic.jpg` and put it in the `img/` folder.

Put your address / P.O. box / other info right below your picture. You can also disable any of these elements by editing `profile` property of the YAML header of your `_pages/about.md`. Edit `_bibliography/papers.bib` and Jekyll will render your [publications page](/al-folio/publications/) automatically.

Link to your social media connections, too. This theme is set up to use [Font Awesome icons](https://fontawesome.com/) and [Academicons](https://jpswalsh.github.io/academicons/), like the ones below. Add your Facebook, Twitter, LinkedIn, Google Scholar, or just disable all of them. -->
