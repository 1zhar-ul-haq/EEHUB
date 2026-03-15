/* ============================================================
   ELECTRICAL ENGINEERING HUB — script.js
   ============================================================ */

// ============================================================
// DATA
// ============================================================

const booksData = [
  // Circuit Analysis
  { id: 1, title: "Fundamentals of Electric Circuits", author: "Alexander & Sadiku", category: "Circuit Analysis", emoji: "⚡", color: "#1a4a8a" },
  { id: 2, title: "Engineering Circuit Analysis", author: "Hayt & Kemmerly", category: "Circuit Analysis", emoji: "🔌", color: "#0d3a6e" },
  { id: 3, title: "Electric Circuits", author: "Nilsson & Riedel", category: "Circuit Analysis", emoji: "🔋", color: "#1a4a8a" },
  // Electronic Devices
  { id: 4, title: "Electronic Devices & Circuit Theory", author: "Boylestad & Nashelsky", category: "Electronic Devices", emoji: "📡", color: "#1a3a6a" },
  { id: 5, title: "Microelectronic Circuits", author: "Sedra & Smith", category: "Electronic Devices", emoji: "🔬", color: "#0a2a5a" },
  { id: 6, title: "Electronics Fundamentals", author: "Floyd", category: "Electronic Devices", emoji: "💡", color: "#1a3a6a" },
  // Digital Logic
  { id: 7, title: "Digital Design", author: "Morris Mano", category: "Digital Logic Design", emoji: "🖥️", color: "#0e3a6e" },
  { id: 8, title: "Digital Fundamentals", author: "Thomas L. Floyd", category: "Digital Logic Design", emoji: "🔢", color: "#1a3055" },
  { id: 9, title: "Logic and Computer Design", author: "Mano & Kime", category: "Digital Logic Design", emoji: "⌨️", color: "#0e3a6e" },
  // Control Systems
  { id: 10, title: "Modern Control Engineering", author: "Ogata", category: "Control Systems", emoji: "🎛️", color: "#1a3a55" },
  { id: 11, title: "Control Systems Engineering", author: "Nise", category: "Control Systems", emoji: "📊", color: "#0d2a45" },
  { id: 12, title: "Automatic Control Systems", author: "Golnaraghi & Kuo", category: "Control Systems", emoji: "🔄", color: "#1a3a55" },
  // Power Electronics
  { id: 13, title: "Power Electronics", author: "Rashid", category: "Power Electronics", emoji: "⚙️", color: "#2a3a1a" },
  { id: 14, title: "Power Electronics", author: "Hart", category: "Power Electronics", emoji: "🏭", color: "#1a3a0a" },
  // Microcontrollers
  { id: 15, title: "The AVR Microcontroller and Embedded Systems", author: "Mazidi & Naimi", category: "Microcontrollers", emoji: "🤖", color: "#3a1a4a" },
  { id: 16, title: "PIC Microcontroller and Embedded Systems", author: "Mazidi", category: "Microcontrollers", emoji: "💾", color: "#2a0a3a" },
  { id: 17, title: "Embedded Systems with ARM Cortex-M", author: "Valvano", category: "Microcontrollers", emoji: "🔧", color: "#3a1a4a" },
  // Signal Processing
  { id: 18, title: "Signals and Systems", author: "Oppenheim & Willsky", category: "Signal Processing", emoji: "📶", color: "#1a2a4a" },
  { id: 19, title: "DSP using MATLAB", author: "Proakis & Manolakis", category: "Signal Processing", emoji: "📈", color: "#0a1a3a" },
  { id: 20, title: "Communication Systems", author: "Haykin & Moher", category: "Signal Processing", emoji: "📻", color: "#1a2a4a" },
];

const bookCategories = ["All", "Circuit Analysis", "Electronic Devices", "Digital Logic Design", "Control Systems", "Power Electronics", "Microcontrollers", "Signal Processing"];

