---
layout: page
title: "Talos — Systolic Array Simulator"
description: A cycle-accurate systolic-array and dataflow simulator in pure Python — it steps a real PE mesh one clock at a time and tells you exactly where the cycles and the joules went.
img: assets/img/talos_cockpit.png
importance: 1
category: accelerators
github: https://github.com/HirunaVishwamith/Talos
related_publications: false
---

Everyone knows an AI accelerator is "memory bound". **Talos** is built to show you _by how much, and to what_. It is a **cycle-accurate systolic array simulator** written in pure Python: a mesh of processing elements stepped one clock at a time, with every MAC, every wire hop, every stalled cycle and every picojoule accounted for.

No FPGA toolchain, no Verilator, no dependencies beyond **numpy** and **matplotlib**. Every number in the output comes from an actual PE mesh being clocked — not from a spreadsheet of throughput formulas.

<div class="row justify-content-sm-center">
  <div class="col-sm-11 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/talos_cockpit.png" title="Talos cockpit — live PE mesh, utilization, and energy breakdown" alt="Talos cockpit — live PE mesh, utilization, and energy breakdown" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  The cockpit: the PE grid with a decaying activity wake so the wavefront leaves a comet trail, operands entering from the west and north, phase-banded utilization, and a playhead over the phase timeline.
</div>

---

### The timing model — two phases, and that is the whole trick

Every cycle has exactly two phases:

1. **Compute** — every PE reads its input latches, performs its MAC, writes its output latches. All PEs see the same pre-edge state, so iteration order provably cannot matter.
2. **Commit** — output latches are copied into the neighbours' input latches.

One PE-to-PE hop therefore costs exactly one cycle, which is what makes the skew arithmetic fall out:

> An element injected at the west edge of row `i` on cycle `t` reaches PE(i, j) on cycle `t + j`. An element injected at the north edge of column `j` on cycle `t` reaches PE(i, j) on cycle `t + i`. So to make `A[i,k]` meet `B[k,j]` inside PE(i, j), inject them on cycles `k + i` and `k + j`.

Everything else is bookkeeping. `None` on a wire means **bubble** — no valid data this cycle — which is what makes utilization honest: an idle PE is idle because nothing arrived, not because the model decided to call it idle. The test suite asserts the array performs _exactly_ `M·K·N` MACs, no more and no fewer, which is the check that catches schedule bugs that still produce the right answer.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/talos_waveform.png" title="Per-PE waveform" alt="Per-PE waveform" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  A single PE, proving the arithmetic: <code>in_a</code> and <code>in_b</code> arrive together at cycle 2 = k + i + j for PE(1,1), the MAC enables, the accumulator steps, and at cycle 22 the drain shifts the result out.
</div>

---

### The efficiency waterfall

Utilization tells you that you lost. The **waterfall** tells you _to what_. It starts at the theoretical floor and adds each loss term until it reaches the measured cycle count — nothing is allowed to hide:

```
  EFFICIENCY WATERFALL     (where the cycles went, from the theoretical floor)

    ideal (every PE, every cycle)          512   15.9%  ###...............
    + pipeline fill & flush                224    7.0%  #.................
    + array padding                          0    0.0%  ..................
    + stationary-operand load                0    0.0%  ..................
    + partial-sum drain                    128    4.0%  #.................
    + DRAM stall                         2,350   73.1%  ##############....
    = actual                             3,214  100.0%
```

The two idle terms are separated on purpose because their fixes are opposites: **pipeline** idle means data is in flight (fix: deeper tiles), **padding** idle means the problem does not fill the mesh (fix: a different array shape).

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/talos_waterfall.png" title="Efficiency waterfall" alt="Efficiency waterfall" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  The same waterfall as a figure — every cycle between the theoretical floor and the measured total, attributed to a named cause.
</div>

---

### Energy, and why data movement wins the argument

