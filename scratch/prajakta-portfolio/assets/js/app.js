/**
 * ====================================================================
 * PRAJAKTA POL - PORTFOLIO INTERACTIVITY & RENDER ENGINE
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
  renderHero();
  renderAbout();
  renderEducation();
  renderSkills();
  renderFeaturedProjects();
  renderAutomationPractice();
  renderExperience();
  renderAchievements();
  renderResumeSection();
  renderContact();
  initModals();
  initScrollAnimations();

  // Initialize PLC Simulator if present
  if (window.plcSimulator && typeof window.plcSimulator.init === "function") {
    window.plcSimulator.init();
  }
});

// --------------------------------------------------------------------
// Dark / Light Mode Switcher
// --------------------------------------------------------------------
function initTheme() {
  const savedTheme = localStorage.getItem("prajakta_theme") || "dark";
  applyTheme(savedTheme);

  const toggleButtons = document.querySelectorAll(".theme-toggle-btn");
  toggleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isCurrentlyLight = document.documentElement.classList.contains("light");
      const nextTheme = isCurrentlyLight ? "dark" : "light";
      applyTheme(nextTheme);
      localStorage.setItem("prajakta_theme", nextTheme);
    });
  });
}

function applyTheme(theme) {
  const html = document.documentElement;
  const isLight = theme === "light";
  
  if (isLight) {
    html.classList.remove("dark");
    html.classList.add("light");
  } else {
    html.classList.remove("light");
    html.classList.add("dark");
  }

  const icons = document.querySelectorAll(".theme-toggle-icon");
  const labels = document.querySelectorAll(".theme-toggle-label");

  icons.forEach(icon => {
    icon.innerHTML = isLight
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-500"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-sky-400"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  });

  labels.forEach(label => {
    label.textContent = isLight ? "Light Mode" : "Dark Mode";
  });
}

// --------------------------------------------------------------------
// Navigation & Header Scroll State
// --------------------------------------------------------------------
function initNavbar() {
  const header = document.getElementById("main-header");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("nav-scrolled");
    } else {
      header.classList.remove("nav-scrolled");
    }
  });

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }
}

// --------------------------------------------------------------------
// 1. Hero Section Rendering
// --------------------------------------------------------------------
function renderHero() {
  const data = window.PORTFOLIO_DATA.personal;
  
  const headlineEl = document.getElementById("hero-headline");
  const bioEl = document.getElementById("hero-bio");
  const availabilityEl = document.getElementById("hero-availability");
  const badgesContainer = document.getElementById("hero-badges");
  const profileImgEl = document.getElementById("hero-profile-img");

  if (headlineEl) headlineEl.textContent = data.headline;
  if (bioEl) bioEl.textContent = data.heroBio;
  if (availabilityEl) availabilityEl.textContent = data.availability;
  if (profileImgEl) {
    profileImgEl.src = data.profilePhoto;
    profileImgEl.alt = `${data.name} - PLC & Industrial Automation Engineer`;
  }

  if (badgesContainer && data.quickBadges) {
    badgesContainer.innerHTML = data.quickBadges.map(badge => `
      <div class="glass-panel p-3.5 rounded-lg border border-slate-700/70 hover:border-sky-500/50 transition-all flex items-center gap-3">
        <div class="w-10 h-10 rounded-md bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
          ${getSvgIcon(badge.icon)}
        </div>
        <div>
          <div class="text-xs font-bold text-white uppercase tracking-wider">${badge.label}</div>
          <div class="text-xs text-slate-400 font-mono">${badge.sub}</div>
        </div>
      </div>
    `).join("");
  }
}

// --------------------------------------------------------------------
// 2. About Me Section Rendering
// --------------------------------------------------------------------
function renderAbout() {
  const about = window.PORTFOLIO_DATA.about;
  const summaryEl = document.getElementById("about-summary");
  const bioEl = document.getElementById("about-detailed-bio");
  const interestsContainer = document.getElementById("about-interests-grid");
  const mindsetContainer = document.getElementById("about-mindset-list");

  if (summaryEl) summaryEl.textContent = about.summary;
  if (bioEl) bioEl.textContent = about.detailedBio;

  if (interestsContainer && about.coreInterests) {
    interestsContainer.innerHTML = about.coreInterests.map(item => `
      <div class="glass-panel p-5 rounded-xl border border-slate-700/60 hover:border-sky-500/40 hover:-translate-y-1 transition-all">
        <div class="w-10 h-10 rounded-lg bg-sky-950/60 border border-sky-400/30 text-sky-400 flex items-center justify-center mb-3">
          ${getSvgIcon(item.icon)}
        </div>
        <h3 class="text-base font-bold text-white mb-1.5">${item.title}</h3>
        <p class="text-sm text-slate-300 leading-relaxed">${item.desc}</p>
      </div>
    `).join("");
  }

  if (mindsetContainer && about.engineeringMindset) {
    mindsetContainer.innerHTML = about.engineeringMindset.map(text => `
      <li class="flex items-start gap-2.5 text-sm text-slate-300">
        <span class="text-emerald-400 mt-0.5 shrink-0">${getSvgIcon("check-circle")}</span>
        <span>${text}</span>
      </li>
    `).join("");
  }
}

// --------------------------------------------------------------------
// 3. Education Section Rendering
// --------------------------------------------------------------------
function renderEducation() {
  const eduData = window.PORTFOLIO_DATA.education;
  const container = document.getElementById("education-timeline");

  if (!container || !eduData) return;

  container.innerHTML = eduData.map((edu, idx) => `
    <div class="relative pl-8 pb-10 last:pb-2 border-l-2 border-sky-500/30 last:border-l-transparent">
      <!-- Node Indicator -->
      <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-sky-400 chip-glow"></div>
      
      <div class="glass-panel p-6 rounded-xl border border-slate-700/70 hover:border-sky-500/50 transition-all">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span class="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-sky-950 text-sky-300 border border-sky-800">
            ${edu.badge}
          </span>
          <span class="text-xs font-mono text-cyan-400 font-bold">${edu.year}</span>
        </div>
        
        <h3 class="text-lg font-bold text-white">${edu.degree}</h3>
        <div class="text-sm font-semibold text-sky-400 mb-1">${edu.specialization}</div>
        <div class="text-sm text-slate-300 mb-3">${edu.institution}</div>
        
        <div class="inline-block px-3 py-1 rounded bg-slate-800/80 border border-slate-700 text-xs font-mono text-emerald-400 font-bold mb-4">
          Score / Status: ${edu.cgpa}
        </div>

        <ul class="space-y-1.5">
          ${edu.highlights.map(h => `
            <li class="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
              <span class="text-sky-400 shrink-0 mt-0.5">&bull;</span>
              <span>${h}</span>
            </li>
          `).join("")}
        </ul>
      </div>
    </div>
  `).join("");
}

// --------------------------------------------------------------------
// 4. Technical Skills Rendering
// --------------------------------------------------------------------
function renderSkills() {
  const skillsData = window.PORTFOLIO_DATA.skills;
  const container = document.getElementById("skills-categories-grid");

  if (!container || !skillsData) return;

  container.innerHTML = skillsData.categories.map(cat => `
    <div class="glass-panel p-6 rounded-xl border border-slate-700/70 hover:border-sky-500/40 transition-all flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-lg bg-sky-950/70 border border-sky-400/30 text-sky-400 flex items-center justify-center shrink-0">
            ${getSvgIcon(cat.icon)}
          </div>
          <div>
            <h3 class="text-base font-bold text-white">${cat.name}</h3>
            <p class="text-xs text-slate-400">${cat.description}</p>
          </div>
        </div>

        <div class="space-y-2.5 mt-4">
          ${cat.items.map(item => `
            <div class="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-2 hover:border-slate-700 transition-colors">
              <div>
                <div class="text-xs sm:text-sm font-medium text-slate-200">${item.name}</div>
                <div class="text-[11px] font-mono text-cyan-400">${item.tag}</div>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-800 text-sky-300 border border-slate-700 shrink-0">
                ${item.level}
              </span>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <span>Verified Academic &amp; Lab Training</span>
        <span class="text-emerald-400 flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Ready
        </span>
      </div>
    </div>
  `).join("");
}

// --------------------------------------------------------------------
// 5. Featured Projects Rendering
// --------------------------------------------------------------------
function renderFeaturedProjects() {
  const projects = window.PORTFOLIO_DATA.featuredProjects;
  const container = document.getElementById("featured-projects-grid");

  if (!container || !projects) return;

  container.innerHTML = projects.map(proj => `
    <div class="glass-panel rounded-xl overflow-hidden border border-slate-700/70 hover:border-sky-500/50 transition-all flex flex-col group">
      <!-- Project Technical Schematic Banner -->
      <div class="relative bg-slate-950/80 border-b border-slate-800 p-3 h-52 sm:h-56 flex items-center justify-center overflow-hidden">
        <img 
          src="${proj.image}" 
          alt="${proj.title} Technical Architecture Diagram" 
          class="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
          loading="lazy"
        />
        <div class="absolute top-3 left-3">
          <span class="px-2.5 py-1 rounded text-[11px] font-mono font-bold bg-slate-900/90 text-sky-400 border border-sky-500/40">
            ${proj.category}
          </span>
        </div>
      </div>

      <!-- Project Content -->
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold text-white mb-1.5 group-hover:text-sky-400 transition-colors">
            ${proj.title}
          </h3>
          <p class="text-xs text-sky-300 font-mono mb-2">${proj.subtitle}</p>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            ${proj.description}
          </p>

          <!-- Key Features -->
          <ul class="space-y-1.5 mb-5">
            ${proj.features.slice(0, 3).map(f => `
              <li class="text-xs text-slate-300 flex items-start gap-2">
                <span class="text-cyan-400 mt-0.5 shrink-0">&bull;</span>
                <span>${f}</span>
              </li>
            `).join("")}
          </ul>

          <!-- Strict Engineering Note (if present) -->
          ${proj.strictNote ? `
            <div class="p-2.5 rounded bg-amber-950/30 border border-amber-800/40 text-[11px] text-amber-300/90 mb-4">
              <strong class="font-bold">Specification:</strong> ${proj.strictNote}
            </div>
          ` : ""}

          <!-- Tech Stack Badges -->
          <div class="flex flex-wrap gap-1.5 mb-6">
            ${proj.technologies.map(tech => `
              <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/90 text-slate-200 border border-slate-700">
                ${tech}
              </span>
            `).join("")}
          </div>
        </div>

        <button 
          onclick="openProjectModal('${proj.id}')"
          class="w-full py-2.5 px-4 rounded-lg bg-sky-950/60 hover:bg-sky-900 border border-sky-500/40 hover:border-sky-400 text-sky-300 hover:text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2"
        >
          <span>View Technical Details &amp; Specs</span>
          ${getSvgIcon("arrow-right")}
        </button>
      </div>
    </div>
  `).join("");
}

// --------------------------------------------------------------------
// 6. Industrial Automation Practice Section Rendering
// --------------------------------------------------------------------
function renderAutomationPractice() {
  const autoData = window.PORTFOLIO_DATA.automationPractice;
  const container = document.getElementById("automation-practice-cards");
  const noticeEl = document.getElementById("automation-notice-text");

  if (noticeEl) noticeEl.textContent = autoData.notice;

  if (container && autoData.modules) {
    container.innerHTML = autoData.modules.map(mod => `
      <div class="glass-panel rounded-xl overflow-hidden border border-slate-700/70 hover:border-sky-500/40 transition-all">
        <div class="p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span class="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-sky-950 text-sky-300 border border-sky-700 mr-2">
              ${mod.tag}
            </span>
            <h3 class="text-base font-bold text-white inline-block">${mod.title}</h3>
          </div>
          <span class="text-xs font-mono text-emerald-400 font-semibold">IEC 61131-3 Standard</span>
        </div>

        <div class="p-5">
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">${mod.desc}</p>
          
          <!-- Key Concepts Badges -->
          <div class="flex flex-wrap gap-1.5 mb-5">
            ${mod.keyConcepts.map(c => `
              <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-cyan-300 border border-slate-700">
                # ${c}
              </span>
            `).join("")}
          </div>

          <!-- Ladder Logic Diagram Graphic -->
          <div class="bg-slate-950 p-2 rounded-lg border border-slate-800 mb-4">
            <img 
              src="${mod.ladderImage}" 
              alt="${mod.title} Ladder Diagram" 
              class="w-full h-auto rounded"
              loading="lazy"
            />
          </div>

          <div class="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Simulation Platform: Siemens / RSLogix</span>
            <span class="text-sky-400">Ready for review</span>
          </div>
        </div>
      </div>
    `).join("");
  }
}

// --------------------------------------------------------------------
// 7. Internships & Experience Rendering
// --------------------------------------------------------------------
function renderExperience() {
  const experiences = window.PORTFOLIO_DATA.internships;
  const container = document.getElementById("experience-container");

  if (!container || !experiences) return;

  container.innerHTML = experiences.map((exp, idx) => `
    <div class="glass-panel rounded-xl overflow-hidden border border-slate-700/70 hover:border-sky-500/50 transition-all">
      <div class="grid grid-cols-1 lg:grid-cols-12">
        <!-- Left: Technical Schematic -->
        <div class="lg:col-span-5 bg-slate-950 p-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="px-2.5 py-1 rounded text-xs font-mono font-bold bg-sky-950 text-sky-400 border border-sky-800">
                ${exp.badge}
              </span>
              <span class="text-xs font-mono text-cyan-400 font-bold">${exp.duration}</span>
            </div>
            <h3 class="text-lg font-bold text-white mb-1">${exp.company}</h3>
            <div class="text-xs sm:text-sm font-semibold text-sky-400 mb-2">${exp.role}</div>
            <div class="text-xs font-mono text-slate-400 mb-4 flex items-center gap-1.5">
              ${getSvgIcon("map-pin")} ${exp.location} &bull; ${exp.type}
            </div>
          </div>

          <div class="bg-slate-900/60 p-2 rounded-lg border border-slate-800 my-2">
            <img 
              src="${exp.image}" 
              alt="${exp.company} Instrumentation Diagram" 
              class="w-full h-auto rounded"
              loading="lazy"
            />
          </div>

          <!-- Credibility / Transparency Disclaimer -->
          <div class="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono mt-2">
            <span class="text-sky-400 font-bold">Scope:</span> ${exp.disclaimer}
          </div>
        </div>

        <!-- Right: Technical Exposure Points -->
        <div class="lg:col-span-7 p-6 flex flex-col justify-between">
          <div>
            <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 mb-4">
              Technical Exposure &amp; Project Learning
            </h4>
            <ul class="space-y-3 mb-6">
              ${exp.exposurePoints.map(pt => `
                <li class="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                  <span class="text-cyan-400 mt-1 shrink-0">${getSvgIcon("check-circle")}</span>
                  <span class="leading-relaxed">${pt}</span>
                </li>
              `).join("")}
            </ul>
          </div>

          <div class="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Status: Verified Exposure Record</span>
            <span class="text-emerald-400 flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span> Verified Learning
            </span>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// --------------------------------------------------------------------
// 8. Achievements & Awards Rendering
// --------------------------------------------------------------------
function renderAchievements() {
  const awards = window.PORTFOLIO_DATA.achievements;
  const container = document.getElementById("achievements-grid");

  if (!container || !awards) return;

  container.innerHTML = awards.map(item => `
    <div class="glass-panel p-5 rounded-xl border border-slate-700/70 hover:border-sky-500/50 hover:-translate-y-1 transition-all flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-2 mb-3">
          <div class="w-10 h-10 rounded-lg bg-sky-950/80 border border-sky-400/40 text-sky-300 flex items-center justify-center shrink-0">
            ${getSvgIcon(item.icon)}
          </div>
          <span class="text-xs font-mono text-cyan-400 font-bold">${item.year}</span>
        </div>

        <div class="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-400 mb-1">
          ${item.category}
        </div>
        <h3 class="text-base font-bold text-white mb-2">${item.title}</h3>
        <div class="text-xs font-semibold text-slate-300 mb-2">${item.event}</div>
        <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">${item.desc}</p>
      </div>

      <div class="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
        <span>Verified Recognition</span>
        <span class="text-amber-400">&starf; Verified</span>
      </div>
    </div>
  `).join("");
}

// --------------------------------------------------------------------
// 9. Dedicated Resume Section
// --------------------------------------------------------------------
function renderResumeSection() {
  const personal = window.PORTFOLIO_DATA.personal;
  const edu = window.PORTFOLIO_DATA.education;
  
  const resumeContainer = document.getElementById("resume-content-preview");
  if (!resumeContainer) return;

  resumeContainer.innerHTML = `
    <div class="glass-panel p-6 sm:p-8 rounded-xl border border-slate-700/70">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div>
          <h3 class="text-2xl font-black text-white tracking-wide">${personal.name}</h3>
          <p class="text-sm font-mono text-sky-400">${personal.headline}</p>
          <p class="text-xs text-slate-400 mt-1">${personal.location} &bull; ${personal.email}</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <a 
            href="${personal.resumePdfUrl}" 
            download="Prajakta_Pol_Resume.pdf"
            class="btn-primary text-xs sm:text-sm"
          >
            ${getSvgIcon("download")} Download PDF Resume
          </a>
          <button 
            onclick="openResumePreviewModal()"
            class="btn-secondary text-xs sm:text-sm"
          >
            ${getSvgIcon("eye")} Fullscreen Resume Preview
          </button>
        </div>
      </div>

      <!-- Quick Summary Matrix -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
          <div class="text-xs font-mono uppercase text-sky-400 mb-1">Graduation &amp; CGPA</div>
          <div class="text-sm font-bold text-white">B.Tech (E&amp;TC) &bull; 8.25 CGPA</div>
          <div class="text-xs text-slate-400">Sinhgad Engg. Solapur (2026)</div>
        </div>

        <div class="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
          <div class="text-xs font-mono uppercase text-sky-400 mb-1">Automation Diploma</div>
          <div class="text-sm font-bold text-white">PGDIA (Completed)</div>
          <div class="text-xs text-slate-400">Siemens &amp; Allen-Bradley PLC</div>
        </div>

        <div class="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
          <div class="text-xs font-mono uppercase text-sky-400 mb-1">Target Roles &amp; City</div>
          <div class="text-sm font-bold text-white">Entry-Level PLC / Automation</div>
          <div class="text-xs text-slate-400">Pune, Maharashtra, India</div>
        </div>
      </div>

      <!-- Resume Update Notice -->
      <div class="p-3 rounded-lg bg-sky-950/30 border border-sky-800/40 text-xs text-slate-300 flex items-center justify-between flex-wrap gap-2">
        <span class="flex items-center gap-2">
          ${getSvgIcon("file-text")} 
          <span>The resume file is linked to <code class="text-sky-300 font-mono">resume/Prajakta_Pol_Resume.pdf</code>. Ready for download or file update anytime.</span>
        </span>
        <span class="text-emerald-400 font-mono text-[11px]">&bull; Authenticated File</span>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------
// 10. Contact Section Rendering & Actions
// --------------------------------------------------------------------
function renderContact() {
  const contactData = window.PORTFOLIO_DATA.contact;
  const personal = window.PORTFOLIO_DATA.personal;

  const emailEl = document.getElementById("contact-email-text");
  const locationEl = document.getElementById("contact-location-text");
  const ctaHeadingEl = document.getElementById("contact-cta-heading");
  const ctaSubtitleEl = document.getElementById("contact-cta-subtitle");
  const linkedinLinkEl = document.getElementById("contact-linkedin-link");
  const githubLinkEl = document.getElementById("contact-github-link");

  if (emailEl) emailEl.textContent = contactData.email;
  if (locationEl) locationEl.textContent = contactData.location;
  if (ctaHeadingEl) ctaHeadingEl.textContent = contactData.ctaHeading;
  if (ctaSubtitleEl) ctaSubtitleEl.textContent = contactData.ctaSubtitle;
  
  if (linkedinLinkEl) {
    linkedinLinkEl.href = personal.linkedinPlaceholderUrl;
    linkedinLinkEl.title = "LinkedIn Profile Placeholder";
  }
  if (githubLinkEl) {
    githubLinkEl.href = personal.githubPlaceholderUrl;
    githubLinkEl.title = "GitHub Profile Placeholder";
  }

  // Bind Contact Form
  const form = document.getElementById("portfolio-contact-form");
  if (form) {
    form.addEventListener("submit", handleContactSubmit);
  }

  // Bind Copy Email Button
  const copyBtn = document.getElementById("btn-copy-email");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(personal.email).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `${getSvgIcon("check")} Copied to Clipboard!`;
        copyBtn.classList.add("text-emerald-400", "border-emerald-500");
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.classList.remove("text-emerald-400", "border-emerald-500");
        }, 2500);
      }).catch(err => {
        window.location.href = `mailto:${personal.email}`;
      });
    });
  }
}

function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.elements["sender_name"]?.value || "";
  const email = form.elements["sender_email"]?.value || "";
  const subject = form.elements["subject"]?.value || "Entry-Level Automation Opportunity Inquiry";
  const message = form.elements["message"]?.value || "";

  if (!name || !email || !message) {
    alert("Please fill in your name, email, and message so I can respond to you promptly.");
    return;
  }

  // Show friendly confirmation modal
  const confirmationModal = document.getElementById("contact-confirm-modal");
  if (confirmationModal) {
    confirmationModal.classList.add("active");
  }

  // Pre-fill a standard mailto link so the sender can send it via their default email client directly
  const mailtoUrl = `mailto:${window.PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
  
  const directMailtoBtn = document.getElementById("btn-open-email-client");
  if (directMailtoBtn) {
    directMailtoBtn.href = mailtoUrl;
  }

  form.reset();
}

// --------------------------------------------------------------------
// Project Details Modal & Resume Fullscreen Modal
// --------------------------------------------------------------------
function initModals() {
  // Close modals on backdrop click
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove("active");
      }
    });
  });

  // Close modals on close button click
  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal-backdrop");
      if (modal) modal.classList.remove("active");
    });
  });

  // Close modals on Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-backdrop.active").forEach(m => m.classList.remove("active"));
    }
  });
}

window.openProjectModal = function(projectId) {
  const project = window.PORTFOLIO_DATA.featuredProjects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById("project-details-modal");
  const modalContent = document.getElementById("project-modal-body");

  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="p-6 sm:p-8">
      <div class="flex items-start justify-between gap-4 mb-4">
        <div>
          <span class="px-2.5 py-1 rounded text-xs font-mono font-bold bg-sky-950 text-sky-400 border border-sky-800">
            ${project.category}
          </span>
          <h2 class="text-2xl font-bold text-white mt-2">${project.title}</h2>
          <p class="text-sm font-mono text-cyan-300">${project.subtitle}</p>
        </div>
        <button data-close-modal class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center shrink-0">
          ✕
        </button>
      </div>

      <!-- Diagram -->
      <div class="bg-slate-950 p-3 rounded-xl border border-slate-800 mb-6">
        <img src="${project.image}" alt="${project.title} Schematic" class="w-full h-auto max-h-72 object-contain mx-auto rounded" />
      </div>

      <!-- Detailed Description -->
      <div class="mb-6">
        <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 mb-2">Technical Overview</h4>
        <p class="text-sm text-slate-300 leading-relaxed">${project.detailedOverview}</p>
      </div>

      <!-- Technical Metrics Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        ${Object.entries(project.metrics).map(([k, v]) => `
          <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <div class="text-[10px] font-mono uppercase text-slate-400 mb-1">${k.replace(/([A-Z])/g, ' $1')}</div>
            <div class="text-xs font-bold text-sky-300 font-mono">${v}</div>
          </div>
        `).join("")}
      </div>

      <!-- Features List -->
      <div class="mb-6">
        <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 mb-2">Key Engineering Features</h4>
        <ul class="space-y-2">
          ${project.features.map(f => `
            <li class="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
              <span class="text-emerald-400 mt-1 shrink-0">${getSvgIcon("check-circle")}</span>
              <span>${f}</span>
            </li>
          `).join("")}
        </ul>
      </div>

      <!-- Technologies Used -->
      <div class="mb-6">
        <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 mb-2">Hardware &amp; Software Stack</h4>
        <div class="flex flex-wrap gap-2">
          ${project.technologies.map(t => `
            <span class="px-3 py-1 rounded text-xs font-mono bg-slate-800 text-slate-200 border border-slate-700">
              ${t}
            </span>
          `).join("")}
        </div>
      </div>

      <div class="pt-4 border-t border-slate-800 flex justify-end">
        <button data-close-modal class="btn-secondary text-xs sm:text-sm">
          Close Technical View
        </button>
      </div>
    </div>
  `;

  // Re-bind modal close inside dynamically injected content
  modalContent.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", () => modal.classList.remove("active"));
  });

  modal.classList.add("active");
};

window.openResumePreviewModal = function() {
  const modal = document.getElementById("resume-preview-modal");
  if (modal) modal.classList.add("active");
};

// --------------------------------------------------------------------
// Scroll Reveal Animations
// --------------------------------------------------------------------
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

// --------------------------------------------------------------------
// Inline SVG Icon Provider (Guarantees 100% Offline Crisp Rendering)
// --------------------------------------------------------------------
function getSvgIcon(iconName) {
  const icons = {
    "graduation": `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    "cpu": `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>`,
    "shield": `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    "map-pin": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    "terminal": `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
    "sliders": `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>`,
    "activity": `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    "layout": `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
    "wifi": `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`,
    "book-open": `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    "zap": `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    "code": `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    "award": `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
    "trophy": `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34"/><path d="M18 4H6v7a6 6 0 0 0 12 0V4z"/></svg>`,
    "file-text": `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    "compass": `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    "users": `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    "check-circle": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    "check": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    "download": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    "eye": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    "arrow-right": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`
  };

  return icons[iconName] || icons["activity"];
}
