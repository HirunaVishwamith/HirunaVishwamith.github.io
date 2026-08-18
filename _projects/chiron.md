---
layout: page
title: "Chiron — Quad-Core Out-of-Order RISC-V"
description: Four out-of-order RV64IMA cores in Chisel behind an ACE-coherent cache hierarchy — verified instruction-by-instruction against a golden model, booting Linux SMP to an interactive shell, and deployed to FPGA.
img: assets/img/chiron.png
importance: 1
category: processors
github: https://github.com/HirunaVishwamith/Chiron
related_publications: false
---

**Chiron** is a **quad-core, 64-bit out-of-order RISC-V processor** written in **Chisel**. Four independent OoO harts share a non-blocking L2 behind an **ACE coherent interconnect**; every committed instruction is checked in lock-step against a C++ golden model; and the whole machine **boots Linux SMP to an interactive shell**, where `nproc` answers `4`.

It grew out of the final-year project I led at the University of Moratuwa — a modular RISC-V multicore taken from Chisel RTL onto an FPGA — and has since become a fully verified processor in its own right. Throughout, it has chased one question at the heart of computer-architecture education: _can a microarchitecture be aggressive enough to be interesting, transparent enough to teach from, and rigorous enough to trust — all at once?_

<div class="row justify-content-sm-center">
  <div class="col-sm-11 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/chiron.png" title="Chiron quad-core RISC-V processor" alt="Chiron quad-core RISC-V processor" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

---

### At a glance

| Aspect            | Detail                                                                     |
| ----------------- | -------------------------------------------------------------------------- |
| **ISA**           | RV64IMA · 4 harts (IDs 0–3)                                                |
| **Execution**     | Out-of-order, speculative, register-renamed, in-order commit               |
| **Coherence**     | Snoopy AXI-ACE interconnect, 8 ports (2 per core) → shared non-blocking L2 |
| **Verification**  | Per-instruction lock-step vs. C++ golden model · **84/84 `riscv-tests`**   |
| **Milestone**     | **Boots quad-core Linux SMP** to a live shell                              |
| **Observability** | **164 hardware performance counters** (41 per core × 4)                    |
| **HDL / sim**     | Chisel 3.5.4 · Scala 2.13.8 · Verilator                                    |
| **Silicon**       | Deployed to AMD Virtex UltraScale+ (VCU118); 75 MHz design target          |

---

### Why build it this way

Out-of-order execution powers essentially every high-performance processor shipped today, and it is also the part of architecture that is hardest to learn by building. The hard mechanisms — renaming, wake-up/select, precise exceptions through a reorder buffer, memory ordering _across cores_ — are exactly the ones simplified teaching cores omit. Industrial designs implement them, and are impossible to read.

Chiron refuses that trade. Three goals drove every decision:

- **Transparency** — Chisel that a student or researcher can read, modify, and extend, organised strictly by pipeline function.
- **Realism** — a genuine speculative OoO pipeline and a _coherent multicore_ memory system, not a toy.
- **Provable correctness** — confidence from lock-step equivalence checking, not from spot-checked directed tests.

Academic environments rarely have a platform on which out-of-order _multicore_ behaviour can actually be observed. Chiron is meant to be that platform: open, modular, FPGA-deployable, and honest about its own numbers.

---

### System architecture

<div class="row justify-content-sm-center">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/main_hq.png" title="Full multicore RISC-V architecture" alt="Full multicore RISC-V architecture" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/core_hq.png" title="Architecture of a single out-of-order core" alt="Architecture of a single out-of-order core" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Left: the quad-core system — four OoO harts, private L1s, a shared coherent L2, and main memory. Right: the internal microarchitecture of one out-of-order core, from fetch through rename, issue, execute, and commit.
</div>

Each of the four cores is a full out-of-order machine — _fetch → decode/rename → issue → execute → memory → commit_ — with execution fully decoupled from in-order retirement.

**Per-core parameters**