```
  ENERGY   (7nm)
    MAC units                 0.121 uJ    3.4%
    PE-to-PE wires            0.010 uJ    0.3%
    scratchpad                0.050 uJ    1.4%
    DRAM                      3.047 uJ   87.0%
    leakage                   0.209 uJ    6.0%
    TOTAL                     3.503 uJ

    DRAM cost per byte          18.60 pJ   = 40 MACs
    peak efficiency             2.378 TOPS/W  <- the spec-sheet number
    achieved efficiency         0.150 TOPS/W  <- what you actually got
```

The multipliers — the only part doing useful work — are **3 %** of the budget, and every byte you avoid fetching is worth forty multiplies. That single ratio is why dataflow exists, and why an accelerator is best understood as a machine for avoiding memory traffic with a MAC array bolted on. Note also the 16× gap between peak and achieved efficiency: every real chip has that gap, and none of them put it on the slide.

Energy and area are modelled across **seven process nodes**, anchored on Horowitz (ISSCC 2014) for per-op picojoules and on TPUv1's MXU for PE area, with leakage proportional to area and wall time and an explicit uncore fraction for the clock tree and control that datapath-only models silently omit. Chase the scaling table to its conclusion — logic energy falls 13× from 45nm to 5nm while DRAM energy falls only 1.7× — and you have derived the last fifteen years of accelerator architecture.

<div class="row">
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/talos_energy.png" title="Energy breakdown" alt="Energy breakdown" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/talos_roofline.png" title="Roofline" alt="Roofline" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Left: where the joules go. Right: the roofline — points sit under the ceiling because a regression test asserts DRAM traffic never exceeds bandwidth × cycles.
</div>

---

### Validated against real silicon

Configure the array exactly as TPUv1 was built — 256×256 int8 at 700 MHz on 28nm — and the model reports **91.75 peak TOPS** against the published **92**, and **4.64 TOPS/W** against the real **2.30**.

| chip                     | year | node | precision | peak TOPS | W     | TOPS/W |
| ------------------------ | ---- | ---- | --------- | --------- | ----- | ------ |
| **this model (256×256)** | —    | 28nm | int8      | 91.75     | 19.76 | 4.64   |
| TPUv1                    | 2016 | 28nm | int8      | 92.00     | 40.0  | 2.30   |
| H100 SXM                 | 2022 | 5nm  | bf16      | 990.00    | 700.0 | 1.41   |
| A100 SXM                 | 2020 | 7nm  | bf16      | 312.00    | 400.0 | 0.78   |
| Eyeriss                  | 2016 | 65nm | int16     | 0.03      | 0.3   | 0.12   |

The throughput match is exact arithmetic. The efficiency being 2× optimistic is the **honest signature** of a datapath model with no I/O pads, no DVFS margin, no clock skew and no buffer hierarchy — and there is a test asserting it stays inside 3×. A normalisation column divides out the process advantage, which is worth doing to H100 and A100: a large part of their headline efficiency is TSMC's, not NVIDIA's.

---

### What it lets you actually study

- **Three dataflows** — output-stationary, weight-stationary, and input-stationary (the exact transpose-dual of weight-stationary). Output-stationary moves ~3.7× fewer partial sums but gets 8.0 MACs per operand fetched against weight-stationary's 12.8 — and reuse is what decides the stall count. With perfect memory all three tie on a square problem; the moment DRAM is finite they separate.
- **Two kinds of sparsity** — unstructured zero-skip saves 60 % of the MACs and **zero** cycles (the systolic schedule is static, so the PE gets clocked whether or not it multiplies); block-structured 2:4 halves both. Two runs with identical hardware and identical speedup differ **13× in error** depending on whether the weights were prunable, which is the point: structured sparsity is a training problem that hardware merely cashes in.
- **Design-space exploration** — Pareto search over (cycles, energy, area). The single-objective winners are three different designs, "which is the whole reason this is a search and not a calculation."
- **Numeric formats that genuinely change the MAC** — fp32 single-rounded FMA accumulate, bf16 with real round-to-nearest-even truncation, int8 with symmetric quantization and honest two's-complement int32 wraparound.
- **Workload shape sensitivity** — one attention head at `seq=64, dim=16` decomposes into two GEMMs of the _same_ head that sit **2.3× apart** in utilization, because their aspect ratios are opposites and one array cannot suit both.

