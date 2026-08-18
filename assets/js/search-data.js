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
          description: "Co-designing hardware and algorithms for efficient foundation-model computing.",
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
          description: "Processors, accelerators, and the hardware underneath them — built from the RTL up, and measured rather than asserted.",
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
        },{id: "post-where-the-joules-actually-go-in-a-systolic-array",
        
          title: "Where the Joules Actually Go in a Systolic Array",
        
        description: "Talos steps a real PE mesh one clock at a time, and the numbers that fall out explain most of the last fifteen years of accelerator architecture.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/where-the-joules-go-systolic-arrays/";
          
        },
      },{id: "post-verifying-an-out-of-order-risc-v-core-in-lock-step",
        
          title: "Verifying an Out-of-Order RISC-V Core in Lock-Step",
        
        description: "How Chiron proves a speculative, out-of-order, quad-core processor correct — instruction by instruction, on every hart — against a golden model, without sacrificing readability.",
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
        
        description: "How a final-year project — out-of-order cores, a coherent cache hierarchy, and enough of a system to boot Linux — went from Chisel RTL onto an FPGA, and became the processor I now call Chiron.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/cache-coherent-ooo-multicore-riscv/";
          
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
            },},{id: "news-released-chiron-a-lock-step-verified-out-of-order-risc-v-processor-and-astra-a-physics-accurate-leo-satellite-network-simulator",
          title: 'Released Chiron, a lock-step verified out-of-order RISC-V processor, and ASTRA, a physics-accurate LEO...',
          description: "",
          section: "News",},{id: "news-released-talos-a-cycle-accurate-systolic-array-simulator-that-shows-where-the-cycles-and-the-joules-actually-go-validated-against-published-tpuv1-silicon-️",
          title: 'Released Talos — a cycle-accurate systolic array simulator that shows where the cycles...',
          description: "",
          section: "News",},{id: "news-chiron-boots-quad-core-linux-smp",
          title: 'Chiron boots quad-core Linux SMP',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_5/";
            },},{id: "projects-astra-autonomous-satellite-traffic-amp-routing-architecture",
          title: 'ASTRA: Autonomous Satellite Traffic &amp;amp; Routing Architecture',
          description: "A physics-accurate LEO satellite constellation simulator in pure C11 with custom OpenGL visualization, dynamic-topology routing, and machine-precision validation.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/astra/";
            },},{id: "projects-chiron-quad-core-out-of-order-risc-v",
          title: 'Chiron — Quad-Core Out-of-Order RISC-V',
          description: "Four out-of-order RV64IMA cores in Chisel behind an ACE-coherent cache hierarchy — verified instruction-by-instruction against a golden model, booting Linux SMP to an interactive shell, and deployed to FPGA.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/chiron/";
            },},{id: "projects-reciprocal-frequency-counter",
          title: 'Reciprocal Frequency Counter',
          description: "A high-precision reciprocal frequency counter measuring signals from 1Hz to 100MHz with up to 100V amplitude",
          section: "Projects",handler: () => {
              window.location.href = "/projects/frequency-counter/";
            },},{id: "projects-analog-function-generator",
          title: 'Analog Function Generator',
          description: "Function generator capable of producing sine, square, triangular, and sawtooth waveforms with adjustable duty cycle",
          section: "Projects",handler: () => {
              window.location.href = "/projects/function-generator/";
            },},{id: "projects-parallel-system-bus-on-fpga",
          title: 'Parallel System Bus on FPGA',
          description: "Multi-master, multi-slave bus architecture enabling efficient parallel communication on DE0-Nano FPGA",
          section: "Projects",handler: () => {
              window.location.href = "/projects/parallel-system-bus/";
            },},{id: "projects-multi-threaded-risc-v-benchmark-framework",
          title: 'Multi-threaded RISC-V Benchmark Framework',
          description: "A portable and extensible RISC-V benchmark suite for multicore processors.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/riscv-benchmark-suite/";
            },},{id: "projects-parametric-risc-v-multi-core-emulator",
          title: 'Parametric RISC-V multi-core emulator',
          description: "RISC-V multi-core emulator capable of booting both Linux and bare-metal programs",
          section: "Projects",handler: () => {
              window.location.href = "/projects/riscv-multicore-emulator/";
            },},{id: "projects-parameterized-simd-processor-for-matrix-operations",
          title: 'Parameterized SIMD Processor for Matrix Operations',
          description: "Fully parameterized SIMD processor with custom ISA for matrix arithmetic and hardware acceleration on FPGA",
          section: "Projects",handler: () => {
              window.location.href = "/projects/simd-matrix-processor/";
            },},{id: "projects-talos-systolic-array-simulator",
          title: 'Talos — Systolic Array Simulator',
          description: "A cycle-accurate systolic-array and dataflow simulator in pure Python — it steps a real PE mesh one clock at a time and tells you exactly where the cycles and the joules went.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/talos/";
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