| Property              | Value                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------- |
| Reorder buffer        | 16 entries                                                                                  |
| Physical registers    | 64 (LVT-based rename)                                                                       |
| Issue queue           | 8 entries, centralized, with wake-up                                                        |
| Decode / commit width | 1-wide                                                                                      |
| Multiply–divide       | Radix-4 divider (2 bits/cycle), clz-normalized, with `/0`, `/1` and small-divisor early-out |
| L1 I-cache            | 2-way · 64 sets · 16-instruction lines                                                      |
| L1 D-cache            | 2-way · 64 sets · 8 × 8-byte lines, non-blocking                                            |

---

### The memory system is where the multicore lives

Coherence is not an afterthought bolted onto four independent cores — it is what makes shared-memory Linux possible at all. Each core's split L1s hang off a **snoopy AXI-ACE interconnect** with two ports per core; behind it sits a **shared non-blocking L2** with MSHRs for multiple outstanding misses and pseudo-LRU replacement, and then main memory.

<div class="row justify-content-sm-center">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/dcache_hq.png" title="Private L1 data cache" alt="Private L1 data cache" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/L2_hq.png" title="Shared L2 cache" alt="Shared L2 cache" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Left: the per-core private data cache, non-blocking, with its coherence logic. Right: the shared L2 — MSHRs, pseudo-LRU replacement, and the point at which four cores agree on what memory contains.
</div>

<div class="row justify-content-sm-center">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/interconect_hq.png" title="AXI-ACE coherent interconnect" alt="AXI-ACE coherent interconnect" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/Frontend_hq.png" title="Instruction fetch unit with TAGE predictor" alt="Instruction fetch unit with TAGE predictor" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Left: the coherent interconnect, carrying ACE snoop and coherence traffic between the four L1 pairs and the L2. Right: the fetch unit and its TAGE-based branch predictor.
</div>

**Branch prediction** is the most heavily engineered part of the frontend: a **4-table TAGE** direction predictor (512 entries per table, history lengths 4 / 9 / 19 / 40) over a 2048-entry bimodal base, a 256-entry direct-mapped BTB, a 512-entry pre-decode CFI classifier, and a 16-deep return-address stack. TAGE drives next-PC **combinationally, inside the fetch cycle** — so a correct prediction costs no redirect bubble at all.

---

### Verification — the core contribution

Chiron's defining feature is its verification methodology. The RTL runs in **lock-step against a golden C++ architectural model**: after _every committed instruction_, architectural state — register file, PC, memory — is compared against the reference. Any divergence halts simulation at the exact offending instruction, in the exact cycle, on the exact hart.

- **84/84** official RISC-V ISA tests pass.
- Lock-step runs in single-core **and 4-hart** modes, so coherence and memory-ordering bugs surface immediately as state divergence, rather than as a mysteriously wrong answer three billion cycles later.
- A separate Linux-boot harness carries the same guarantee through kernel bring-up.
- The benchmark harness scrapes the program's own error code off the UART and **fails the run** on a wrong result array — a "finished" program with bad output is a failure, not a silent pass.

Making this practical needed engineering of its own. The Verilated model runs at **~40 K RTL cycles/s** (4-threaded, `-O3`), so a three-billion-cycle Linux boot completes in a day rather than a week — and it **checkpoints**, so you never repeat one.

---

### Booting Linux on four harts

A nommu RISC-V kernel brings up all four harts, hands off to userspace, and drops into an interactive shell over the UART. Typing `nproc` at that shell returns `4`. The full boot transcript is committed to the repository as `docs/linux-quad-boot.log`.

This is the milestone that validates the whole stack at once: if the coherence protocol, the memory ordering, the trap handling, the timer, or the caches were wrong in a way the tests missed, the kernel would not survive SMP bring-up.

---

### Performance

Chiron exposes **164 hardware performance counters** straight out of the RTL — IPC, branch accuracy, cache miss rates, ROB-head stall decomposition, and per-class latency attribution, per core and in aggregate. Optimisation here is measured, not asserted.

**Quad-core aggregate IPC**

