/**
 * ====================================================================
 * INTERACTIVE PLC LADDER LOGIC & CONTROL SYSTEM SIMULATOR
 * ====================================================================
 * Provides real-time interactive simulation of:
 * 1. Motor Start/Stop DOL Starter with Seal-in Latch & Overload Relay
 * 2. Timer On-Delay (TON) Delayed Actuation Circuit
 * 3. Sensor-Based Up-Counter (CTU) Batch Diverter
 */

class LadderSimulator {
  constructor() {
    this.state = {
      // Motor Starter Logic
      motor: {
        startPB: false,      // I0.0 (NO momentary)
        stopPB: true,        // I0.1 (NC fail-safe)
        overloadTrip: true,  // I0.2 (NC normal, false if tripped)
        contactorQ0: false   // Q0.0 (Output coil & latch)
      },

      // Timer Logic
      timer: {
        enableSwitch: false, // I0.3 (Cycle start switch)
        presetTime: 3.0,     // 3 seconds preset
        elapsedTime: 0.0,    // Current elapsed time
        timerRunning: false,
        timerDoneBit: false, // T4:0/DN
        solenoidValve: false // Q0.1
      },

      // Sensor Counter Logic
      counter: {
        presetParts: 5,
        currentCount: 0,
        doneBit: false,      // C5:0/DN
        diverterArm: false   // Q0.2
      }
    };

    this.timerInterval = null;
  }

  init() {
    this.bindEvents();
    this.updateMotorUI();
    this.updateTimerUI();
    this.updateCounterUI();
  }

  bindEvents() {
    // --- Motor Controls ---
    const startBtn = document.getElementById("sim-btn-start");
    const stopBtn = document.getElementById("sim-btn-stop");
    const tripBtn = document.getElementById("sim-btn-trip");
    const resetTripBtn = document.getElementById("sim-btn-reset-trip");

    if (startBtn) {
      // Momentary pushbutton action: Press Down
      startBtn.addEventListener("mousedown", () => this.pressStartPB(true));
      startBtn.addEventListener("mouseup", () => this.pressStartPB(false));
      startBtn.addEventListener("touchstart", (e) => { e.preventDefault(); this.pressStartPB(true); });
      startBtn.addEventListener("touchend", (e) => { e.preventDefault(); this.pressStartPB(false); });
    }

    if (stopBtn) {
      stopBtn.addEventListener("mousedown", () => this.pressStopPB(false)); // Break NC contact
      stopBtn.addEventListener("mouseup", () => this.pressStopPB(true));  // Restore NC contact
      stopBtn.addEventListener("touchstart", (e) => { e.preventDefault(); this.pressStopPB(false); });
      stopBtn.addEventListener("touchend", (e) => { e.preventDefault(); this.pressStopPB(true); });
    }

    if (tripBtn) {
      tripBtn.addEventListener("click", () => {
        this.state.motor.overloadTrip = false; // Tripped!
        this.solveMotorLogic();
      });
    }

    if (resetTripBtn) {
      resetTripBtn.addEventListener("click", () => {
        this.state.motor.overloadTrip = true; // Reset overload
        this.solveMotorLogic();
      });
    }

    // --- Timer Controls ---
    const timerToggle = document.getElementById("sim-toggle-timer");
    if (timerToggle) {
      timerToggle.addEventListener("change", (e) => {
        this.toggleTimerEnable(e.target.checked);
      });
    }

    // --- Counter Controls ---
    const triggerSensorBtn = document.getElementById("sim-btn-sensor-pulse");
    const resetCounterBtn = document.getElementById("sim-btn-reset-counter");

    if (triggerSensorBtn) {
      triggerSensorBtn.addEventListener("click", () => {
        this.pulsePartSensor();
      });
    }

    if (resetCounterBtn) {
      resetCounterBtn.addEventListener("click", () => {
        this.resetCounter();
      });
    }
  }

