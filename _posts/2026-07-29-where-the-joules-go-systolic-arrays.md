---
layout: post
title: "Where the Joules Actually Go in a Systolic Array"
date: 2026-07-29 10:00:00-0700
description: Talos steps a real PE mesh one clock at a time, and the numbers that fall out explain most of the last fifteen years of accelerator architecture.
tags: computer-architecture accelerators simulation
categories: projects
giscus_comments: true
related_posts: false
featured: true
thumbnail: assets/img/talos_cockpit.png
---

Everyone repeats that AI accelerators are "memory bound." Far fewer people can tell you _by how much_, or _to what_, on a design they can point at. I built **[Talos]({{ '/projects/talos/' | relative_url }})** to make that question answerable: a **cycle-accurate systolic array simulator** in pure Python that steps a real mesh of processing elements one clock at a time and accounts for every MAC, every wire hop, every stalled cycle and every picojoule.

### The whole trick is two phases

Each cycle has exactly two phases. In **compute**, every PE reads its input latches, does its MAC, and writes its output latches. In **commit**, output latches are copied into the neighbours' input latches. Because all PEs see the same pre-edge state, iteration order provably cannot matter — and one PE-to-PE hop costs exactly one cycle, which is what makes the skew arithmetic fall out cleanly:

> An element injected at the west edge of row `i` on cycle `t` reaches PE(i, j) on cycle `t + j`; one injected at the north edge of column `j` reaches it on cycle `t + i`. So to make `A[i,k]` meet `B[k,j]` inside PE(i, j), inject them on cycles `k + i` and `k + j`.

Everything after that is bookkeeping. `None` on a wire means **bubble**, which is what keeps utilization honest: a PE is idle because nothing arrived, not because the model decided to call it idle. The test suite asserts the array performs _exactly_ `M·K·N` MACs — the check that catches schedule bugs which still produce the right answer.

### The number that reframes everything

Run a 7nm configuration and look at where the energy goes:

```
    MAC units                 0.121 uJ    3.4%
    DRAM                      3.047 uJ   87.0%
    ...
    DRAM cost per byte          18.60 pJ   = 40 MACs
```

The multipliers — the only part doing useful work — are **3 %** of the budget, and every byte you avoid fetching is worth forty multiplies. That single ratio _is_ the reason dataflow exists. An accelerator is best understood not as a MAC array with memory attached, but as a machine for avoiding memory traffic that happens to have a MAC array bolted on.

The process-scaling table makes the same point across twenty years: from 45nm to 5nm, logic energy falls **13×** and DRAM energy falls **1.7×**, because DRAM energy is dominated by driving signals off-chip across a package, and physics does not care about your transistor pitch. Leakage per mm² goes _up_. Chase those columns to their conclusion and you have derived the field's answer: put more compute on the die, keep the data on-chip, never touch DRAM if you can help it.

### Utilization tells you that you lost; the waterfall tells you to what

A single utilization percentage is useless for deciding what to change. So Talos starts at the theoretical floor and adds each loss term until it reaches the measured cycle count, with nothing allowed to hide — pipeline fill, array padding, stationary-operand load, partial-sum drain, DRAM stall. The two idle terms are separated deliberately, because their fixes are opposites: **pipeline** idle means data is in flight (fix: deeper tiles), **padding** idle means the problem does not fill the mesh (fix: a different array shape).

On top of that sits an advisor that reads the profile and quantifies the recommendation. Not "you are memory bound," but: _the array waited 2,350 cycles for operands; with infinite bandwidth this run would take 864 cycles instead of 3,214 — a 3.72× speedup you cannot get by touching the array at all._

### The sparsity result that surprises people

```
  strategy                 cycles  MACs    skipped  energy uJ  rel err
  dense baseline           1,376   65,536  0        0.1549     4.03e-07
  zero-skip, 60% sparse A  1,376   26,048  39,488   0.1299     3.59e-07
  2:4 on random weights      864   32,768  0        0.0832     1.88e+00
  2:4 on prunable weights    864   32,768  0        0.0832     1.45e-01
```

Unstructured zero-skip removes 60 % of the multiplies and **zero** cycles — the systolic schedule is static, so the PE gets clocked whether or not it multiplies. That is why "90 % sparse" models so often run at dense speed. Structured 2:4 halves both, because the compiler was allowed to delete K slices; it is a schedule change, not a runtime one. And the last two rows are identical hardware with identical speedup and **13× different error**, which is the real lesson: structured sparsity is free exactly when the weights were already redundant, and ruinous when they were not. Pruning is a training problem that hardware merely cashes in.

### Believing the model

A model you cannot check is a story. Configure the array exactly as TPUv1 was built — 256×256 int8 at 700 MHz on 28nm — and Talos reports **91.75 peak TOPS** against the published **92**. Throughput is exact arithmetic, so that match is expected. The efficiency number comes out **2× optimistic** (4.64 vs. 2.30 TOPS/W), and that gap is the honest signature of a datapath model with no I/O pads, no DVFS margin, no clock skew and no buffer hierarchy. There is a regression test asserting it stays inside 3×.

The limits are stated in the README rather than buried: cycles are exact but timing closure is not modelled, absolute watts are ±2×, DRAM is a flat bytes/cycle pipe with no banks or refresh, and `PEConfig(mac_latency=2)` raises `NotImplementedError` rather than quietly lying about a pipeline depth the schedulers do not re-skew for.

That is the discipline I try to carry from RTL into modelling. [Chiron]({{ '/projects/chiron/' | relative_url }}) is checked instruction-by-instruction against a golden model; Talos is checked MAC-by-MAC against an exact count and byte-by-byte against its own roofline. Different layer, same rule: a number you cannot defend is not a result.

[Explore Talos on GitHub →](https://github.com/HirunaVishwamith/Talos) · [Full project write-up →]({{ '/projects/talos/' | relative_url }})
