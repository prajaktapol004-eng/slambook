/**
 * ====================================================================
 * PRAJAKTA POL - PORTFOLIO CONFIGURATION & DATA REPOSITORY
 * ====================================================================
 * Tip for Prajakta: You can easily customize any text, project, 
 * certificate, or link below without rebuilding the website.
 * Changes take effect immediately when you refresh your browser.
 */

const PORTFOLIO_DATA = {
  // ------------------------------------------------------------------
  // 1. Personal & Hero Information
  // ------------------------------------------------------------------
  personal: {
    name: "PRAJAKTA POL",
    headline: "Aspiring PLC & Industrial Automation Engineer",
    availability: "Open to Entry-Level Opportunities | Pune, India",
    location: "Pune / Solapur, Maharashtra, India",
    email: "polprajakta07@gmail.com",
    profilePhoto: "assets/images/prajakta-photo.jpg",
    resumePdfUrl: "resume/Prajakta_Pol_Resume.pdf",
    
    // Social / Professional Profile Placeholders (Update with your actual links)
    linkedinPlaceholderUrl: "https://www.linkedin.com/in/prajakta-pol-placeholder",
    githubPlaceholderUrl: "https://github.com/prajaktapol-placeholder",
    
    // Supporting Hero Text
    heroBio: "Electronics and Telecommunication Engineering graduate with a foundation in PLC automation, industrial sensors, control systems, and embedded electronics. Passionate about solving real-world engineering problems and building reliable automation solutions.",
    
    // Quick Credibility Badges (Hero Stats)
    quickBadges: [
      { label: "B.Tech E&TC (2026)", sub: "8.25 / 10 CGPA", icon: "graduation" },
      { label: "PGDIA Completed", sub: "Siemens & Allen-Bradley", icon: "cpu" },
      { label: "DRDO & Laxmi Controls", sub: "Internship Exposure", icon: "shield" },
      { label: "Targeting Fresher Roles", sub: "Pune Automation Hub", icon: "map-pin" }
    ]
  },

  // ------------------------------------------------------------------
  // 2. About Me Section
  // ------------------------------------------------------------------
  about: {
    summary: "I hold a degree in Electronics and Telecommunication Engineering and have completed a comprehensive Post Graduate Diploma in Industrial Automation (PGDIA). My engineering journey is driven by a deep fascination with how physical machinery, sensor feedback, and deterministic PLC logic orchestrate modern manufacturing.",
    
    detailedBio: "Through rigorous coursework, hands-on lab training, and internship exposure at DRDO and Laxmi Controls, I have cultivated strong fundamentals in industrial control architectures, sensor signal conditioning, and relay logic. I am genuinely eager to apply my technical knowledge in an entry-level engineering role, learn directly from experienced control systems veterans, and contribute to dependable industrial automation projects across Pune and Maharashtra.",
    
    coreInterests: [
      {
        title: "PLC Programming & Troubleshooting",
        desc: "Ladder logic design, I/O mapping, fault diagnosis, and cycle sequencing for industrial operations.",
        icon: "terminal"
      },
      {
        title: "Industrial Automation & Control Systems",
        desc: "Closed-loop feedback control, sequence automation, and integration of field instruments.",
        icon: "sliders"
      },
      {
        title: "Sensors & Instrumentation",
        desc: "Interfacing proximity, optical, temperature, voltage, and analytical sensors with controllers.",
        icon: "activity"
      },
      {
        title: "Electrical Control Panels & Hardware",
        desc: "Understanding DIN rail layout, contactors, SMPS, MCB, overload relays, and safe wiring standards.",
        icon: "layout"
      },
      {
        title: "Embedded Systems & IoT",
        desc: "ESP32 firmware development, sensor data acquisition, and cloud/telemetry notification pipelines.",
        icon: "wifi"
      },
      {
        title: "Continuous Industrial Learning",
        desc: "Actively studying emerging standards, PROFINET bus topologies, SCADA screens, and safety protocols.",
        icon: "book-open"
      }
    ],

    engineeringMindset: [
      "Rigorous electrical safety and interlock adherence",
      "Deterministic, clean, well-commented ladder logic",
      "Systematic signal tracing & multimeter troubleshooting",
      "High attention to industrial documentation and ferrule labeling"
    ]
  },

  // ------------------------------------------------------------------
  // 3. Education Timeline
  // ------------------------------------------------------------------
  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      specialization: "Electronics & Telecommunication Engineering",
      institution: "N. B. Navale Sinhgad College of Engineering, Kegaon, Solapur, Maharashtra",
      year: "2026",
      cgpa: "8.25 / 10",
      status: "Final Year Graduate (2026)",
      highlights: [
        "Strong foundation in analog circuits, digital signal processing, microcontrollers, and communication systems.",
        "Active member and volunteer for Training & Placement (T&P) student cell, coordinating recruitment drives.",
        "Led multiple research and embedded IoT prototypes represented at national-level hackathons and conferences."
      ],
      badge: "Degree Program"
    },
    {
      degree: "Post Graduate Diploma in Industrial Automation (PGDIA)",
      specialization: "PLC, SCADA, Industrial Sensors & Control Systems",
      institution: "Industrial Automation Training Center",
      year: "Completed",
      cgpa: "Completed with Distinction in Practical Training",
      status: "Completed",
      highlights: [
        "Hands-on training exposure to Siemens PLC (SIMATIC S7 / TIA Portal environment) and Allen-Bradley PLC (MicroLogix / RSLogix).",
        "Practical understanding of industrial sensors (inductive, capacitive, photoelectric, RTD/thermocouple).",
        "Control panel fundamentals: contactor latching, emergency stop circuitry, 24VDC power supply distribution, and MCB protection.",
        "Introduction to HMI screens, SCADA tag configuration, and PROFINET industrial networking principles."
      ],
      badge: "Specialized Diploma"
    }
  ],

  // ------------------------------------------------------------------
  // 4. Technical Skills
  // ------------------------------------------------------------------
  skills: {
    categories: [
      {
        name: "PLC & Industrial Automation",
        icon: "cpu",
        description: "Core automation fundamentals, controller programming, and industrial field device integration.",
        items: [
          { name: "PLC Fundamentals & Ladder Logic", level: "Intermediate", tag: "IEC 61131-3" },
          { name: "Siemens PLC", level: "Trained / Practical Exposure", tag: "S7 Architecture" },
          { name: "Allen-Bradley PLC", level: "Trained / Practical Exposure", tag: "RSLogix" },
          { name: "Industrial Sensors", level: "Intermediate", tag: "Proximity, Optical, Temp" },
          { name: "HMI & SCADA Fundamentals", level: "Foundational Exposure", tag: "Tag & Screen Design" },
          { name: "Industrial Comm. & PROFINET Fundamentals", level: "Foundational Exposure", tag: "Ethernet / Fieldbus" },
          { name: "Control System Troubleshooting", level: "Intermediate", tag: "I/O Signal Tracing" }
        ]
      },
      {
        name: "Electronics & Instrumentation",
        icon: "zap",
        description: "Hardware testing, sensor signal conditioning, and low-voltage electrical switchgear.",
        items: [
          { name: "Analog & Digital Electronics Fundamentals", level: "Strong Foundation", tag: "Op-Amps, ADC, Gates" },
          { name: "Sensors & Signal Interfacing", level: "Intermediate", tag: "Conditioning & Scaling" },
          { name: "Relays, Contactors & SMPS", level: "Practical Knowledge", tag: "24VDC Control Circuits" },
          { name: "MCB & Thermal Overload Relays", level: "Practical Knowledge", tag: "Circuit Protection" },
          { name: "Electronic Hardware Testing & Troubleshooting", level: "Hands-on", tag: "Multimeter & DSO" }
        ]
      },
      {
        name: "Embedded Systems & IoT",
        icon: "wifi",
        description: "Rapid prototyping, microcontroller firmware, and wireless telemetry implementations.",
        items: [
          { name: "ESP32 Microcontroller", level: "Hands-on Proficiency", tag: "SoC Architecture" },
          { name: "Sensor Integration", level: "Hands-on Proficiency", tag: "Analog / I2S / GPIO" },
          { name: "Wi-Fi-based IoT Applications", level: "Hands-on Proficiency", tag: "HTTP & REST Telemetry" },
          { name: "ThingSpeak IoT Cloud", level: "Hands-on Proficiency", tag: "Real-time Logging" },
          { name: "Telegram Bot Integration", level: "Hands-on Proficiency", tag: "Automated Alerts" }
        ]
      },
      {
        name: "Tools & Programming",
        icon: "code",
        description: "Development environments, basic programming, and technical engineering documentation.",
        items: [
          { name: "PLC Programming & Simulation Tools", level: "Practical Use", tag: "Ladder Simulation" },
          { name: "Basic C Programming", level: "Foundational", tag: "Firmware Logic" },
          { name: "Technical Documentation & Testing", level: "Proficient", tag: "Schematics & Test Logs" }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------
  // 5. Featured Projects
  // ------------------------------------------------------------------
  featuredProjects: [
    {
      id: "water-quality-iot",
      title: "Water Quality Monitoring System",
      category: "Embedded IoT & Instrumentation",
      subtitle: "Multi-parameter automated water health acquisition platform with cloud analytics.",
      description: "An IoT-based system engineered for continuous multi-parameter water quality monitoring using an ESP32 microcontroller and precision analog sensors.",
      detailedOverview: "Designed to replace manual water sampling with an automated telemetry node. The system samples analog voltage outputs from multiple immersion probes, converts signals via calibrated ADC routines, and securely transmits real-time metrics over Wi-Fi to a cloud dashboard for automated logging.",
      technologies: ["ESP32", "TDS Sensor", "pH Sensor", "Turbidity Sensor", "Temperature Sensor", "Custom PCB", "ThingSpeak"],
      features: [
        "Monitors multiple water quality parameters simultaneously (pH, TDS, turbidity, and temperature).",
        "Sends calibrated sensor readings directly to the ThingSpeak IoT cloud platform for remote visualization.",
        "Supports real-time data logging, automated threshold alerts, and historical trend analysis.",
        "Custom PCB layout designed for noise reduction and stable sensor signal conditioning."
      ],
      image: "assets/images/project-water-quality.svg",
      deliverableType: "Hardware Prototype & Cloud Pipeline",
      metrics: {
        parameters: "4 Real-Time Channels",
        connectivity: "2.4 GHz Wi-Fi / REST API",
        samplingRate: "Adjustable 10s Telemetry",
        cloudPlatform: "ThingSpeak Analytics"
      }
    },
    {
      id: "smart-energy-meter",
      title: "Smart Energy Meter",
      category: "IoT Power Instrumentation",
      subtitle: "AC voltage monitoring system with galvanic isolation and automated Telegram alerts.",
      description: "An ESP32-based energy monitoring project utilizing a precision voltage transformer sensor and Wi-Fi connectivity for remote telemetry.",
      detailedOverview: "Developed to measure single-phase AC line voltage accurately while maintaining electrical safety. The onboard ZMPT101B transformer provides essential galvanic isolation between 230V AC mains and the 3.3V low-voltage ESP32 MCU. When line fluctuations occur, the microcontroller dispatches immediate status notifications to an authorized Telegram bot.",
      technologies: ["ESP32", "ZMPT101B Voltage Sensor", "Wi-Fi", "Telegram Bot API"],
      features: [
        "Measures single-phase AC voltage accurately using the onboard ZMPT101B potential transformer.",
        "Provides true galvanic isolation to safeguard sensitive microcontroller electronics from mains surges.",
        "Supports remote monitoring and instant event notifications directly through an automated Telegram bot.",
        "Eliminates dependency on local physical displays by delivering notifications straight to mobile devices."
      ],
      strictNote: "Engineered specifically with ZMPT101B voltage sensing and Telegram bot connectivity (does not require OLED displays, Firebase, or current sensors).",
      image: "assets/images/project-energy-meter.svg",
      deliverableType: "Isolated AC Sensing System",
      metrics: {
        inputRange: "0 - 250V AC (50Hz)",
        isolation: "Galvanic Transformer",
        alertMechanism: "Telegram Bot API",
        microcontroller: "ESP32 SoC"
      }
    },
    {
      id: "encrypted-walkie-talkie",
      title: "Smart Encrypted Walkie-Talkie",
      category: "Wireless & Embedded Security",
      subtitle: "Peer-to-peer secure digital voice transceiver leveraging ESP-NOW and AES encryption.",
      description: "A wireless digital voice communication prototype engineered using ESP32 nodes and the connectionless ESP-NOW protocol, fortified with AES encryption.",
      detailedOverview: "Investigated low-latency digital voice transmission without conventional Wi-Fi router infrastructure. Audio is captured through a digital I2S MEMS microphone, converted to discrete PCM packets, encrypted in hardware via AES-128, and transmitted directly across a 2.4 GHz peer-to-peer radio link before decrypting at the receiver.",
      technologies: ["ESP32", "ESP-NOW Protocol", "AES Encryption", "I2S Digital Microphone", "Digital Voice Comm"],
      features: [
        "Direct connectionless RF peer-to-peer voice transmission via low-overhead ESP-NOW protocol.",
        "Hardware-accelerated AES encryption safeguarding voice data packets against unauthorized eavesdropping.",
        "High-fidelity digital audio sampling utilizing I2S digital microphone interface.",
        "Operates independently without needing an external Wi-Fi router or cellular network."
      ],
      image: "assets/images/project-walkie-talkie.svg",
      deliverableType: "Embedded Security Prototype",
      metrics: {
        protocol: "ESP-NOW (2.4 GHz)",
        encryption: "AES-128 Cipher",
        audioInterface: "I2S Digital PCM",
        latency: "Low-Latency Direct Link"
      }
    },
    {
      id: "silk-fibroin-filter",
      title: "Silk Fibroin Membrane Water Filter",
      category: "Materials Research & Filtration",
      subtitle: "Research-driven sustainable biopolymer membrane engineered for advanced water purification.",
      description: "A research-oriented engineering project exploring a natural silk fibroin-based porous membrane for effective microfiltration and water purification.",
      detailedOverview: "Conducted laboratory-scale materials synthesis by degumming natural silk cocoons, isolating structural fibroin proteins, and casting a porous microfiltration membrane. Evaluated its particulate retention, heavy-metal adsorption potential, and biological compatibility under controlled water flow conditions.",
      technologies: ["Silk Fibroin Biopolymer", "Membrane Casting", "Water Filtration Analysis", "Materials Testing"],
      features: [
        "Investigated sustainable, biodegradable biomaterials as advanced filtration media.",
        "Applied rigorous engineering experimental protocols to test flow rates, turbidity removal, and particulate rejection.",
        "Recognized with 'Best Oral Presentation' award at the 2nd International Conference on Silk Fibroin and Sericulture Resources.",
        "Bridged chemical material synthesis with practical civil and environmental water treatment principles."
      ],
      image: "assets/images/project-silk-fibroin.svg",
      deliverableType: "Academic Research & Lab Testing",
      metrics: {
        material: "Natural Silk Fibroin",
        filtrationType: "Microfiltration Membrane",
        recognition: "Best Oral Presentation Award",
        application: "Sustainable Water Purification"
      }
    }
  ],

  // ------------------------------------------------------------------
  // 6. Industrial Automation Practice (Dedicated Learning Work)
  // ------------------------------------------------------------------
  automationPractice: {
    notice: "TRAINING & SIMULATION SECTION: The exercises below represent rigorous laboratory simulations, ladder logic diagrams, and training exercises completed during automation coursework and PGDIA diploma, clearly distinguished from workplace deployment.",
    modules: [
      {
        id: "motor-control",
        title: "Motor Start / Stop Control (DOL Starter)",
        tag: "Core Ladder Logic",
        desc: "Classic Direct-On-Line (DOL) starter logic featuring normally-open start button (I0.0), normally-closed stop button (I0.1), normally-closed thermal overload contact (I0.2), and output contactor seal-in latch (Q0.0).",
        keyConcepts: ["Momentary Pushbutton Latching", "Seal-in Holding Contact", "Hardware Overload Interlocking", "Fail-safe Stop Configuration"],
        ladderImage: "assets/images/plc-ladder-motor.svg",
        interactiveId: "sim-motor"
      },
      {
        id: "timer-circuits",
        title: "Timer On-Delay (TON) Applications",
        tag: "Sequence Timing",
        desc: "Implementation of IEC On-Delay Timers for sequential machinery startup, lubrication pre-cycles, and delayed valve actuation upon conveyor sensor trigger.",
        keyConcepts: ["Preset Time (PT) & Elapsed Time (ET)", "Done (DN) Bit Execution", "Sequential Actuation", "Reset Condition Handling"],
        ladderImage: "assets/images/plc-ladder-timer.svg",
        interactiveId: "sim-timer"
      },
      {
        id: "counter-sensor",
        title: "Sensor-Based Control & Part Counting",
        tag: "Batch Automation",
        desc: "Integration of inductive and photoelectric proximity sensors with PLC Up-Counters (CTU) to monitor conveyor parts, execute automated batch rejection, and route diverter gates.",
        keyConcepts: ["Sensor Debouncing & High-Speed Input", "Count Up (CTU) Logic", "Preset Value Comparison", "Pneumatic Diverter Triggering"],
        ladderImage: "assets/images/plc-ladder-sensor.svg",
        interactiveId: "sim-counter"
      },
      {
        id: "hmi-concepts",
        title: "HMI & PLC Communication Fundamentals",
        tag: "Operator Interface",
        desc: "Understanding industrial human-machine interfaces, digital tag mapping, alarm banner configuration, manual/auto mode selection switches, and PROFINET communication handshake.",
        keyConcepts: ["Tag Addressing (M & DB registers)", "Alarm Trigger & Acknowledgement", "Real-time Status Animation", "Operator Safety Interlocks"],
        ladderImage: "assets/images/internship-laxmi.svg",
        interactiveId: null
      }
    ]
  },

  // ------------------------------------------------------------------
  // 7. Internships & Practical Experience
  // ------------------------------------------------------------------
  internships: [
    {
      company: "Defence Research and Development Organisation (DRDO)",
      role: "Engineering Internship (Instrumentation & Electronics)",
      duration: "2026",
      location: "India",
      type: "Research & Defence Exposure",
      badge: "DRDO Internship",
      image: "assets/images/internship-drdo.svg",
      disclaimer: "Strictly describes internship exposure and project-related learning. Does not claim independent experimental results, security clearances, or individual certifications beyond documented intern exposure.",
      exposurePoints: [
        "Valuable technical exposure to high-precision nuclear and radiation instrumentation setups.",
        "Observed and studied the operating principles of Gamma Ray Spectrometers (NaI scintillation detectors and Multi-Channel Analyzers).",
        "Learned practical usage and data logging methodologies with radiation dosimeters.",
        "Studied specialized high-reliability RF connectors and radiation-hardened connectors designed for extreme environmental resilience.",
        "Gained practical understanding of laboratory safety protocols surrounding a Cobalt-60 (Co-60) gamma radiation source chamber."
      ]
    },
    {
      company: "Laxmi Controls",
      role: "Industrial Automation Intern",
      duration: "2025",
      location: "Solapur, Maharashtra",
      type: "Industrial Panel & Automation Exposure",
      badge: "Automation Internship",
      image: "assets/images/internship-laxmi.svg",
      disclaimer: "Provides foundational workshop exposure to electrical control panel construction and industrial components.",
      exposurePoints: [
        "Hands-on exposure to industrial electrical control panels, component layout, and standard DIN rail assembly.",
        "Familiarization with switchgear equipment including 3-phase MCBs, 24VDC SMPS, power contactors, and thermal overload relays.",
        "Assisted in understanding industrial wiring schematics, ferrule numbering conventions, and terminal block (TB) connections.",
        "Observed PLC wiring methods for digital inputs (pushbuttons, limit switches) and digital outputs (pilot lamps, relay coils).",
        "Space reserved for detailed workplace logs, specific equipment handled, and project documentation."
      ]
    }
  ],

  // ------------------------------------------------------------------
  // 8. Achievements & Recognition
  // ------------------------------------------------------------------
  achievements: [
    {
      title: "Best Oral Presentation",
      event: "2nd International Conference on Silk Fibroin and Sericulture Resources",
      category: "International Conference",
      year: "2025 - 2026",
      desc: "Awarded top oral presenter for presenting innovative research findings on silk fibroin biomaterial membrane fabrication for sustainable water filtration.",
      icon: "award"
    },
    {
      title: "Best Research Paper Award",
      event: "National Conference on Recent Trends in Computing (NCRTC 2025)",
      category: "National Conference",
      year: "2025",
      desc: "Recognized for authoring and defending a premier research paper demonstrating engineering methodologies and technical rigor.",
      icon: "file-text"
    },
    {
      title: "First Rank — Ideathon Spirit 2K25",
      event: "SVERI College of Engineering",
      category: "Technical Ideathon",
      year: "2025",
      desc: "Secured First Position among competing engineering teams for proposing an impactful technology solution addressing real-world challenges.",
      icon: "trophy"
    },
    {
      title: "Participant — Prometeo'25",
      event: "Indian Institute of Technology (IIT) Jodhpur",
      category: "Premier Technical Fest",
      year: "2025",
      desc: "Selected to participate in the flagship technical festival at IIT Jodhpur, engaging with national engineering innovators and technical symposiums.",
      icon: "compass"
    },
    {
      title: "Training & Placement (T&P) Student Volunteer",
      event: "N. B. Navale Sinhgad College of Engineering",
      category: "Leadership & Institutional Service",
      year: "2024 - 2026",
      desc: "Actively coordinated on-campus recruitment drives, corporate liaison, technical evaluation setups, and candidate guidance for peer engineering cohorts.",
      icon: "users"
    }
  ],

  // ------------------------------------------------------------------
  // 9. Contact Information & Call To Action
  // ------------------------------------------------------------------
  contact: {
    ctaHeading: "Let's Connect and Build Reliable Automation Solutions.",
    ctaSubtitle: "I am actively seeking entry-level PLC Automation, Control Systems, and Electronics Engineer positions in Pune and Maharashtra. Let's discuss how my training and hands-on dedication can add value to your engineering team.",
    email: "polprajakta07@gmail.com",
    location: "Pune / Solapur, Maharashtra, India",
    preferredRoles: [
      "PLC Automation Engineer (Fresher / Trainee)",
      "Industrial Control Systems Engineer",
      "Automation & Instrumentation Engineer",
      "Electronics / Service Engineer"
    ],
    noteOnProfiles: "Direct email contact is actively monitored. LinkedIn and GitHub profile placeholders are ready to be linked to verified handles."
  }
};

// Export for module systems or attach to window for direct browser use
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
