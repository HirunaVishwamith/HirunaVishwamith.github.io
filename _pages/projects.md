---
layout: page
title: projects
permalink: /projects/
description: Processors, accelerators, and the hardware underneath them — built from the RTL up, and measured rather than asserted.
nav: true
nav_order: 3
display_categories: [processors, accelerators, hardware]
category_names:
  processors: processors & multicore systems
  accelerators: accelerators & simulation
  hardware: hardware & instrumentation
category_blurbs:
  processors: RISC-V CPUs and the tooling that proves them correct — out-of-order execution, cache coherence, and Linux bring-up, from Chisel RTL to FPGA.
  accelerators: Custom datapaths and the architectural models used to reason about them — systolic arrays, SIMD matrix engines, and physics-accurate system simulation.
  hardware: Digital and analog hardware built from the board up — bus architectures and precision measurement instruments.
horizontal: false
---

<!-- pages/projects.md -->
<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
  {% assign category_name = page.category_names[category] | default: category %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category_name }}</h2>
  </a>
  {% assign category_blurb = page.category_blurbs[category] %}
  {% if category_blurb %}
    <p class="category-blurb">{{ category_blurb }}</p>
  {% endif %}
  {% assign categorized_projects = site.projects | where: "category", category %}
  {% assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display projects without categories -->

{% assign sorted_projects = site.projects | sort: "importance" %}

  <!-- Generate cards for each project -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>