const projectsData = [
  // Microcontroller Projects
  {
    id: 1, category: "Microcontroller Projects", emoji: "🤖",
    title: "Smart Home Automation with Arduino",
    desc: "Complete home automation system using Arduino UNO with relay control, LCD display, and RF remote.",
    fullDesc: `This project implements a full smart home automation system using an Arduino UNO microcontroller as the central controller. The system allows wireless control of up to 4 electrical appliances (lights, fans, sockets) via an RF 433MHz remote transmitter/receiver pair.\n\nThe 16×2 LCD continuously displays the ON/OFF status of each relay channel. A DHT11 sensor monitors ambient temperature and humidity, automatically switching the fan relay when the temperature exceeds a configurable threshold (default: 30°C).\n\nThe system operates on a 5V regulated supply (7805). All relay channels are isolated using optocouplers to protect the microcontroller from mains voltage spikes.`,
    objectives: ["Wireless appliance control via RF remote", "Real-time temperature/humidity display", "Auto fan control above threshold temperature", "LCD status display for all channels"],
    outcomes: ["Learned relay driver circuits with optocouplers", "Understood RF protocol encoding/decoding", "Practiced interrupt-driven Arduino programming"],
    components: ["Arduino UNO", "16x2 LCD", "4-Channel Relay Module", "RF 433MHz Transceiver", "DHT11 Sensor", "7805 Regulator", "Optocoupler PC817", "Resistors & Capacitors"],
    code: `#include <LiquidCrystal.h>\n#include <RH_ASK.h>\n#include <DHT.h>\n\nLiquidCrystal lcd(12, 11, 5, 4, 3, 2);\nRH_ASK driver;\nDHT dht(A0, DHT11);\n\nbool relayState[4] = {false, false, false, false};\nconst int relayPins[4] = {8, 9, 10, 13};\n\nvoid setup() {\n  lcd.begin(16, 2);\n  driver.init();\n  for(int i=0; i<4; i++) {\n    pinMode(relayPins[i], OUTPUT);\n    digitalWrite(relayPins[i], HIGH); // Active LOW\n  }\n  lcd.print("Smart Home v2.0");\n  delay(1500); lcd.clear();\n}\n\nvoid loop() {\n  uint8_t buf[4], buflen = sizeof(buf);\n  if (driver.recv(buf, &buflen)) {\n    for(int i=0; i<4; i++) {\n      if(buf[0] == ('A'+i)) {\n        relayState[i] = !relayState[i];\n        digitalWrite(relayPins[i], relayState[i] ? LOW : HIGH);\n      }\n    }\n  }\n  // Auto fan control\n  float temp = dht.readTemperature();\n  if(temp > 30.0) { relayState[3]=true; digitalWrite(relayPins[3], LOW); }\n  // Update LCD\n  lcd.setCursor(0,0); lcd.print("L1:");\n  lcd.print(relayState[0]?"ON ":"OFF");\n  lcd.print(" L2:"); lcd.print(relayState[1]?"ON ":"OFF");\n  lcd.setCursor(0,1);\n  lcd.print("T:"); lcd.print((int)temp);\n  lcd.print("C Fan:"); lcd.print(relayState[3]?"ON":"OFF");\n  delay(200);\n}`,
    difficulty: "Intermediate", duration: "2 weeks"
  },
  {
    id: 2, category: "Microcontroller Projects", emoji: "🔋",
    title: "Digital Voltmeter with PIC18F452",
    desc: "0–32V digital voltmeter using PIC18F452 ADC on AN0 and LCD display on PORTD.",
    fullDesc: `A precision digital voltmeter capable of measuring DC voltages from 0V to 32V, built around the PIC18F452 microcontroller. The input voltage is scaled down to the 0–5V ADC range using a precision resistor voltage divider (R1=33kΩ, R2=1kΩ), providing a 34:1 division ratio.\n\nThe PIC18F452 10-bit ADC samples the divided voltage on channel AN0. The result is converted back to the true voltage using the known division ratio and displayed on a 16×2 LCD connected to PORTD. The LCD shows both the measured voltage and a simple bar graph indicator.\n\nThe circuit runs from a regulated 5V supply using the 7805 regulator. Crystal frequency is 10MHz for accurate timing. Input protection is provided by a 1N4148 clamp diode.`,
    objectives: ["Implement 10-bit ADC reading on PIC18F452", "Design precision voltage divider for 0–32V range", "Display floating-point result on 16×2 LCD", "Add input over-voltage protection"],
    outcomes: ["Mastered PIC18F452 ADC peripheral registers (ADCON0/1/2)", "Understood fixed-point arithmetic for embedded displays", "Learned LCD 4-bit interface on PORTD"],
    components: ["PIC18F452", "16x2 LCD", "R1=33kΩ R2=1kΩ (Voltage Divider)", "7805 Voltage Regulator", "10MHz Crystal + 22pF Caps", "1N4148 Clamp Diode", "100nF Decoupling Caps", "10kΩ LCD Contrast Pot"],
    code: `#include <pic18.h>\n#include <stdio.h>\n#include "lcd.h"\n\n// PIC18F452 @ 10MHz, 5V VDD\n// ADC on AN0 (RA0), LCD on PORTD\n\nvoid ADC_Init(void) {\n  ADCON0 = 0x41;  // Channel AN0, ADC ON, Fosc/8\n  ADCON1 = 0x8E;  // AN0 analog, rest digital, Vref=VDD\n  ADCON2 = 0xA9;  // Right justify, 12 TAD, Fosc/8\n}\n\nunsigned int ADC_Read(void) {\n  ADCON0bits.GO = 1;\n  while(ADCON0bits.DONE == 0);  // Wait conversion\n  return ((unsigned int)ADRESH << 8) | ADRESL;\n}\n\nvoid main(void) {\n  char buf[16];\n  float voltage, scaled;\n  unsigned int adc_val;\n  \n  ADC_Init();\n  LCD_Init();      // LCD on PORTD\n  LCD_Clear();\n  LCD_SetPos(0,0);\n  LCD_Print("  EE Voltmeter  ");\n  __delay_ms(1000);\n  \n  while(1) {\n    adc_val = ADC_Read();\n    // Division ratio: (33k+1k)/1k = 34\n    scaled  = (float)adc_val * (5.0f / 1023.0f);\n    voltage = scaled * 34.0f;\n    if(voltage > 32.0f) voltage = 32.0f; // Clamp\n    \n    sprintf(buf, "V = %5.2f V    ", voltage);\n    LCD_SetPos(0,0); LCD_Print(buf);\n    \n    // Simple bar (8 segments = 4V each)\n    int bars = (int)(voltage / 4.0f);\n    LCD_SetPos(1,0);\n    for(int i=0; i<8; i++)\n      LCD_Char(i < bars ? 0xFF : '-');\n    \n    __delay_ms(300);\n  }\n}`,
    difficulty: "Intermediate", duration: "1 week"
  },
  {
    id: 3, category: "Microcontroller Projects", emoji: "🌡️",
    title: "DHT11 Temp/Humidity + Fan & Flame Alert (PIC18F452)",
    desc: "Temperature/humidity monitoring with automatic fan control above 35°C and flame detection buzzer on PIC18F452.",
    fullDesc: `An environmental monitoring and safety system built on the PIC18F452. The DHT11 sensor connected to RB0 provides temperature (0–50°C) and relative humidity (20–95% RH) readings using a single-wire serial protocol.\n\nWhen temperature exceeds 35°C the system automatically activates a 5V DC fan via a BC547 transistor driver on RC0. The fan is protected against back-EMF by a 1N4007 flyback diode. A digital flame sensor on RB6 (active LOW) triggers an audible buzzer on RB7 for fire safety.\n\nAll readings are displayed on a 16×2 LCD. The system runs on 5V regulated supply and demonstrates real-time sensor interfacing, transistor driving, and interrupt-free polling in C.`,
    objectives: ["Interface DHT11 single-wire protocol on RB0", "Automatic relay/transistor-driven fan on RC0", "Flame sensor detection with buzzer alarm on RB7", "Dual-line LCD display of temp + humidity"],
    outcomes: ["Understood DHT11 timing protocol (>18ms start, 40-bit data)", "Learned transistor switching for inductive loads", "Practiced bit-banging a 1-wire protocol in C"],
    components: ["PIC18F452", "DHT11 Sensor (RB0)", "BC547 NPN Transistor", "1N4007 Flyback Diode", "5V DC Fan (RC0)", "Flame Sensor Module (RB6)", "Piezo Buzzer (RB7)", "16x2 LCD (PORTD)", "4.7kΩ Pull-up for DHT11"],
    code: `#include <pic18.h>\n#include "dht11.h"\n#include "lcd.h"\n\n// PIC18F452: Fan=RC0, DHT11=RB0, Flame=RB6, Buzzer=RB7\n// LCD on PORTD (4-bit mode)\n\n#define FAN_PIN   RC0\n#define FLAME_PIN RB6\n#define BUZZ_PIN  RB7\n\nvoid main(void) {\n  unsigned char temp, hum;\n  char line1[16], line2[16];\n  \n  TRISB = 0xFF;          // RB all input\n  TRISC = 0x00;          // RC all output\n  TRISD = 0x00;          // RD LCD output\n  FAN_PIN = 0; BUZZ_PIN = 0;\n  \n  LCD_Init(); LCD_Clear();\n  LCD_Print("  EE Env Monitor");\n  __delay_ms(1000);\n  \n  while(1) {\n    // Read DHT11 (returns 0 on success)\n    if(DHT11_Read(RB0_bit, &temp, &hum) == 0) {\n      sprintf(line1, "T:%2d C  H:%2d%%  ", temp, hum);\n    } else {\n      sprintf(line1, "DHT11 Read Err! ");\n    }\n    \n    // Fan control\n    if(temp >= 35) { FAN_PIN = 1; }\n    else           { FAN_PIN = 0; }\n    \n    // Flame detection (active LOW sensor)\n    if(FLAME_PIN == 0) {\n      BUZZ_PIN = 1;         // Alarm ON\n      sprintf(line2, "!! FLAME ALERT !!");\n    } else {\n      BUZZ_PIN = 0;\n      sprintf(line2, "Fan:%s  Safe    ", FAN_PIN ? "ON " : "OFF");\n    }\n    \n    LCD_SetPos(0,0); LCD_Print(line1);\n    LCD_SetPos(1,0); LCD_Print(line2);\n    __delay_ms(1000);\n  }\n}`,
    difficulty: "Beginner", duration: "3 days"
  },
  // MATLAB Projects
  {
    id: 4, category: "MATLAB Projects", emoji: "📊",
    title: "Full-Wave Rectifier Fourier Analysis (MATLAB GUI)",
    desc: "MATLAB GUI analyzing a full-wave rectified sine wave using Fourier series with interactive harmonic visualization.",
    fullDesc: `A MATLAB GUI application that decomposes a full-wave rectified sinusoidal signal into its Fourier series components. The user can interactively set the fundamental frequency (f₀), peak voltage (Vm), and the number of harmonics to include (N).\n\nThe GUI plots three synchronized graphs: (1) the original rectified signal, (2) the Fourier series reconstruction overlaid on the original, and (3) the frequency-domain spectrum (single-sided amplitude vs. harmonic number).\n\nThe Fourier coefficients are derived analytically: a₀ = 2Vm/π, a_n = −4Vm / (π(4n²−1)) for even harmonics only (odd harmonics are zero for full-wave rectified signals). This project reinforces the link between time-domain and frequency-domain representations taught in Signals & Systems courses.`,
    objectives: ["Implement Fourier series synthesis for a rectified waveform", "Build an interactive MATLAB GUI with sliders and axes", "Plot time-domain reconstruction and frequency spectrum", "Verify that reconstruction error decreases with more harmonics N"],
    outcomes: ["Understood why only DC + even harmonics exist in full-wave rectified signals", "Linked Fourier theory to practical power supply ripple analysis", "Developed MATLAB GUI programming skills (uicontrol, axes, callbacks)"],
    components: ["MATLAB R2022b or later", "Signal Processing Toolbox", "MATLAB App Designer / GUIDE"],
    code: `% Full-Wave Rectifier Fourier Series — MATLAB\n% Signals & Systems University Project\nclear; clc; close all;\n\nf0  = 50;    % Fundamental frequency (Hz)\nVm  = 10;    % Peak voltage\nN   = 10;    % Number of harmonics\nfs  = 10000; % Sampling freq\nt   = 0 : 1/fs : 4/f0; % 4 cycles\n\n%% Original rectified signal\nv_rect = abs(Vm * sin(2*pi*f0*t));\n\n%% Fourier Series Reconstruction\na0 = 2*Vm / pi;        % DC component\nv_fs = a0 * ones(1, length(t));\n\nfor n = 1:N\n  % Only even harmonics are non-zero\n  k  = 2*n;\n  an = -4*Vm / (pi * (k^2 - 1));\n  v_fs = v_fs + an * cos(2*pi*k*f0*t);\nend\n\n%% Frequency Spectrum\nharmonics = 0:2:2*N;\ncoeffs    = zeros(1, length(harmonics));\ncoeffs(1) = a0;\nfor i = 1:N\n  k = 2*i;\n  coeffs(i+1) = abs(-4*Vm / (pi*(k^2-1)));\nend\n\n%% Plotting\nfigure('Name','Fourier Analysis','NumberTitle','off','Color','k');\nset(gcf,'Position',[100 100 1000 650]);\n\nsubplot(3,1,1);\nplot(t*1000, v_rect, 'c', 'LineWidth', 1.5);\ntitle('Full-Wave Rectified Signal','Color','w');\nxlabel('Time (ms)','Color','w'); ylabel('V (V)','Color','w');\nset(gca,'Color','k','XColor','w','YColor','w'); grid on;\n\nsubplot(3,1,2);\nplot(t*1000, v_rect,'c','LineWidth',1); hold on;\nplot(t*1000, v_fs, 'r--','LineWidth',2);\ntitle(sprintf('Fourier Reconstruction (N=%d harmonics)',N),'Color','w');\nlegend('Original','Fourier','TextColor','w','Color','k');\nset(gca,'Color','k','XColor','w','YColor','w'); grid on;\n\nsubplot(3,1,3);\nbar(harmonics, coeffs, 'FaceColor', [0 0.7 1]);\ntitle('Frequency Spectrum','Color','w');\nxlabel('Harmonic Order','Color','w'); ylabel('Amplitude (V)','Color','w');\nset(gca,'Color','k','XColor','w','YColor','w'); grid on;\n\nRMS_error = rms(v_rect - v_fs);\nfprintf('RMS Reconstruction Error (N=%d): %.4f V\\n', N, RMS_error);`,
    difficulty: "Intermediate", duration: "5 days"
  },
  {
    id: 5, category: "MATLAB Projects", emoji: "📉",
    title: "FIR/IIR Digital Filter Design & Analysis",
    desc: "Design and compare FIR and IIR low-pass filters using MATLAB with Bode plots, step response, and group delay.",
    fullDesc: `A comprehensive MATLAB project that designs, analyzes, and compares FIR and IIR digital filters for a biomedical signal processing application (ECG noise removal).\n\nThe project designs a 50th-order Hamming-windowed FIR low-pass filter and a 6th-order Butterworth IIR filter, both with identical cutoff frequencies (100 Hz, fs=1000 Hz). Performance is compared across four plots: magnitude response (dB), phase response, group delay, and step response.\n\nAn ECG-like test signal corrupted with 50Hz powerline noise and high-frequency noise is filtered by both designs, and the SNR improvement is quantified. The project demonstrates why FIR filters have linear phase (important for biomedical signals) while IIR filters offer steeper roll-off at lower filter order.`,
    objectives: ["Design FIR filter using fir1() with Hamming window", "Design IIR Butterworth filter using butter()", "Compare magnitude, phase, group delay, and step response", "Apply both filters to a noisy ECG signal and compare SNR"],
    outcomes: ["Understood trade-offs between FIR (linear phase) and IIR (efficiency)", "Learned to use freqz(), grpdelay(), and filter() in MATLAB", "Practiced quantitative SNR comparison of filter designs"],
    components: ["MATLAB R2021b+", "Signal Processing Toolbox", "DSP System Toolbox (optional)"],
    code: `% FIR vs IIR Filter Comparison — MATLAB DSP Project\nclear; clc; close all;\n\nfs = 1000; fc = 100; Nfir = 50;\n\n%% FIR: Hamming-windowed LPF\nb_fir = fir1(Nfir, fc/(fs/2), 'low', hamming(Nfir+1));\n\n%% IIR: 6th-order Butterworth LPF\n[b_iir, a_iir] = butter(6, fc/(fs/2), 'low');\n\n%% Frequency Analysis\n[H_fir, f] = freqz(b_fir, 1,    2048, fs);\n[H_iir, ~] = freqz(b_iir, a_iir, 2048, fs);\n[gd_fir, ~] = grpdelay(b_fir, 1,    2048, fs);\n[gd_iir, ~] = grpdelay(b_iir, a_iir, 2048, fs);\n\n%% Noisy ECG-like test signal\nt = 0 : 1/fs : 2;\nsignal = sin(2*pi*5*t) + 0.5*sin(2*pi*15*t);  % ECG approx\nnoise  = 0.8*sin(2*pi*50*t) + 0.3*randn(size(t));\nnoisy  = signal + noise;\n\nfilt_fir = filter(b_fir, 1,    noisy);\nfilt_iir = filter(b_iir, a_iir, noisy);\n\nSNR_fir = snr(signal, filt_fir - signal);\nSNR_iir = snr(signal, filt_iir - signal);\nfprintf('FIR SNR: %.2f dB | IIR SNR: %.2f dB\\n', SNR_fir, SNR_iir);\n\n%% Plot\nfigure('Name','FIR vs IIR','Color','k');\nsubplot(2,2,1);\nplot(f, 20*log10(abs(H_fir)),'c', f, 20*log10(abs(H_iir)),'r','LineWidth',1.5);\nlegend('FIR','IIR','TextColor','w','Color','k');\ntitle('Magnitude Response','Color','w');\nxlabel('Hz','Color','w'); ylabel('dB','Color','w');\nset(gca,'Color','k','XColor','w','YColor','w'); grid on; ylim([-80 5]);`,
    difficulty: "Advanced", duration: "1 week"
  },
  // Power Electronics
  {
    id: 6, category: "Power Electronics Projects", emoji: "⚡",
    title: "DC-DC Buck Converter Design & Simulation",
    desc: "Design and simulate a synchronous Buck converter with 24V→12V, 2A output, <1% voltage ripple.",
    fullDesc: `A complete DC-DC step-down (Buck) converter design project targeting a 24V input, 12V/2A output specification (24W). The project covers all stages from theoretical component sizing to MATLAB/Simulink simulation.\n\nThe duty cycle D = Vout/Vin = 0.5 at 100kHz switching frequency. The minimum inductor value is calculated to maintain continuous conduction mode (CCM) and sized to 120µH (selected: 150µH for margin). The output capacitor is sized for <1% voltage ripple, yielding 47µF (selected: 100µF/25V electrolytic).\n\nThe MOSFET (IRF540N, RDS_on=44mΩ) and Schottky diode (1N5819) are selected based on voltage/current ratings with derating. Gate drive is provided by the TL494 PWM controller IC. Efficiency analysis accounts for conduction losses, switching losses, and diode forward drop, yielding an estimated 87% efficiency.`,
    objectives: ["Calculate D, L_min, C_min for CCM operation at full load", "Select MOSFET, diode, inductor, and capacitor with proper derating", "Simulate open-loop Buck converter in MATLAB/Simulink", "Analyze efficiency breakdown: conduction, switching, and gate drive losses"],
    outcomes: ["Mastered Buck converter steady-state and transient analysis", "Learned power MOSFET and Schottky diode selection criteria", "Understood the relationship between switching frequency and component size"],
    components: ["MOSFET IRF540N (100V, 33A)", "Schottky Diode 1N5819 (40V, 1A)", "Inductor 150µH / 3A", "Capacitor 100µF/25V Electrolytic", "PWM Controller TL494", "Gate Driver TC4420", "Current Sense Resistor 0.1Ω"],
    code: `% Buck Converter — Design Equations & Efficiency Analysis\n% Power Electronics Project\nclear; clc;\n\n%% Specifications\nVin  = 24;    % Input voltage (V)\nVout = 12;    % Output voltage (V)\nIout = 2;     % Output current (A)\nfsw  = 100e3; % Switching frequency (Hz)\nRipple_V = 0.01; % Max voltage ripple (1%)\nRipple_I = 0.20; % Max inductor current ripple (20%)\n\n%% Duty Cycle & Component Sizing\nD     = Vout / Vin;\ndeltaIL = Ripple_I * Iout;\nL_min = (Vin - Vout) * D / (fsw * deltaIL);\nC_min = deltaIL / (8 * fsw * Ripple_V * Vout);\n\nfprintf('=== Buck Converter Design ===\\n');\nfprintf('Duty Cycle   D = %.3f (%.1f%%)\\n', D, D*100);\nfprintf('Min Inductor   = %.2f µH  → Select 150 µH\\n', L_min*1e6);\nfprintf('Min Capacitor  = %.2f µF  → Select 100 µF\\n', C_min*1e6);\n\n%% Efficiency Analysis\nRds_on = 0.044;  % IRF540N on-resistance (Ω)\nVd     = 0.45;   % 1N5819 forward voltage (V)\nQg     = 72e-9;  % Gate charge (C)\nVgs    = 12;     % Gate drive voltage (V)\n\nP_cond_sw  = D    * Iout^2 * Rds_on;  % MOSFET conduction\nP_cond_d   = (1-D)* Iout * Vd;        % Diode conduction\nP_sw       = 0.5 * Vin * Iout * 20e-9 * fsw; % Switching (est 20ns)\nP_gate     = Qg * Vgs * fsw;          % Gate drive\n\nP_loss  = P_cond_sw + P_cond_d + P_sw + P_gate;\nP_out   = Vout * Iout;\neta     = P_out / (P_out + P_loss) * 100;\n\nfprintf('\\n=== Loss Breakdown ===\\n');\nfprintf('MOSFET Conduction: %.3f W\\n', P_cond_sw);\nfprintf('Diode  Conduction: %.3f W\\n', P_cond_d);\nfprintf('Switching Loss:    %.3f W\\n', P_sw);\nfprintf('Gate Drive Loss:   %.3f W\\n', P_gate);\nfprintf('Efficiency: %.1f%%\\n', eta);`,
    difficulty: "Advanced", duration: "2 weeks"
  },
  // Final Year Projects
  {
    id: 7, category: "Final Year Projects", emoji: "🚗",
    title: "Smart Driver Assist & Health Monitoring System",
    desc: "YOLOv8-based driver safety system with drowsiness detection, lane keeping, object detection, and health vitals monitoring.",
    fullDesc: `A final year project combining deep learning computer vision with embedded health monitoring to create a comprehensive driver safety system. The system runs on a Raspberry Pi 4 (4GB) connected to a camera module and health sensors.\n\nThe computer vision pipeline uses YOLOv8n for real-time multi-task detection: (1) Drowsiness detection via Eye Aspect Ratio (EAR) computed from facial landmarks — an alert triggers if EAR < 0.25 for more than 20 consecutive frames. (2) Lane departure warning using OpenCV Hough line transforms on a bird's-eye-view perspective warp. (3) Pedestrian and vehicle detection from YOLOv8's COCO-trained weights.\n\nThe health vitals module reads heart rate from a MAX30102 pulse oximeter sensor over I2C, and displays SpO2 and BPM on a 0.96" OLED display. An alert is raised if heart rate falls below 55 BPM or exceeds 110 BPM while driving. GPS coordinates are logged via a NEO-6M UART module for incident tracking.`,
    objectives: ["Implement real-time drowsiness detection using EAR algorithm with YOLOv8 landmarks", "Build lane departure warning using Hough transforms and perspective warp", "Integrate MAX30102 for heart rate and SpO2 monitoring via I2C", "Develop alert system: buzzer, OLED notification, and GPS incident logging"],
    outcomes: ["Achieved 94% drowsiness detection accuracy at 12 FPS on Raspberry Pi 4", "Reduced lane departure false positives using ROI masking", "Integrated multi-sensor fusion (camera + biometric) on embedded hardware", "Gained experience with YOLOv8, OpenCV, and Raspberry Pi I2C/UART peripherals"],
    components: ["Raspberry Pi 4 (4GB RAM)", "Raspberry Pi Camera Module v2 (8MP)", "YOLOv8n Model (ONNX Runtime)", "MAX30102 Pulse Oximeter (I2C)", "NEO-6M GPS Module (UART)", "OLED SSD1306 0.96\" (I2C)", "Active Buzzer (GPIO)", "12V→5V Buck Module for Car Power"],
    code: `from ultralytics import YOLO\nimport cv2, numpy as np\nfrom scipy.spatial import distance\nimport board, busio\nfrom adafruit_ssd1306 import SSD1306_I2C\nimport max30102, time\n\n# ── Model & Hardware Init ──────────────────────────────────\nmodel  = YOLO('yolov8n-pose.onnx')  # Pose model for landmarks\ni2c    = busio.I2C(board.SCL, board.SDA)\noled   = SSD1306_I2C(128, 64, i2c)\nsensor = max30102.MAX30102()\nBUZZER_PIN = 17\nimport RPi.GPIO as GPIO\nGPIO.setmode(GPIO.BCM)\nGPIO.setup(BUZZER_PIN, GPIO.OUT)\n\n# ── Eye Aspect Ratio ──────────────────────────────────────\ndef eye_aspect_ratio(eye_pts):\n    A = distance.euclidean(eye_pts[1], eye_pts[5])\n    B = distance.euclidean(eye_pts[2], eye_pts[4])\n    C = distance.euclidean(eye_pts[0], eye_pts[3])\n    return (A + B) / (2.0 * C)\n\nEAR_THRESH   = 0.25\nFRAME_THRESH = 20\ndrowsy_count = 0\n\n# ── Lane Detection ────────────────────────────────────────\ndef detect_lanes(frame):\n    h, w = frame.shape[:2]\n    roi  = frame[h//2:h, :]\n    gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)\n    blur = cv2.GaussianBlur(gray, (5,5), 0)\n    edges= cv2.Canny(blur, 50, 150)\n    lines= cv2.HoughLinesP(edges, 1, np.pi/180, 50,\n                           minLineLength=80, maxLineGap=10)\n    return lines\n\n# ── Main Loop ────────────────────────────────────────────\ncap = cv2.VideoCapture(0)\nwhile cap.isOpened():\n    ret, frame = cap.read()\n    if not ret: break\n    \n    results = model(frame, verbose=False)\n    for r in results:\n        kps = r.keypoints.xy.numpy() if r.keypoints else []\n        for kp in kps:\n            if len(kp) >= 68:\n                left_eye  = kp[36:42]\n                right_eye = kp[42:48]\n                ear = (eye_aspect_ratio(left_eye) +\n                       eye_aspect_ratio(right_eye)) / 2.0\n                if ear < EAR_THRESH:\n                    drowsy_count += 1\n                    if drowsy_count >= FRAME_THRESH:\n                        GPIO.output(BUZZER_PIN, GPIO.HIGH)\n                        cv2.putText(frame,"DROWSY ALERT!",\n                            (30,60),cv2.FONT_HERSHEY_SIMPLEX,\n                            1.5,(0,0,255),3)\n                else:\n                    drowsy_count = 0\n                    GPIO.output(BUZZER_PIN, GPIO.LOW)\n    \n    lanes = detect_lanes(frame)\n    # Heart rate from MAX30102 (every 5s)\n    hr, spo2 = sensor.get_hr_spo2()\n    cv2.putText(frame, f"HR:{hr} BPM SpO2:{spo2}%",\n                (10,30), cv2.FONT_HERSHEY_SIMPLEX, 0.7,(0,255,0),2)\n    cv2.imshow("Driver Monitor", frame)`,
    difficulty: "Advanced", duration: "4 months"
  },
  {
    id: 8, category: "Final Year Projects", emoji: "☀️",
    title: "IoT Solar Energy Monitoring System",
    desc: "Real-time solar panel monitoring with ESP32, cloud dashboard, energy forecasting, and fault detection.",
    fullDesc: `A complete IoT-based solar energy monitoring system designed for a 100W solar panel installation. The ESP32 DevKit microcontroller reads panel voltage (via resistive divider), current (via INA219 Hall-effect sensor), and temperature (via NTC thermistor on the panel back) every second.\n\nData is published over Wi-Fi to an MQTT broker (Mosquitto on a Raspberry Pi or cloud) and simultaneously visualized on a Blynk mobile dashboard with real-time voltage, current, power, energy (kWh), and panel temperature gauges. A daily energy log is stored in SPIFFS flash memory.\n\nThe system includes basic fault detection: open-circuit detection (I ≈ 0 but V > 20V), short-circuit (V < 2V), and thermal runaway warnings. An I2C OLED gives local display without phone dependency. Total BOM cost is under $15, making it suitable as a low-cost monitoring solution for rural solar installations.`,
    objectives: ["Measure panel V, I, P, temperature every second with INA219 + NTC", "Publish live data over MQTT to Blynk cloud dashboard", "Log daily kWh to SPIFFS flash and display 7-day history", "Implement open-circuit, short-circuit, and over-temperature fault detection"],
    outcomes: ["Learned ESP32 Wi-Fi, MQTT, and SPIFFS file system APIs", "Understood power measurement accuracy with INA219 (1% error)", "Built a cost-effective IoT monitoring node under $15 BOM", "Practiced non-blocking Arduino code with millis() timers"],
    components: ["ESP32 DevKit v1", "INA219 Current/Voltage Sensor (I2C)", "Voltage Divider 100kΩ/10kΩ", "NTC 10kΩ Thermistor + 10kΩ Pullup", "OLED SSD1306 0.96\" (I2C)", "Blynk Cloud / MQTT Broker", "3.3V LDO Regulator", "100W Solar Panel (monitored only)"],
    code: `#include <WiFi.h>\n#include <PubSubClient.h>\n#include <Adafruit_INA219.h>\n#include <Adafruit_SSD1306.h>\n#include <SPIFFS.h>\n#include <ArduinoJson.h>\n\nAdafruit_INA219    ina219;\nAdafruit_SSD1306   oled(128, 64, &Wire, -1);\nWiFiClient         wifi;\nPubSubClient       mqtt(wifi);\n\nconst char* ssid     = "YourSSID";\nconst char* password = "YourPass";\nconst char* broker   = "192.168.1.100"; // MQTT broker IP\n\nfloat totalEnergy_Wh = 0.0;\nunsigned long lastMs = 0;\n\nvoid connectMQTT() {\n  while (!mqtt.connected()) {\n    if (mqtt.connect("ESP32-Solar")) break;\n    delay(2000);\n  }\n}\n\nvoid setup() {\n  WiFi.begin(ssid, password);\n  while (WiFi.status() != WL_CONNECTED) delay(500);\n  mqtt.setServer(broker, 1883);\n  ina219.begin(); oled.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n  SPIFFS.begin(true);\n}\n\nvoid loop() {\n  if (!mqtt.connected()) connectMQTT();\n  mqtt.loop();\n  \n  if (millis() - lastMs >= 1000) {\n    lastMs = millis();\n    float V  = ina219.getBusVoltage_V();\n    float I  = ina219.getCurrent_mA() / 1000.0f; // → Amps\n    float P  = V * I;\n    float T  = readNTC(34);  // GPIO34 ADC\n    totalEnergy_Wh += P / 3600.0f;\n    \n    // Fault detection\n    String fault = "OK";\n    if (V > 20 && I < 0.01) fault = "OPEN_CIRCUIT";\n    if (V < 2.0)            fault = "SHORT_CIRCUIT";\n    if (T > 75.0)           fault = "OVER_TEMP";\n    \n    // Publish JSON to MQTT\n    StaticJsonDocument<200> doc;\n    doc["V"] = V; doc["I"] = I; doc["P"] = P;\n    doc["kWh"] = totalEnergy_Wh/1000.0f;\n    doc["T"] = T; doc["fault"] = fault;\n    char buf[200]; serializeJson(doc, buf);\n    mqtt.publish("solar/data", buf);\n    \n    // OLED update\n    oled.clearDisplay();\n    oled.setTextSize(1); oled.setTextColor(WHITE);\n    oled.setCursor(0,0);  oled.printf("V: %.2fV  I: %.3fA", V, I);\n    oled.setCursor(0,16); oled.printf("P: %.2fW  T: %.1fC", P, T);\n    oled.setCursor(0,32); oled.printf("E: %.4f kWh", totalEnergy_Wh/1000.0f);\n    oled.setCursor(0,48); oled.printf("Fault: %s", fault.c_str());\n    oled.display();\n  }\n}`,
    difficulty: "Intermediate", duration: "3 months"
  },
  {
    id: 9, category: "Microcontroller Projects", emoji: "🔢",
    title: "8051 LCD Interface in Assembly",
    desc: "Interfacing a 16×2 LCD with the 8051 microcontroller in assembly language, displaying custom messages.",
    fullDesc: `A foundational 8051 assembly language project that directly interfaces a Hitachi HD44780-compatible 16×2 LCD without any C library. The LCD data bus is connected to P1 (8-bit mode), RS on P2.0, and E on P2.2.\n\nThe project implements the full LCD initialization sequence (as per HD44780 datasheet): function set (2-line, 5×8 font), display control (display ON, cursor OFF), entry mode (increment, no shift), and clear display. Custom character generation using CGRAM is also demonstrated, creating a degree symbol (°) at address 0x00.\n\nDelay routines are implemented using software loops calibrated to an 11.0592 MHz crystal (a common baud-rate crystal that also works well for timing). The project displays a scrolling message and a counter on line 2.`,
    objectives: ["Implement HD44780 LCD initialization in 8051 assembly", "Write data and command send subroutines using P1/P2", "Display static and scrolling text on both LCD lines", "Create a custom CGRAM character (degree symbol)"],
    outcomes: ["Mastered 8051 port I/O, delay loops, and subroutine CALL/RET", "Understood HD44780 timing requirements (>37µs per command)", "Gained direct hardware-level programming experience without abstraction layers"],
    components: ["AT89S52 / 8051 MCU", "16x2 LCD (HD44780)", "11.0592 MHz Crystal + 33pF Caps", "10kΩ Contrast Pot (LCD VO pin)", "10kΩ Reset Pull-up", "5V Regulated Supply (7805)", "100nF Decoupling Cap"],
    code: `;======================================\n; 8051 Assembly — 16x2 LCD Interface\n; Crystal: 11.0592 MHz | LCD on P1/P2\n;======================================\nRS  EQU P2.0\nRW  EQU P2.1\nEN  EQU P2.2\n\nORG 0000H\n    LJMP MAIN\n\nORG 0030H\nMAIN:\n    MOV SP, #70H          ; Set stack pointer\n    CLR RS\n    CLR RW\n    CLR EN\n    LCALL DELAY_20MS      ; Power-on delay\n\n    ; LCD Init sequence (8-bit mode)\n    MOV A, #38H           ; 2-line, 5x8 font\n    LCALL LCD_CMD\n    MOV A, #0EH           ; Display ON, cursor ON\n    LCALL LCD_CMD\n    MOV A, #06H           ; Entry mode: increment\n    LCALL LCD_CMD\n    MOV A, #01H           ; Clear display\n    LCALL LCD_CMD\n\n    ; Write "EE Hub v1.0" on line 1\n    MOV A, #80H           ; Line 1, col 0\n    LCALL LCD_CMD\n    MOV DPTR, #MSG1\n    LCALL LCD_STRING\n\n    ; Write "Assembly Rules" on line 2\n    MOV A, #0C0H          ; Line 2, col 0\n    LCALL LCD_CMD\n    MOV DPTR, #MSG2\n    LCALL LCD_STRING\n\nHERE: SJMP HERE           ; Halt\n\n;--- Send Command to LCD ---\nLCD_CMD:\n    MOV P1, A\n    CLR RS                ; RS=0 for command\n    CLR RW\n    SETB EN\n    LCALL DELAY_2MS\n    CLR EN\n    LCALL DELAY_2MS\n    RET\n\n;--- Send Data to LCD ---\nLCD_DATA:\n    MOV P1, A\n    SETB RS               ; RS=1 for data\n    CLR RW\n    SETB EN\n    LCALL DELAY_2MS\n    CLR EN\n    LCALL DELAY_2MS\n    RET\n\n;--- Print string from DPTR (null-terminated) ---\nLCD_STRING:\n    CLR A\n    MOVC A, @A+DPTR\n    JZ LCD_STR_END\n    LCALL LCD_DATA\n    INC DPTR\n    SJMP LCD_STRING\nLCD_STR_END: RET\n\nDELAY_20MS: MOV R0,#40  \nD1: MOV R1,#255\nD2: DJNZ R1,D2\n    DJNZ R0,D1 \n    RET\nDELAY_2MS:  MOV R0,#4\n    SJMP D1\n\nMSG1: DB "  EE Hub v1.0  ", 0\nMSG2: DB "Assembly Rules!", 0\n    END`,
    difficulty: "Beginner", duration: "2 days"
  }
];