  // ------------------------------------------------------------------
  // 1. Motor Starter Logic Solver
  // PLC Scan Cycle:
  // Q0.0 = (I0.0 OR Q0.0) AND I0.1 (Stop NC) AND I0.2 (Overload NC)
  // ------------------------------------------------------------------
  pressStartPB(isPressed) {
    this.state.motor.startPB = isPressed;
    this.solveMotorLogic();
  }

  pressStopPB(isClosed) {
    this.state.motor.stopPB = isClosed;
    this.solveMotorLogic();
  }

  solveMotorLogic() {
    const { startPB, stopPB, overloadTrip, contactorQ0 } = this.state.motor;
    
    // Core Boolean equation
    const rungCondition = (startPB || contactorQ0) && stopPB && overloadTrip;
    
    this.state.motor.contactorQ0 = Boolean(rungCondition);
    this.updateMotorUI();
  }

  updateMotorUI() {
    const { startPB, stopPB, overloadTrip, contactorQ0 } = this.state.motor;

    // Visual indicators
    const mtrStatusEl = document.getElementById("mtr-status-badge");
    const mtrRpmEl = document.getElementById("mtr-rpm-val");
    const mtrCurrentEl = document.getElementById("mtr-curr-val");
    const contactorLed = document.getElementById("led-contactor");
    const tripBanner = document.getElementById("mtr-trip-banner");

    // Ladder Contact elements
    const contactStart = document.getElementById("ld-start-contact");
    const contactLatch = document.getElementById("ld-latch-contact");
    const contactStop = document.getElementById("ld-stop-contact");
    const contactOlr = document.getElementById("ld-olr-contact");
    const coilContactor = document.getElementById("ld-coil-contactor");

    if (contactStart) contactStart.classList.toggle("energized", startPB);
    if (contactLatch) contactLatch.classList.toggle("energized", contactorQ0);
    if (contactStop) contactStop.classList.toggle("energized", stopPB);
    if (contactOlr) contactOlr.classList.toggle("energized", overloadTrip);
    if (coilContactor) coilContactor.classList.toggle("energized", contactorQ0);

    if (mtrStatusEl) {
      if (!overloadTrip) {
        mtrStatusEl.textContent = "TRIPPED (OVERLOAD)";
        mtrStatusEl.className = "px-2.5 py-1 rounded text-xs font-mono font-bold bg-red-950 text-red-400 border border-red-800";
      } else if (contactorQ0) {
        mtrStatusEl.textContent = "RUNNING (1440 RPM)";
        mtrStatusEl.className = "px-2.5 py-1 rounded text-xs font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-700 animate-pulse";
      } else {
        mtrStatusEl.textContent = "STOPPED (READY)";
        mtrStatusEl.className = "px-2.5 py-1 rounded text-xs font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700";
      }
    }

    if (mtrRpmEl) {
      mtrRpmEl.textContent = contactorQ0 && overloadTrip ? "1440 RPM" : "0 RPM";
    }

    if (mtrCurrentEl) {
      mtrCurrentEl.textContent = contactorQ0 && overloadTrip ? "3.8 A (FLA)" : "0.0 A";
    }

    if (contactorLed) {
      contactorLed.className = contactorQ0 
        ? "w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]"
        : "w-3.5 h-3.5 rounded-full bg-slate-700";
    }

    if (tripBanner) {
      tripBanner.style.display = !overloadTrip ? "block" : "none";
    }
  }

