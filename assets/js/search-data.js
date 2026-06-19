// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-research",
          title: "research",
          description: "What I work on, why it matters, and where I want to take it.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "Peer-reviewed publications on hardware-accelerated transformers, neuromorphic computing, and FPGA-based systems — IEEE HPEC, CHEP, ISARC, and INTCEC.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "Selected projects in computer architecture and accelerated computing — a verified out-of-order RISC-V processor, a cache-coherent multicore CPU, a physics-accurate LEO satellite-network simulator, and custom SIMD hardware.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "Curriculum vitae of Hiruna Vishwamith — computer architecture, FPGA design, and AI acceleration. Education, publications, awards, and selected projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-verifying-an-out-of-order-risc-v-core-in-lock-step",
        
          title: "Verifying an Out-of-Order RISC-V Core in Lock-Step",
        
        description: "How Chiron proves a speculative, out-of-order processor correct — instruction by instruction — against a golden model, without sacrificing readability.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/verifying-out-of-order-riscv/";
          
        },
      },{id: "post-simulating-leo-satellite-networks-to-machine-precision-in-c",
        
          title: "Simulating LEO Satellite Networks to Machine Precision in C",
        
        description: "ASTRA couples real orbital mechanics to a per-timestep network model so that routing and traffic decisions are made over a physically correct, continuously-changing topology.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/leo-satellite-networks-machine-precision/";
          
        },
      },{id: "post-putting-transformers-and-spiking-networks-on-silicon",
        
          title: "Putting Transformers and Spiking Networks on Silicon",
        
        description: "A look at the thread running through my research — mapping modern AI and neuromorphic models onto hardware for real-time scientific workloads, from HPEC and CHEP to ISARC.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/transformers-on-hardware-hpec-2025/";
          
        },
      },{id: "post-an-end-to-end-cache-coherent-out-of-order-risc-v-multicore",
        
          title: "An End-to-End Cache-Coherent, Out-of-Order RISC-V Multicore",
        
        description: "Building a modular multicore RISC-V processor — out-of-order cores, a coherent cache hierarchy, and enough of a system to boot Linux — from RTL all the way to FPGA.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/cache-coherent-ooo-multicore-riscv/";
          
        },
      },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-joined-apex-compute-california-as-a-full-time-fpga-design-engineer-designing-high-performance-reconfigurable-architectures",
          title: 'Joined Apex Compute (California) as a full-time FPGA Design Engineer, designing high-performance reconfigurable...',
          description: "",
          section: "News",},{id: "news-two-papers-published-at-ieee-hpec-2025",
          title: 'Two papers published at IEEE HPEC 2025',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-released-chiron-a-fully-verified-out-of-order-risc-v-processor-that-boots-linux-and-astra-a-physics-accurate-leo-satellite-network-simulator",
          title: 'Released Chiron, a fully verified out-of-order RISC-V processor that boots Linux, and ASTRA,...',
          description: "",
          section: "News",},{id: "projects-multi-threaded-risc-v-benchmark-framework",
          title: 'Multi-threaded RISC-V Benchmark Framework',
          description: "A portable and extensible RISC-V benchmark suite for multicore processors.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-cache-coherent-out-of-order-risc-v-multicore-processor",
          title: 'Cache-Coherent, Out-of-Order RISC-V Multicore Processor',
          description: "A modular, cache-coherent RISC-V out-of-order multicore processor capable of running bare-metal workloads and Linux images.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-parametric-risc-v-multi-core-emulator",
          title: 'Parametric RISC-V multi-core emulator',
          description: "RISC-V multi-core emulator capable of booting both Linux and bare-metal programs",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-parallel-system-bus-on-fpga",
          title: 'Parallel System Bus on FPGA',
          description: "Multi-master, multi-slave bus architecture enabling efficient parallel communication on DE0-Nano FPGA",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-parameterized-simd-processor-for-matrix-operations",
          title: 'Parameterized SIMD Processor for Matrix Operations',
          description: "Fully parameterized SIMD processor with custom ISA for matrix arithmetic and hardware acceleration on FPGA",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-reciprocal-frequency-counter",
          title: 'Reciprocal Frequency Counter',
          description: "A high-precision reciprocal frequency counter measuring signals from 1Hz to 100MHz with up to 100V amplitude",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-analog-function-generator",
          title: 'Analog Function Generator',
          description: "Function generator capable of producing sine, square, triangular, and sawtooth waveforms with adjustable duty cycle",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-chiron-an-out-of-order-risc-v-processor",
          title: 'Chiron: An Out-of-Order RISC-V Processor',
          description: "A fully verified, teaching-grade out-of-order RV64IMA core in Chisel that boots Linux and proves correctness in lock-step against a golden model.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-astra-autonomous-satellite-traffic-amp-routing-architecture",
          title: 'ASTRA: Autonomous Satellite Traffic &amp;amp; Routing Architecture',
          description: "A physics-accurate LEO satellite constellation simulator in pure C11 with custom OpenGL visualization, dynamic-topology routing, and machine-precision validation.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%68%76%69%73%68%77%61%6D%69%74%68@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/HirunaVishwamith", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/hiruna-vishwamith-910839225/", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=-InRMU4AAAAJ", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/HVishwamith", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