const projectCategories = ["All", "Microcontroller Projects", "MATLAB Projects", "Power Electronics Projects", "Final Year Projects"];

const notesData = [
  {
    icon: "fas fa-network-wired",
    title: "Digital Logic Design Notes",
    desc: "Comprehensive notes on logic gates, Boolean algebra, Karnaugh maps, flip-flops, and sequential circuits.",
    tags: ["Logic Gates", "K-Maps", "Flip-Flops", "FSM"],
    content: "Covers: AND/OR/NOT/NAND/NOR/XOR gates, Boolean simplification, SOP/POS forms, Karnaugh Maps (2,3,4 variable), SR/D/JK/T flip-flops, Registers, Counters, State machines."
  },
  {
    icon: "fas fa-bolt",
    title: "MOSFET — Complete Guide",
    desc: "Understanding MOSFET operation modes, IV characteristics, biasing, and small-signal models.",
    tags: ["n-MOSFET", "p-MOSFET", "Biasing", "Amplifier"],
    content: "Topics: Enhancement vs Depletion mode, Triode/Saturation/Cutoff regions, Body effect, Channel-length modulation, CS/CG/CD amplifier configurations, Small-signal model parameters."
  },
  {
    icon: "fas fa-microchip",
    title: "CMOS Inverter Analysis",
    desc: "Static and dynamic analysis of CMOS inverter including switching characteristics and power dissipation.",
    tags: ["CMOS", "Switching", "Power", "Noise Margin"],
    content: "Includes: VOH/VOL/VIH/VIL levels, Noise margins, Voltage Transfer Characteristic (VTC), Propagation delay (tpHL, tpLH), Dynamic power = CL·VDD²·f, Static power dissipation analysis."
  },
  {
    icon: "fas fa-wave-square",
    title: "Fourier Transform Basics",
    desc: "From Fourier Series to Fourier Transform — time-frequency duality, properties, and applications.",
    tags: ["CTFT", "DTFT", "FFT", "Convolution"],
    content: "Key concepts: Fourier series coefficients, Parseval's theorem, FT pairs, Properties (linearity, time shift, frequency shift, scaling), Convolution theorem, DFT & FFT algorithm, Applications in signal processing."
  },
  {
    icon: "fas fa-sliders-h",
    title: "Control Systems — Root Locus",
    desc: "Root locus method for analyzing closed-loop stability as gain varies.",
    tags: ["Root Locus", "Stability", "Bode Plot", "PID"],
    content: "Rules for root locus construction, Gain margin and phase margin, Bode plots, Nyquist criterion, PID controller design, State-space representation, Controllability & Observability."
  },
  {
    icon: "fas fa-charging-station",
    title: "Thevenin & Norton Theorem",
    desc: "Simplifying complex circuits using equivalent circuit theorems.",
    tags: ["Thevenin", "Norton", "Superposition", "Source Transform"],
    content: "Thevenin equivalent circuit (Vth, Rth), Norton equivalent (In, Rn), Source transformation, Superposition principle, Maximum power transfer theorem, Millman's theorem."
  },
  {
    icon: "fas fa-broadcast-tower",
    title: "Amplitude Modulation (AM)",
    desc: "AM modulation theory, bandwidth, power, and demodulation techniques.",
    tags: ["AM", "FM", "Bandwidth", "SNR"],
    content: "AM modulation index, DSB-SC, SSB-SC, VSB, Bandwidth: BW = 2W, Power efficiency, Envelope detector, Synchronous demodulator, FM frequency deviation, Carson's rule."
  },
  {
    icon: "fas fa-memory",
    title: "8051 Microcontroller Assembly",
    desc: "Programming the classic 8051 MCU in assembly language with peripheral control.",
    tags: ["8051", "Assembly", "Timers", "Interrupts"],
    content: "8051 architecture, SFRs, Addressing modes, Instruction set (MOV, ADD, SUBB, MUL, DIV, DJNZ, LCALL), Timer 0/1 configuration, Serial communication, Interrupt system (IE, IP registers), LCD interface on P1."
  }
];