  // ------------------------------------------------------------------
  // 2. Timer On-Delay (TON) Logic Solver
  // ------------------------------------------------------------------
  toggleTimerEnable(isEnabled) {
    this.state.timer.enableSwitch = isEnabled;

    if (isEnabled) {
      this.state.timer.timerRunning = true;
      this.state.timer.elapsedTime = 0.0;
      this.state.timer.timerDoneBit = false;
      this.state.timer.solenoidValve = false;

      if (this.timerInterval) clearInterval(this.timerInterval);

      const stepMs = 100;
      this.timerInterval = setInterval(() => {
        if (!this.state.timer.enableSwitch) {
          clearInterval(this.timerInterval);
          this.state.timer.elapsedTime = 0.0;
          this.state.timer.timerDoneBit = false;
          this.state.timer.solenoidValve = false;
          this.updateTimerUI();
          return;
        }

        this.state.timer.elapsedTime += stepMs / 1000;

        if (this.state.timer.elapsedTime >= this.state.timer.presetTime) {
          this.state.timer.elapsedTime = this.state.timer.presetTime;
          this.state.timer.timerDoneBit = true;
          this.state.timer.solenoidValve = true;
          clearInterval(this.timerInterval);
        }

        this.updateTimerUI();
      }, stepMs);
    } else {
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.state.timer.elapsedTime = 0.0;
      this.state.timer.timerDoneBit = false;
      this.state.timer.solenoidValve = false;
    }

    this.updateTimerUI();
  }

  updateTimerUI() {
    const { enableSwitch, presetTime, elapsedTime, timerDoneBit, solenoidValve } = this.state.timer;

    const elapsedEl = document.getElementById("tmr-elapsed-val");
    const progressEl = document.getElementById("tmr-progress-bar");
    const doneBitLed = document.getElementById("led-timer-dn");
    const valveLed = document.getElementById("led-valve-q1");

    if (elapsedEl) {
      elapsedEl.textContent = `${elapsedTime.toFixed(1)}s / ${presetTime.toFixed(1)}s`;
    }

    if (progressEl) {
      const pct = Math.min(100, (elapsedTime / presetTime) * 100);
      progressEl.style.width = `${pct}%`;
    }

    if (doneBitLed) {
      doneBitLed.className = timerDoneBit
        ? "w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
        : "w-3 h-3 rounded-full bg-slate-700";
    }

    if (valveLed) {
      valveLed.className = solenoidValve
        ? "w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]"
        : "w-3.5 h-3.5 rounded-full bg-slate-700";
    }
  }

  // ------------------------------------------------------------------
  // 3. Proximity Sensor & Counter (CTU) Solver
  // ------------------------------------------------------------------
  pulsePartSensor() {
    if (this.state.counter.currentCount < this.state.counter.presetParts) {
      this.state.counter.currentCount += 1;
    }

    if (this.state.counter.currentCount >= this.state.counter.presetParts) {
      this.state.counter.doneBit = true;
      this.state.counter.diverterArm = true;
    }

    this.updateCounterUI();

    // Momentary flash of sensor detection
    const sensorLed = document.getElementById("led-prox-sensor");
    if (sensorLed) {
      sensorLed.className = "w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]";
      setTimeout(() => {
        sensorLed.className = "w-3 h-3 rounded-full bg-slate-700";
      }, 350);
    }
  }

  resetCounter() {
    this.state.counter.currentCount = 0;
    this.state.counter.doneBit = false;
    this.state.counter.diverterArm = false;
    this.updateCounterUI();
  }

  updateCounterUI() {
    const { currentCount, presetParts, doneBit, diverterArm } = this.state.counter;

    const countValEl = document.getElementById("cnt-val-display");
    const diverterStatusEl = document.getElementById("diverter-status-text");
    const diverterLed = document.getElementById("led-diverter-q2");

    if (countValEl) {
      countValEl.textContent = `${currentCount} / ${presetParts}`;
    }

    if (diverterStatusEl) {
      diverterStatusEl.textContent = doneBit 
        ? "BATCH REACHED -> DIVERTER ACTUATED (Q0.2 ON)" 
        : "ACCUMULATING PARTS (CONVEYOR RUNNING)";
      diverterStatusEl.className = doneBit 
        ? "text-xs font-mono font-bold text-amber-400" 
        : "text-xs font-mono text-slate-400";
    }

    if (diverterLed) {
      diverterLed.className = diverterArm
        ? "w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8]"
        : "w-3.5 h-3.5 rounded-full bg-slate-700";
    }
  }
}

// Instantiate simulator globally
window.plcSimulator = new LadderSimulator();
