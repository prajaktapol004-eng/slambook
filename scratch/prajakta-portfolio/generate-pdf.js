const fs = require('fs');
const path = require('path');

function createSimplePDF(filePath) {
  // Build a valid PDF 1.4 document
  const lines = [
    "PRAJAKTA POL",
    "Aspiring PLC & Industrial Automation Engineer | Pune / Solapur, Maharashtra",
    "Email: polprajakta07@gmail.com | Open to Entry-Level Roles (Pune, India)",
    "--------------------------------------------------------------------------------",
    "",
    "CAREER OBJECTIVE",
    "Electronics and Telecommunication Engineering graduate with a foundation in PLC",
    "automation, industrial sensors, control systems, and embedded electronics. Passionate",
    "about solving real-world engineering problems and building reliable automation solutions.",
    "",
    "EDUCATION",
    "* Bachelor of Technology (B.Tech) - Electronics & Telecommunication Engineering",
    "  N. B. Navale Sinhgad College of Engineering, Kegaon, Solapur | Year: 2026 | CGPA: 8.25 / 10",
    "* Post Graduate Diploma in Industrial Automation (PGDIA)",
    "  Status: Completed | Siemens PLC, Allen-Bradley PLC, Industrial Sensors, Automation Fundamentals",
    "",
    "TECHNICAL SKILLS",
    "* PLC & Automation: PLC Fundamentals, Ladder Logic, Siemens PLC, Allen-Bradley PLC,",
    "  Industrial Sensors, HMI/SCADA Fundamentals, PROFINET & Industrial Communication,",
    "  Control System Troubleshooting",
    "* Electronics & Instrumentation: Analog & Digital Electronics, Sensors & Signal Interfacing,",
    "  Relays, Contactors, SMPS, MCB, Overload Relays, Hardware Testing & Troubleshooting",
    "* Embedded Systems & IoT: ESP32, Sensor Integration, Wi-Fi IoT, ThingSpeak, Telegram Bot",
    "* Tools & Programming: PLC Simulation Software, Basic C Programming, Documentation & Testing",
    "",
    "INTERNSHIP & PRACTICAL EXPOSURE",
    "* DRDO Internship (2026) - Project Exposure & Instrumentation Learning",
    "  Exposure to Gamma Ray Spectrometer, dosimeter, RF & radiation-hardened connectors,",
    "  and Cobalt-60 gamma radiation source chamber.",
    "* Laxmi Controls, Solapur (2025) - Panel & Automation Internship",
    "  Exposure to industrial electrical control panels, DIN rail hardware, relays & contactors.",
    "",
    "KEY ENGINEERING PROJECTS",
    "* Water Quality Monitoring System (ESP32, TDS, pH, Turbidity, Temp, PCB, ThingSpeak)",
    "  Multi-parameter real-time sensor acquisition with IoT cloud telemetry.",
    "* Smart Energy Meter (ESP32, ZMPT101B Voltage Transformer, Wi-Fi, Telegram Bot)",
    "  True RMS AC mains voltage monitoring and automated notification alerts.",
    "* Smart Encrypted Walkie-Talkie (ESP32, ESP-NOW, AES-128, I2S Digital Mic)",
    "  Low-latency encrypted peer-to-peer digital voice communication.",
    "* Silk Fibroin Membrane Water Filter",
    "  Research-oriented nanofiber biomaterial membrane synthesis for water filtration.",
    "* PLC Industrial Automation Practice",
    "  IEC 61131-3 Ladder Logic: DOL Motor starter with latch, timer (TON), sensor part counter.",
    "",
    "HONORS & AWARDS",
    "* Best Oral Presentation - 2nd Int'l Conf. on Silk Fibroin & Sericulture Resources",
    "* Best Research Paper - NCRTC 2025",
    "* First Rank - Ideathon Spirit 2K25, SVERI",
    "* Participant - Prometeo'25, IIT Jodhpur | T&P Student Volunteer"
  ];

  // Helper to escape PDF strings
  function escapePdf(str) {
    return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  }

  // Stream text instructions
  let streamContent = "BT\n/F1 14 Tf\n50 780 Td\n(" + escapePdf(lines[0]) + ") Tj\n";
  streamContent += "/F1 9 Tf\n0 -16 Td\n(" + escapePdf(lines[1]) + ") Tj\n";
  streamContent += "0 -13 Td\n(" + escapePdf(lines[2]) + ") Tj\n";
  streamContent += "0 -10 Td\n(" + escapePdf(lines[3]) + ") Tj\n";
  streamContent += "0 -16 Td\n";

  for (let i = 4; i < lines.length; i++) {
    const line = lines[i];
    const isHeading = ["CAREER OBJECTIVE", "EDUCATION", "TECHNICAL SKILLS", "INTERNSHIP & PRACTICAL EXPOSURE", "KEY ENGINEERING PROJECTS", "HONORS & AWARDS"].includes(line);
    
    if (isHeading) {
      streamContent += "/F2 11 Tf\n(" + escapePdf(line) + ") Tj\n/F1 9 Tf\n0 -14 Td\n";
    } else {
      streamContent += "(" + escapePdf(line) + ") Tj\n0 -12 Td\n";
    }
  }
  streamContent += "ET\n";

  const streamLength = Buffer.byteLength(streamContent, 'utf-8');

  // Objects
  const objects = [];
  
  // 1: Catalog
  objects.push("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
  // 2: Pages
  objects.push("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");
  // 3: Page
  objects.push("3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n");
  // 4: Stream
  objects.push(`4 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}endstream\nendobj\n`);
  // 5: Font Regular
  objects.push("5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n");
  // 6: Font Bold
  objects.push("6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n");

  let body = "%PDF-1.4\n";
  const xref = ["xref\n0 7\n0000000000 65535 f \n"];
  let offset = Buffer.byteLength(body, 'utf-8');

  for (let i = 0; i < objects.length; i++) {
    const pad = String(offset).padStart(10, '0');
    xref.push(`${pad} 00000 n \n`);
    body += objects[i];
    offset = Buffer.byteLength(body, 'utf-8');
  }

  const startxref = offset;
  const trailer = `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;
  const pdfBuffer = Buffer.from(body + xref.join('') + trailer, 'utf-8');

  fs.writeFileSync(filePath, pdfBuffer);
  console.log('Successfully created PDF at:', filePath);
}

const outPath = path.join(__dirname, 'resume', 'Prajakta_Pol_Resume.pdf');
createSimplePDF(outPath);