<div class="row">
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/talos_dataflow.png" title="Dataflow comparison" alt="Dataflow comparison" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/talos_pareto.png" title="Pareto front" alt="Pareto front" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Left: output-, weight- and input-stationary on the same problem — they tie under perfect memory and separate the moment DRAM is finite. Right: the Pareto front over cycles, energy and area, where the single-objective winners are three different designs.
</div>

<div class="row justify-content-sm-center">
  <div class="col-sm-11 mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/talos_spacetime.png" title="Space-time diagram" alt="Space-time diagram" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Space-time: PE index against cycle. Each diagonal stripe is one operand sweeping across the mesh — the slope is propagation delay, the width is tile depth, the gaps are fill and drain. If you look at one figure to understand what a systolic array <em>is</em>, look at this one.
</div>

---

### The advisor

`--advise` reads the profile and says what to change, quantified. A horoscope says "you are memory bound." This says:

```
  !! DRAM stalls are 68% of the run
       The array waited 2,350 cycles for operands. With infinite bandwidth
       this run would take 864 cycles instead of 3,214 -- a 3.72x speedup
       you cannot get by touching the array at all.
       FIX: Raise reuse before raising bandwidth: enlarge the scratchpad,
       deepen tiles so each fetch feeds more work, or drop to a narrower
       operand format to halve the bytes.
```

It diagnoses ten failure modes — DRAM stalls, scratchpad thrashing, pipeline overhead, array under-fill (with a suggested aspect ratio), tiles too short to amortize the fill, energy dominated by DRAM or leakage or wiring, precision headroom, unexploited sparsity, and dataflow/shape mismatch — and it also tells you when a configuration is genuinely good.

---

### Interfaces

**Talos Studio** (`python3 main.py studio`) is the product UI: configure the array, pick a dataflow, size the GEMM, hit Run. It compares the three dataflows in one click, keeps a run history, and animates the PE mesh in a player with hover inspect, click-to-pin PE waveforms, a Teach mode, the efficiency waterfall and bottleneck insights — on pure stdlib HTTP, no extra packages. Dense fp32 results are checked against NumPy before the player opens.

There is also a **standalone HTML player** (`--html run.html`) small enough to email, a **24-bit-colour terminal renderer** that works over ssh with no display server, JSON/CSV **research exports**, an A-vs-B `diff` for when you flip one knob, and guided `lesson` micro-experiments.

---

### What is deliberately _not_ modelled

Stated up front, because a model you can't quote the limits of is not a model:

- **Clock rate and area closure** — cycles are exact; the TOPS figure is cycles × a clock you assert. Nothing here says the design closes timing.
- **Absolute watts are ±2×** — the ratios are the point, and the TPUv1 check above shows exactly how optimistic and why.
- **MAC pipeline depth is fixed at 1** — `PEConfig(mac_latency=2)` raises `NotImplementedError` rather than quietly lying, because deeper pipelines need matching re-skew in the schedulers.
- **DRAM is a flat bytes/cycle pipe** — no banks, rows, refresh or latency.
- **No RTL** — this is an architectural model, not a synthesizable design.

---

### Skills demonstrated

Accelerator microarchitecture · systolic dataflow and schedule design · energy and area modelling with process scaling · roofline and bottleneck analysis · quantization and sparsity trade-offs · design-space exploration and Pareto search · simulator engineering with strong correctness invariants · interactive visualization and tooling · CI-tested Python library design.

<div class="mt-4">
  <a class="btn btn-sm z-depth-0" role="button" href="https://github.com/HirunaVishwamith/Talos">View Talos on GitHub</a>
  <a class="btn btn-sm z-depth-0" role="button" href="{{ '/blog/2026/where-the-joules-go-systolic-arrays/' | relative_url }}">Read the write-up</a>
</div>