| Workload      | Aggregate IPC | Notes                                                     |
| ------------- | ------------- | --------------------------------------------------------- |
| `vvadd-s1-q4` | **0.876**     | 57 K cycles end-to-end; fixed startup cost dominates      |
| `vvadd-s5-q4` | **0.946**     | the same code at scale — near-1.0 aggregate IPC           |
| `histo-s1-q4` | **0.768**     | scatter kernel; data-dependent branches predict at 43.6 % |

Scaling holds where it should: **matrix multiplication reaches a 3.92× speedup** on the quad-core configuration against a single-core baseline — near-linear for a compute-bound workload, which is the result the coherence machinery has to earn.

**Single-core IPC** (`s1` scale)

| Benchmark | Cycles  | IPC       | Branch accuracy | D$ miss |
| --------- | ------- | --------- | --------------- | ------- |
| `filter`  | 482 231 | **0.492** | 77.5 %          | 3.82 %  |
| `matmul`  | 938 727 | **0.331** | 11.1 %          | 0.34 %  |
| `histo`   | 581 807 | **0.275** | 78.0 %          | 3.92 %  |
| `vvadd`   | 69 657  | **0.272** | 71.7 %          | 7.11 %  |
| `csaxpy`  | 62 211  | **0.233** | 62.9 %          | 6.47 %  |

The numbers are also honest about their own limits. `matmul-s1`'s 11.1 % branch accuracy is a trip-count-3 inner loop that TAGE never sees twice — the same kernel reaches **67.6 % at `s2` and 98.9 % at `s3`** once the loops run long enough to learn. `histo` inverts the usual coordinator/worker split and is the clearest remaining headroom in the design.

<div class="row justify-content-sm-center">
  <div class="col-sm-11 mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/chiron_profile.png" title="Chiron performance profiling report" alt="Chiron performance profiling report" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Profiling across every benchmark family and scale, single-core and quad-core — generated directly from the RTL's own performance counters.
</div>

---

### From RTL to FPGA

The design is not simulation-only. The same Chisel elaborates through to an FPGA build on an **AMD Virtex UltraScale+ (VCU118)** board, running at **40 MHz** on hardware against a 75 MHz design target, with a **μCLinux** image and the standard multicore RISC-V benchmark suite (`mt-matmul`, `mt-vvadd`, and friends). Simulation, emulation, and synthesis share one flow, so a change can be checked at whichever level answers the question fastest.

---

### Watching it run

Two bare-metal demos render straight out of the processor's UART with truecolor escapes — no framebuffer, no FPU:

- **`make fire`** — a Doom-style fire effect computed entirely on the simulated hardware.
- **`make cube`** — a rotating wireframe cube. A small fixed-point 3D library (matrices, projection, line and triangle raster) lets the four harts transform vertices **in parallel** while core 0 rasterises and presents.

<div class="row justify-content-sm-center">
  <div class="col-sm-9 mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/chiron_fire.gif" title="Bare-metal fire effect rendered live on Chiron RTL via UART" alt="Bare-metal fire effect rendered live on Chiron RTL via UART" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  A real-time fire effect rendered live from the core's UART on actual RTL — end-to-end execution you can watch.
</div>

---

### Where it goes next

Heterogeneous core configurations for asymmetric processing; speculative memory access on top of the existing non-blocking caches; hardware-managed synchronization primitives; and coherence beyond a single die, toward chiplet- or cluster-level protocols.

---

### Skills demonstrated

Out-of-order microarchitecture · register renaming and dynamic scheduling · TAGE branch prediction · non-blocking caches and MSHRs · **AXI-ACE cache coherence and multicore memory ordering** · Chisel/Scala RTL design · Verilator-based verification · golden-model co-simulation · hardware performance counters and profiling · FPGA synthesis and bring-up · RISC-V toolchain and **Linux SMP bring-up**.

<div class="mt-4">
  <a class="btn btn-sm z-depth-0" role="button" href="https://github.com/HirunaVishwamith/Chiron">View Chiron on GitHub</a>
  <a class="btn btn-sm z-depth-0" role="button" href="{{ '/blog/2025/verifying-out-of-order-riscv/' | relative_url }}">Read the write-up</a>
</div>