// ============================================================
// STATE
// ============================================================
let currentPage = 'home';
let activeBookCategory = 'All';
let activeProjectCategory = 'All';
let notifVisible = true;
let mobileMenuOpen = false;

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedBooks();
  renderLatestProjects();
  renderBookCategories();
  renderBooks('All');
  renderProjectCategories();
  renderProjects('All');
  renderNotes();
  initResistorTool();
  createParticles();
  initNavScroll();
  showPage('home');
});

// ============================================================
// NAVIGATION
// ============================================================
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    currentPage = pageId;
  }
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.remove('active');
    if (l.textContent.trim().toLowerCase().startsWith(pageId.toLowerCase().replace('-', ' ').split(' ')[0])) {
      l.classList.add('active');
    }
  });
  // Update active state better
  const pageNavMap = { home: 'Home', books: 'Books', projects: 'Projects', notes: 'Notes', tools: 'Tools', about: 'About', contact: 'Contact' };
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.textContent.trim() === pageNavMap[pageId]);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (mobileMenuOpen) toggleMobileMenu();
  closeSearch();
}

function initNavScroll() {
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });
}

function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen;
  document.getElementById('nav-links').classList.toggle('open', mobileMenuOpen);
  const hb = document.getElementById('hamburger');
  const spans = hb.querySelectorAll('span');
  if (mobileMenuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
}

// ============================================================
// NOTIFICATION BAR
// ============================================================
function closeNotif() {
  const bar = document.getElementById('notif-bar');
  bar.classList.add('hidden');
  notifVisible = false;
  document.getElementById('navbar').classList.add('notif-hidden');
  document.getElementById('main-content').style.paddingTop = '66px';
  document.getElementById('search-results').style.top = '76px';
}

// ============================================================
// THEME
// ============================================================
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  const icon = document.getElementById('theme-icon');
  icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
  showToast(isDark ? '☀️ Light mode activated' : '🌙 Dark mode activated');
}

// ============================================================
// SEARCH
// ============================================================
function handleSearch(e) {
  const query = e.target.value.trim().toLowerCase();
  const resultsEl = document.getElementById('search-results');
  if (!query || query.length < 2) { resultsEl.classList.add('hidden'); return; }

  const results = [];
  booksData.filter(b => b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query) || b.category.toLowerCase().includes(query))
    .slice(0, 4).forEach(b => results.push({ type: 'Book', title: b.title + ' — ' + b.author, page: 'books' }));
  projectsData.filter(p => p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query) || p.category.toLowerCase().includes(query))
    .slice(0, 3).forEach(p => results.push({ type: 'Project', title: p.title, page: 'projects', id: p.id }));
  notesData.filter(n => n.title.toLowerCase().includes(query) || n.tags.join(' ').toLowerCase().includes(query))
    .slice(0, 3).forEach(n => results.push({ type: 'Note', title: n.title, page: 'notes' }));

  if (results.length === 0) {
    resultsEl.innerHTML = '<div style="text-align:center; color:var(--text-muted); padding:1rem; font-size:0.875rem;">No results found for "' + query + '"</div>';
  } else {
    resultsEl.innerHTML = results.map(r => `
      <div class="search-result-item" onclick="goToResult('${r.page}', ${r.id || 'null'})">
        <div class="sr-type">${r.type}</div>
        <div class="sr-title">${r.title}</div>
      </div>
    `).join('');
  }
  resultsEl.classList.remove('hidden');
}

function goToResult(page, id) {
  showPage(page);
  if (id && page === 'projects') setTimeout(() => openProjectModal(id), 300);
  closeSearch();
}

function closeSearch() {
  document.getElementById('search-results').classList.add('hidden');
  document.getElementById('search-input').value = '';
}
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-box') && !e.target.closest('.search-results')) closeSearch();
});

// ============================================================
// BOOKS RENDERING
// ============================================================
function renderFeaturedBooks() {
  const featured = booksData.slice(0, 6);
  document.getElementById('featured-books').innerHTML = featured.map(b => bookCardHTML(b)).join('');
}

function renderBookCategories() {
  const tabs = document.getElementById('book-category-tabs');
  tabs.innerHTML = bookCategories.map(cat =>
    `<button class="cat-tab ${cat === 'All' ? 'active' : ''}" onclick="filterBooks('${cat}', this)">${cat}</button>`
  ).join('');
}

function filterBooks(category, btn) {
  document.querySelectorAll('#book-category-tabs .cat-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderBooks(category);
}

function renderBooks(category) {
  const filtered = category === 'All' ? booksData : booksData.filter(b => b.category === category);
  document.getElementById('books-grid').innerHTML = filtered.map(b => bookCardHTML(b)).join('');
}

function bookCardHTML(b) {
  return `
    <div class="book-card">
      <div class="book-cover" style="background: linear-gradient(135deg, ${b.color} 0%, #0a1628 100%);">
        <span style="position:relative; z-index:1; font-size:2.8rem;">${b.emoji}</span>
      </div>
      <div class="book-body">
        <div class="book-category">${b.category}</div>
        <div class="book-title">${b.title}</div>
        <div class="book-author">by ${b.author}</div>
        <div class="book-actions">
          <button class="btn btn-primary" onclick="showToast('📥 Downloading: ${b.title.substring(0,20)}...')">
            <i class="fas fa-download"></i> Download
          </button>
          <button class="btn btn-secondary" onclick="showToast('📖 Opening: ${b.title.substring(0,20)}...')">
            <i class="fas fa-eye"></i> View
          </button>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// PROJECTS RENDERING
// ============================================================
function renderLatestProjects() {
  const latest = projectsData.slice(0, 4);
  document.getElementById('latest-projects').innerHTML = latest.map(p => projectCardHTML(p)).join('');
}

function renderProjectCategories() {
  const tabs = document.getElementById('project-category-tabs');
  tabs.innerHTML = projectCategories.map(cat =>
    `<button class="cat-tab ${cat === 'All' ? 'active' : ''}" onclick="filterProjects('${cat}', this)">${cat}</button>`
  ).join('');
}

function filterProjects(category, btn) {
  document.querySelectorAll('#project-category-tabs .cat-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderProjects(category);
}

function renderProjects(category) {
  const filtered = category === 'All' ? projectsData : projectsData.filter(p => p.category === category);
  document.getElementById('projects-grid').innerHTML = filtered.map(p => projectCardHTML(p)).join('');
}

function projectCardHTML(p) {
  const diffColor = { Beginner: '#00e676', Intermediate: '#00aaff', Advanced: '#ff6b35' }[p.difficulty] || '#00aaff';
  return `
    <div class="project-card" onclick="openProjectModal(${p.id})">
      <div class="project-tag"><span>${p.emoji}</span> ${p.category}</div>
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-meta">
        <span style="color:${diffColor}; font-weight:600;">⬤ ${p.difficulty}</span>
        <span><i class="fas fa-clock"></i> ${p.duration}</span>
      </div>
    </div>
  `;
}

function openProjectModal(id) {
  const p = projectsData.find(x => x.id === id);
  if (!p) return;
  const modal = document.getElementById('project-modal');

  const objHTML = p.objectives ? `
    <div class="modal-section">
      <h4><i class="fas fa-bullseye"></i> Project Objectives</h4>
      <ul class="modal-list">${p.objectives.map(o => `<li><i class="fas fa-check" style="color:var(--accent);margin-right:8px;"></i>${o}</li>`).join('')}</ul>
    </div>` : '';

  const outHTML = p.outcomes ? `
    <div class="modal-section">
      <h4><i class="fas fa-graduation-cap"></i> Learning Outcomes</h4>
      <ul class="modal-list">${p.outcomes.map(o => `<li><i class="fas fa-star" style="color:#f1c40f;margin-right:8px;font-size:0.7rem;"></i>${o}</li>`).join('')}</ul>
    </div>` : '';

  document.getElementById('modal-body').innerHTML = `
    <button class="modal-close" onclick="closeModal()"><i class="fas fa-times"></i></button>
    <div class="modal-tag"><span class="project-tag">${p.emoji} ${p.category}</span>
      <span class="modal-difficulty" data-diff="${p.difficulty}">${p.difficulty} &nbsp;·&nbsp; ${p.duration}</span>
    </div>
    <h2>${p.title}</h2>

    <div class="modal-section">
      <h4><i class="fas fa-align-left"></i> Project Description</h4>
      <p class="modal-full-desc">${(p.fullDesc || p.desc).replace(/\n\n/g,'</p><p class="modal-full-desc">')}</p>
    </div>

    ${objHTML}
    ${outHTML}

    <div class="modal-section">
      <h4><i class="fas fa-microchip"></i> Components Required</h4>
      <div class="components-list">
        ${p.components.map(c => `<span class="component-chip"><i class="fas fa-circle-dot" style="color:var(--accent);font-size:0.6rem;margin-right:4px;"></i>${c}</span>`).join('')}
      </div>
    </div>

    <div class="modal-section">
      <h4><i class="fas fa-diagram-project"></i> Circuit Diagram</h4>
      <div class="circuit-placeholder">
        <i class="fas fa-draw-polygon"></i>
        <span>Circuit / schematic diagram — attach your image here</span>
      </div>
    </div>

    <div class="modal-section">
      <h4><i class="fas fa-code"></i> Source Code</h4>
      <pre class="code-block">${escapeHTML(p.code)}</pre>
    </div>

    <div class="modal-actions">
      <button class="btn btn-primary" onclick="showToast('📦 Downloading project files...')">
        <i class="fas fa-download"></i> Download Files
      </button>
      <button class="btn btn-secondary" onclick="showToast('📋 Code copied to clipboard!')">
        <i class="fas fa-copy"></i> Copy Code
      </button>
      <button class="btn btn-ghost" onclick="closeModal()">
        <i class="fas fa-arrow-left"></i> Back
      </button>
    </div>
  `;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('project-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ============================================================
// NOTES RENDERING
// ============================================================
function renderNotes() {
  document.getElementById('notes-grid').innerHTML = notesData.map(n => `
    <div class="note-card" onclick="showToast('📄 Opening: ${n.title}')">
      <div class="note-icon"><i class="${n.icon}"></i></div>
      <h3>${n.title}</h3>
      <p>${n.desc}</p>
      <div class="note-tags">
        ${n.tags.map(t => `<span class="note-tag">${t}</span>`).join('')}
      </div>
      <div style="margin-top:1rem; display:flex; gap:0.5rem;">
        <button class="btn btn-primary" style="font-size:0.78rem; padding:0.4rem 0.9rem;" onclick="event.stopPropagation(); showToast('📥 Downloading ${n.title}')">
          <i class="fas fa-download"></i> Download PDF
        </button>
        <button class="btn btn-ghost" style="font-size:0.78rem; padding:0.4rem 0.9rem;" onclick="event.stopPropagation(); showToast('📖 Viewing ${n.title}')">
          <i class="fas fa-eye"></i> Read
        </button>
      </div>
    </div>
  `).join('');
}

// ============================================================
// TOOLS — OHM'S LAW
// ============================================================
function calcOhm() {
  const v = parseFloat(document.getElementById('ohm-v').value);
  const i = parseFloat(document.getElementById('ohm-i').value);
  const r = parseFloat(document.getElementById('ohm-r').value);
  const res = document.getElementById('ohm-result');
  res.classList.remove('hidden', 'error');

  const known = [!isNaN(v), !isNaN(i), !isNaN(r)].filter(Boolean).length;
  if (known < 2) { res.classList.add('error'); res.innerHTML = '⚠️ Enter at least 2 values'; return; }

  let results = [];
  if (!isNaN(v) && !isNaN(i)) { const R = v / i; results.push(`R = ${R.toFixed(4)} Ω`); results.push(`P = ${(v*i).toFixed(4)} W`); }
  if (!isNaN(v) && !isNaN(r)) { const I = v / r; results.push(`I = ${I.toFixed(4)} A`); results.push(`P = ${(v*I).toFixed(4)} W`); }
  if (!isNaN(i) && !isNaN(r)) { const V = i * r; results.push(`V = ${V.toFixed(4)} V`); results.push(`P = ${(V*i).toFixed(4)} W`); }

  res.innerHTML = '<strong>Results:</strong><br>' + [...new Set(results)].join('<br>');
}

// ============================================================
// TOOLS — RESISTOR COLOR CODE
// ============================================================
const colorData = [
  { name: 'Black', value: 0, color: '#1a1a1a', mult: 1 },
  { name: 'Brown', value: 1, color: '#7b3f00', mult: 10 },
  { name: 'Red', value: 2, color: '#c0392b', mult: 100 },
  { name: 'Orange', value: 3, color: '#e67e22', mult: 1000 },
  { name: 'Yellow', value: 4, color: '#f1c40f', mult: 10000 },
  { name: 'Green', value: 5, color: '#27ae60', mult: 100000 },
  { name: 'Blue', value: 6, color: '#2980b9', mult: 1000000 },
  { name: 'Violet', value: 7, color: '#8e44ad', mult: 10000000 },
  { name: 'Grey', value: 8, color: '#7f8c8d', mult: 100000000 },
  { name: 'White', value: 9, color: '#ecf0f1', mult: 1000000000 },
  { name: 'Gold', value: null, color: '#d4ac0d', mult: 0.1 },
  { name: 'Silver', value: null, color: '#bdc3c7', mult: 0.01 },
];
const toleranceData = [
  { name: 'Gold ±5%', color: '#d4ac0d', tol: '±5%' },
  { name: 'Silver ±10%', color: '#bdc3c7', tol: '±10%' },
  { name: 'Brown ±1%', color: '#7b3f00', tol: '±1%' },
  { name: 'Red ±2%', color: '#c0392b', tol: '±2%' },
  { name: 'Green ±0.5%', color: '#27ae60', tol: '±0.5%' },
  { name: 'Blue ±0.25%', color: '#2980b9', tol: '±0.25%' },
];

function initResistorTool() {
  const digits = colorData.filter(c => c.value !== null);
  const mults = colorData;
  ['band1', 'band2'].forEach(id => {
    const sel = document.getElementById(id);
    digits.forEach(c => {
      const opt = new Option(`${c.name} (${c.value})`, c.value);
      sel.add(opt);
    });
  });
  const band3 = document.getElementById('band3');
  mults.forEach(c => {
    const opt = new Option(`${c.name} (×${c.mult})`, c.mult);
    band3.add(opt);
  });
  const band4 = document.getElementById('band4');
  toleranceData.forEach(c => {
    const opt = new Option(`${c.name}`, c.tol);
    band4.add(opt);
  });
}

function calcResistor() {
  const b1 = document.getElementById('band1').value;
  const b2 = document.getElementById('band2').value;
  const b3 = document.getElementById('band3').value;
  const b4 = document.getElementById('band4').value;
  const res = document.getElementById('resistor-result');

  if (!b1 || !b2 || !b3 || !b4) { res.classList.add('hidden'); return; }
  const value = (parseInt(b1) * 10 + parseInt(b2)) * parseFloat(b3);
  const tol = b4;

  let display;
  if (value >= 1e6) display = (value / 1e6).toFixed(2) + ' MΩ';
  else if (value >= 1e3) display = (value / 1e3).toFixed(2) + ' kΩ';
  else display = value.toFixed(2) + ' Ω';

  res.classList.remove('hidden', 'error');
  res.innerHTML = `<strong>Resistance: ${display}</strong><br>Tolerance: ${tol}`;
}

// ============================================================
// TOOLS — VOLTAGE DIVIDER
// ============================================================
function calcVoltageDivider() {
  const vin = parseFloat(document.getElementById('vd-vin').value);
  const r1 = parseFloat(document.getElementById('vd-r1').value);
  const r2 = parseFloat(document.getElementById('vd-r2').value);
  const res = document.getElementById('vd-result');
  res.classList.remove('hidden', 'error');

  if (isNaN(vin) || isNaN(r1) || isNaN(r2)) {
    res.classList.add('error');
    res.innerHTML = '⚠️ Please fill in all fields';
    return;
  }
  if (r1 + r2 === 0) { res.classList.add('error'); res.innerHTML = '⚠️ R1 + R2 cannot be zero'; return; }

  const vout = vin * r2 / (r1 + r2);
  const current = vin / (r1 + r2);
  const p_r1 = current * current * r1;
  const p_r2 = current * current * r2;

  res.innerHTML = `<strong>Vout = ${vout.toFixed(4)} V</strong><br>
    Current = ${(current * 1000).toFixed(4)} mA<br>
    P(R1) = ${(p_r1 * 1000).toFixed(4)} mW<br>
    P(R2) = ${(p_r2 * 1000).toFixed(4)} mW`;
}

// ============================================================
// TOOLS — NUMBER CONVERTER
// ============================================================
function calcConverter() {
  const input = document.getElementById('conv-input').value.trim();
  const fromBase = parseInt(document.getElementById('conv-from').value);
  const res = document.getElementById('conv-result');
  res.classList.remove('hidden', 'error');

  if (!input) { res.classList.add('error'); res.innerHTML = '⚠️ Enter a value'; return; }

  const decimal = parseInt(input, fromBase);
  if (isNaN(decimal)) { res.classList.add('error'); res.innerHTML = '⚠️ Invalid input for base ' + fromBase; return; }

  res.innerHTML = `
    <strong>Decimal (10):</strong> ${decimal}<br>
    <strong>Binary (2):</strong> ${decimal.toString(2).padStart(8, '0')}<br>
    <strong>Octal (8):</strong> ${decimal.toString(8)}<br>
    <strong>Hex (16):</strong> ${decimal.toString(16).toUpperCase()}
  `;
}

// ============================================================
// TOOLS — CAPACITOR CALCULATOR
// ============================================================
function calcCapacitor() {
  const C = parseFloat(document.getElementById('cap-c').value) * 1e-6; // µF → F
  const V = parseFloat(document.getElementById('cap-v').value);
  const f = parseFloat(document.getElementById('cap-f').value);
  const res = document.getElementById('cap-result');
  res.classList.remove('hidden','error');

  if (isNaN(C) || isNaN(V)) { res.classList.add('error'); res.innerHTML = '⚠️ Enter Capacitance and Voltage'; return; }

  const Q = C * V;
  const E = 0.5 * C * V * V;
  let html = `<strong>Charge Q = ${(Q*1000).toFixed(4)} mC</strong><br>
              Energy E = ${(E*1000).toFixed(4)} mJ`;
  if (!isNaN(f) && f > 0) {
    const Xc = 1 / (2 * Math.PI * f * C);
    html += `<br>Reactance Xc = ${Xc.toFixed(4)} Ω`;
  }
  res.innerHTML = html;
}

// ============================================================
// TOOLS — INDUCTOR CALCULATOR
// ============================================================
function calcInductor() {
  const L = parseFloat(document.getElementById('ind-l').value) * 1e-3; // mH → H
  const f = parseFloat(document.getElementById('ind-f').value);
  const R = parseFloat(document.getElementById('ind-r').value);
  const res = document.getElementById('ind-result');
  res.classList.remove('hidden','error');

  if (isNaN(L) || isNaN(f)) { res.classList.add('error'); res.innerHTML = '⚠️ Enter Inductance and Frequency'; return; }
  if (f <= 0) { res.classList.add('error'); res.innerHTML = '⚠️ Frequency must be > 0'; return; }

  const XL = 2 * Math.PI * f * L;
  const E  = 0.5 * L; // energy per A²
  let html = `<strong>Reactance XL = ${XL.toFixed(4)} Ω</strong><br>
              Energy E = ½·L·I² (per 1A: ${(E*1000).toFixed(4)} mJ)`;
  if (!isNaN(R) && R > 0) {
    const tau = L / R;
    const Q_factor = XL / R;
    html += `<br>Time Constant τ = ${(tau*1000).toFixed(4)} ms<br>Q Factor = ${Q_factor.toFixed(3)}`;
  }
  res.innerHTML = html;
}

// ============================================================
// TOOLS — RC FILTER
// ============================================================
function calcRCFilter() {
  const R = parseFloat(document.getElementById('rc-r').value);
  const C = parseFloat(document.getElementById('rc-c').value) * 1e-6;
  const res = document.getElementById('rc-result');
  res.classList.remove('hidden','error');

  if (isNaN(R) || isNaN(C) || R <= 0 || C <= 0) {
    res.classList.add('error'); res.innerHTML = '⚠️ Enter valid R and C values'; return;
  }

  const fc  = 1 / (2 * Math.PI * R * C);
  const tau = R * C;
  const wc  = 2 * Math.PI * fc;

  res.innerHTML = `<strong>Cutoff Freq fc = ${fc.toFixed(2)} Hz</strong><br>
    Angular ωc = ${wc.toFixed(2)} rad/s<br>
    Time Constant τ = ${(tau*1000).toFixed(4)} ms<br>
    At fc: Gain = −3 dB &nbsp;|&nbsp; Phase = −45°`;
}

// ============================================================
// TOOLS — AC POWER
// ============================================================
function calcACPower() {
  const V     = parseFloat(document.getElementById('ac-v').value);
  const I     = parseFloat(document.getElementById('ac-i').value);
  const theta = parseFloat(document.getElementById('ac-theta').value);
  const res   = document.getElementById('ac-result');
  res.classList.remove('hidden','error');

  if (isNaN(V) || isNaN(I) || isNaN(theta)) {
    res.classList.add('error'); res.innerHTML = '⚠️ Fill in all three fields'; return;
  }

  const rad = theta * Math.PI / 180;
  const S   = V * I;                    // Apparent power (VA)
  const P   = S * Math.cos(rad);        // Real power (W)
  const Q   = S * Math.sin(rad);        // Reactive power (VAR)
  const PF  = Math.cos(rad);

  res.innerHTML = `<strong>Apparent S = ${S.toFixed(2)} VA</strong><br>
    Real Power P = ${P.toFixed(2)} W<br>
    Reactive Q = ${Q.toFixed(2)} VAR<br>
    Power Factor PF = ${PF.toFixed(4)} ${PF < 0.9 ? '⚠️ Low PF' : '✅'}`;
}

// ============================================================
// TOOLS — LED RESISTOR
// ============================================================
function calcLED() {
  const Vs = parseFloat(document.getElementById('led-vs').value);
  const Vf = parseFloat(document.getElementById('led-vf').value);
  const If = parseFloat(document.getElementById('led-if').value) / 1000; // mA → A
  const res = document.getElementById('led-result');
  res.classList.remove('hidden','error');

  if (isNaN(Vs) || isNaN(Vf) || isNaN(If) || If <= 0) {
    res.classList.add('error'); res.innerHTML = '⚠️ Fill in all fields correctly'; return;
  }
  if (Vs <= Vf) {
    res.classList.add('error'); res.innerHTML = '⚠️ Vs must be greater than Vf'; return;
  }

  const R    = (Vs - Vf) / If;
  const P    = (Vs - Vf) * If;
  // Pick nearest standard E24 resistor
  const e24  = [10,11,12,13,15,16,18,20,22,24,27,30,33,36,39,43,47,51,56,62,68,75,82,91];
  const decade = Math.pow(10, Math.floor(Math.log10(R)));
  const norm   = R / decade;
  const std    = e24.reduce((a,b) => Math.abs(b-norm) < Math.abs(a-norm) ? b : a) * decade;

  res.innerHTML = `<strong>R = ${R.toFixed(1)} Ω &nbsp;→&nbsp; Use ${std.toFixed(0)} Ω (E24 std)</strong><br>
    Power dissipated = ${(P*1000).toFixed(2)} mW<br>
    Use ¼W resistor if P < 250mW ✅`;
}

// ============================================================
// TOOLS — TRANSFORMER
// ============================================================
function calcTransformer() {
  const N1 = parseFloat(document.getElementById('tr-n1').value);
  const N2 = parseFloat(document.getElementById('tr-n2').value);
  const V1 = parseFloat(document.getElementById('tr-v1').value);
  const I1 = parseFloat(document.getElementById('tr-i1').value);
  const res = document.getElementById('tr-result');
  res.classList.remove('hidden','error');

  if (isNaN(N1) || isNaN(N2) || isNaN(V1) || N1 <= 0 || N2 <= 0) {
    res.classList.add('error'); res.innerHTML = '⚠️ Enter N1, N2, and V1'; return;
  }

  const ratio = N1 / N2;
  const V2    = V1 * (N2 / N1);
  let html = `<strong>Turns Ratio N1:N2 = ${ratio.toFixed(3)}:1</strong><br>
    Secondary Voltage V2 = ${V2.toFixed(2)} V`;

  if (!isNaN(I1) && I1 > 0) {
    const I2 = I1 * (N1 / N2); // ideal transformer
    html += `<br>Secondary Current I2 = ${I2.toFixed(4)} A<br>
      Apparent Power S = ${(V1*I1).toFixed(2)} VA`;
  }
  html += V2 < V1 ? '<br>Type: <strong>Step-Down</strong> ↓' : '<br>Type: <strong>Step-Up</strong> ↑';
  res.innerHTML = html;
}

// ============================================================
// TOOLS — dB / GAIN
// ============================================================
function calcDB() {
  const mode = document.getElementById('db-mode').value;
  const val  = parseFloat(document.getElementById('db-val').value);
  const type = document.getElementById('db-type').value;
  const res  = document.getElementById('db-result');
  res.classList.remove('hidden','error');

  if (isNaN(val)) { res.classList.add('error'); res.innerHTML = '⚠️ Enter a numeric value'; return; }

  const k = type === 'power' ? 10 : 20;

  if (mode === 'v2db') {
    if (val <= 0) { res.classList.add('error'); res.innerHTML = '⚠️ Ratio must be > 0'; return; }
    const db = k * Math.log10(val);
    res.innerHTML = `<strong>${val} → ${db.toFixed(4)} dB</strong><br>
      ${val > 1 ? '↑ Gain (amplification)' : val < 1 ? '↓ Loss (attenuation)' : '= Unity gain (0 dB)'}`;
  } else {
    const ratio = Math.pow(10, val / k);
    res.innerHTML = `<strong>${val} dB → Ratio = ${ratio.toFixed(6)}</strong><br>
      ${val > 0 ? '↑ Amplification' : val < 0 ? '↓ Attenuation' : '= Unity gain'}`;
  }
}

// ============================================================
// ============================================================
function submitContact(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
    const success = document.getElementById('contact-success');
    success.classList.remove('hidden');
    success.innerHTML = '✅ Message sent! We\'ll get back to you soon.';
    e.target.reset();
    setTimeout(() => success.classList.add('hidden'), 4000);
  }, 1500);
}

// ============================================================
// PARTICLES
// ============================================================
function createParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDuration = (6 + Math.random() * 10) + 's';
    p.style.animationDelay = (Math.random() * 8) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    container.appendChild(p);
  }
}

// ============================================================
// TOAST NOTIFICATION
// ============================================================
let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerHTML = `<i class="fas fa-info-circle" style="color:var(--accent)"></i> ${message}`;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
}

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeSearch();
    if (mobileMenuOpen) toggleMobileMenu();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === '/') {
    e.preventDefault();
    document.getElementById('search-input').focus();
  }
});
