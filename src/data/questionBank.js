/**
 * JEEReady Question Bank
 * Structured question bank supporting JEE Main 2026 Paper 1 pattern:
 * - 75 Questions Total: 25 Physics, 25 Chemistry, 25 Mathematics
 * - Each subject has Section A (20 MCQs) and Section B (5 Numerical-Answer questions)
 * - KaTeX LaTeX formatted formulas and equations
 * - Detailed step-by-step explanations
 * - Demo/sample indicator tag
 */

export const DEFAULT_EXAM_CONFIG = {
  patternYear: '2026',
  paperTitle: 'JEE Main Paper 1 (B.E. / B.Tech)',
  totalQuestions: 75,
  subjects: ['physics', 'chemistry', 'mathematics'],
  subjectNames: {
    physics: 'Physics',
    chemistry: 'Chemistry',
    mathematics: 'Mathematics'
  },
  sectionsPerSubject: {
    A: { name: 'Section A (MCQ)', type: 'mcq', count: 20, compulsory: 20 },
    B: { name: 'Section B (Numerical)', type: 'numerical', count: 5, compulsory: 5 }
  },
  durationMinutes: 180, // 3 hours
  markingScheme: {
    correct: 4,
    incorrect: -1,
    unanswered: 0,
    numericalNegativeMarking: true // Under current JEE Main rules, Section B also has -1
  }
};

export const TEST_PRESETS = [
  {
    id: 'full-mock-1',
    title: 'JEE Main 2026 Full Mock Test #1',
    subtitle: 'Comprehensive 75-Question Simulation (Physics, Chemistry & Math)',
    durationMinutes: 180,
    totalQuestions: 75,
    maxMarks: 300,
    category: 'full-mock',
    subjects: ['physics', 'chemistry', 'mathematics'],
    description: 'Authentic 3-hour practice covering full JEE Main 2026 syllabus with 20 MCQs and 5 Numerical questions per subject.'
  },
  {
    id: 'physics-mastery',
    title: 'Physics Sectional Mastery Test',
    subtitle: 'Mechanics, Electromagnetism, Optics & Modern Physics',
    durationMinutes: 60,
    totalQuestions: 25,
    maxMarks: 100,
    category: 'subject',
    subjects: ['physics'],
    description: 'Focused 1-hour test with 20 MCQs and 5 Numerical questions on core Physics topics.'
  },
  {
    id: 'chemistry-rapid',
    title: 'Chemistry Sectional Rapid Test',
    subtitle: 'Physical, Inorganic & Organic Chemistry',
    durationMinutes: 60,
    totalQuestions: 25,
    maxMarks: 100,
    category: 'subject',
    subjects: ['chemistry'],
    description: 'Test your chemical reactions, equilibrium, coordination chemistry, and kinetics in a 60-minute session.'
  },
  {
    id: 'mathematics-challenge',
    title: 'Mathematics Sectional Challenge',
    subtitle: 'Calculus, Vectors & 3D, Algebra, and Coordinate Geometry',
    durationMinutes: 60,
    totalQuestions: 25,
    maxMarks: 100,
    category: 'subject',
    subjects: ['mathematics'],
    description: 'Rigorous problem-solving test with high-yield algebra, calculus, and geometry problems.'
  },
  {
    id: 'sprint-15',
    title: 'Quick 30-Min Sprint Test',
    subtitle: 'High-Yield Mix: 5 Physics + 5 Chem + 5 Math',
    durationMinutes: 30,
    totalQuestions: 15,
    maxMarks: 60,
    category: 'sprint',
    subjects: ['physics', 'chemistry', 'mathematics'],
    filterCount: { physics: 5, chemistry: 5, mathematics: 5 },
    description: 'Perfect for a rapid diagnostic check or quick daily revision during study breaks.'
  }
];

export const RAW_QUESTION_BANK = [
  // ==========================================
  // PHYSICS - SECTION A (20 MCQs)
  // ==========================================
  {
    id: 'phy-a-01',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Kinematics',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'A projectile is launched from horizontal ground with speed $u$ at an angle $\\theta$ with the horizontal. The magnitude of the change in velocity of the projectile when it reaches the highest point of its trajectory is:',
    options: [
      '$u \\cos\\theta$',
      '$u \\sin\\theta$',
      '$u$',
      '$u \\sqrt{1 + \\cos^2\\theta}$'
    ],
    correctAnswer: 1, // index 1 is u sin\theta
    explanation: 'Initial velocity vector is $\\vec{u} = (u\\cos\\theta)\\hat{i} + (u\\sin\\theta)\\hat{j}$. At the highest point, vertical velocity is zero: $\\vec{v} = (u\\cos\\theta)\\hat{i} + 0\\hat{j}$. Thus, change in velocity $\\Delta\\vec{v} = \\vec{v} - \\vec{u} = -(u\\sin\\theta)\\hat{j}$. The magnitude is $|\\Delta\\vec{v}| = u\\sin\\theta$.'
  },
  {
    id: 'phy-a-02',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Laws of Motion & Friction',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'A block of mass $m = 2\\text{ kg}$ rests on a rough horizontal surface with coefficient of static friction $\\mu_s = 0.4$. A horizontal force $F = 6\\text{ N}$ is applied to the block. Taking $g = 10\\text{ m/s}^2$, the frictional force acting on the block is:',
    options: [
      '$8\\text{ N}$',
      '$6\\text{ N}$',
      '$0\\text{ N}$',
      '$2\\text{ N}$'
    ],
    correctAnswer: 1,
    explanation: 'Maximum static friction $f_{\\text{max}} = \\mu_s N = \\mu_s mg = 0.4 \\times 2 \\times 10 = 8\\text{ N}$. Since the applied force $F = 6\\text{ N} < f_{\\text{max}}$, the block remains at rest. By static equilibrium, the self-adjusting static friction equals the applied force: $f = F = 6\\text{ N}$.'
  },
  {
    id: 'phy-a-03',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Work, Energy & Power',
    difficulty: 'Easy',
    isSample: true,
    questionText: 'A particle moves along the $x$-axis from $x = 0$ to $x = 3\\text{ m}$ under the influence of a conservative force $F(x) = (6x^2 - 2x)\\text{ N}$. The work done by this force on the particle is:',
    options: [
      '$45\\text{ J}$',
      '$36\\text{ J}$',
      '$54\\text{ J}$',
      '$27\\text{ J}$'
    ],
    correctAnswer: 0,
    explanation: 'Work done $W = \\int_0^3 F(x)\\,dx = \\int_0^3 (6x^2 - 2x)\\,dx = \\left[2x^3 - x^2\\right]_0^3 = 2(27) - 9 = 54 - 9 = 45\\text{ J}$.'
  },
  {
    id: 'phy-a-04',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Rotational Motion',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'A solid sphere of mass $M$ and radius $R$ rolls without slipping down an inclined plane of inclination $\\theta$. The ratio of its rotational kinetic energy to its translational kinetic energy is:',
    options: [
      '$\\frac{2}{5}$',
      '$\\frac{5}{2}$',
      '$\\frac{2}{7}$',
      '$\\frac{1}{2}$'
    ],
    correctAnswer: 0,
    explanation: 'Rotational kinetic energy $K_{\\text{rot}} = \\frac{1}{2} I \\omega^2 = \\frac{1}{2}\\left(\\frac{2}{5}MR^2\\right)\\left(\\frac{v}{R}\\right)^2 = \\frac{1}{5} M v^2$. Translational kinetic energy $K_{\\text{trans}} = \\frac{1}{2} M v^2$. Ratio $\\frac{K_{\\text{rot}}}{K_{\\text{trans}}} = \\frac{\\frac{1}{5}}{\\frac{1}{2}} = \\frac{2}{5}$.'
  },
  {
    id: 'phy-a-05',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Gravitation',
    difficulty: 'Easy',
    isSample: true,
    questionText: 'The escape velocity from the surface of Earth is $v_e = 11.2\\text{ km/s}$. A planet has double the mass and double the radius of Earth. The escape velocity from the surface of this planet is:',
    options: [
      '$11.2\\text{ km/s}$',
      '$22.4\\text{ km/s}$',
      '$5.6\\text{ km/s}$',
      '$15.8\\text{ km/s}$'
    ],
    correctAnswer: 0,
    explanation: 'Escape velocity is given by $v_e = \\sqrt{\\frac{2GM}{R}}$. For the planet: $v\'_e = \\sqrt{\\frac{2G(2M)}{2R}} = \\sqrt{\\frac{2GM}{R}} = v_e = 11.2\\text{ km/s}$.'
  },
  {
    id: 'phy-a-06',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Fluid Mechanics',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'Two spherical raindrops of radii $r_1$ and $r_2$ fall through air with terminal velocities $v_1$ and $v_2$ respectively. If $r_1 : r_2 = 1 : 2$, the ratio $v_1 : v_2$ is:',
    options: [
      '$1 : 4$',
      '$1 : 2$',
      '$1 : 8$',
      '$1 : 16$'
    ],
    correctAnswer: 0,
    explanation: 'Terminal velocity of a spherical body falling in a viscous medium is $v_t = \\frac{2r^2(\\rho - \\sigma)g}{9\\eta}$, which gives $v_t \\propto r^2$. Therefore, $\\frac{v_1}{v_2} = \\left(\\frac{r_1}{r_2}\\right)^2 = \\left(\\frac{1}{2}\\right)^2 = 1 : 4$.'
  },
  {
    id: 'phy-a-07',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Thermodynamics',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'An ideal monoatomic gas undergoes an adiabatic expansion such that its volume becomes 8 times its initial volume. If its initial temperature was $T_1 = 400\\text{ K}$, its final temperature is:',
    options: [
      '$100\\text{ K}$',
      '$200\\text{ K}$',
      '$50\\text{ K}$',
      '$300\\text{ K}$'
    ],
    correctAnswer: 0,
    explanation: 'For an adiabatic process, $T V^{\\gamma - 1} = \\text{constant}$. For a monoatomic gas, $\\gamma = 5/3$, so $\\gamma - 1 = 2/3$. Thus $T_2 = T_1 \\left(\\frac{V_1}{V_2}\\right)^{2/3} = 400 \\left(\\frac{1}{8}\\right)^{2/3} = 400 \\times \\left(\\frac{1}{2}\\right)^2 = 400 \\times \\frac{1}{4} = 100\\text{ K}$.'
  },
  {
    id: 'phy-a-08',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Kinetic Theory of Gases',
    difficulty: 'Easy',
    isSample: true,
    questionText: 'At what temperature will the root mean square (rms) speed of oxygen molecules ($O_2$, molar mass $32\\text{ g/mol}$) be equal to the rms speed of hydrogen molecules ($H_2$, molar mass $2\\text{ g/mol}$) at $27^\\circ\\text{C}$?',
    options: [
      '$4800\\text{ K}$',
      '$4527\\text{ K}$',
      '$2400\\text{ K}$',
      '$3200\\text{ K}$'
    ],
    correctAnswer: 0,
    explanation: 'RMS speed $v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}$. For equality: $\\frac{T_{O_2}}{M_{O_2}} = \\frac{T_{H_2}}{M_{H_2}}$. With $T_{H_2} = 27 + 273 = 300\\text{ K}$: $T_{O_2} = 300 \\times \\frac{32}{2} = 300 \\times 16 = 4800\\text{ K}$.'
  },
  {
    id: 'phy-a-09',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Oscillations (SHM)',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'A particle executes linear SHM with amplitude $A$. At what displacement from the mean position is the potential energy equal to half of the kinetic energy?',
    options: [
      '$\\frac{A}{\\sqrt{3}}$',
      '$\\frac{A}{\\sqrt{2}}$',
      '$\\frac{A}{2}$',
      '$\\frac{\\sqrt{3}A}{2}$'
    ],
    correctAnswer: 0,
    explanation: 'Total energy $E = \\frac{1}{2}kA^2$. Potential energy $U = \\frac{1}{2}kx^2$, kinetic energy $K = E - U = \\frac{1}{2}k(A^2 - x^2)$. Given $U = \\frac{1}{2}K \\implies x^2 = \\frac{1}{2}(A^2 - x^2) \\implies 2x^2 = A^2 - x^2 \\implies 3x^2 = A^2 \\implies x = \\frac{A}{\\sqrt{3}}$.'
  },
  {
    id: 'phy-a-10',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Waves & Sound',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'A train moving at $20\\text{ m/s}$ towards a stationary observer blows a whistle of frequency $400\\text{ Hz}$. If speed of sound in air is $340\\text{ m/s}$, the apparent frequency heard by the observer is:',
    options: [
      '$425\\text{ Hz}$',
      '$420\\text{ Hz}$',
      '$377\\text{ Hz}$',
      '$440\\text{ Hz}$'
    ],
    correctAnswer: 0,
    explanation: 'By Doppler effect with source moving towards stationary observer: $f\' = f \\left(\\frac{v}{v - v_s}\\right) = 400 \\times \\left(\\frac{340}{340 - 20}\\right) = 400 \\times \\frac{340}{320} = 400 \\times 1.0625 = 425\\text{ Hz}$.'
  },
  {
    id: 'phy-a-11',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Electrostatics',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'An electric dipole with dipole moment $\\vec{p} = (2\\hat{i} + 3\\hat{j})\\times 10^{-29}\\text{ C}\\cdot\\text{m}$ is placed in a uniform electric field $\\vec{E} = (4\\hat{i})\\times 10^4\\text{ N/C}$. The torque acting on the dipole is:',
    options: [
      '$-12\\times 10^{-25}\\hat{k}\\text{ N}\\cdot\\text{m}$',
      '$12\\times 10^{-25}\\hat{k}\\text{ N}\\cdot\\text{m}$',
      '$-8\\times 10^{-25}\\hat{k}\\text{ N}\\cdot\\text{m}$',
      '$8\\times 10^{-25}\\hat{k}\\text{ N}\\cdot\\text{m}$'
    ],
    correctAnswer: 0,
    explanation: 'Torque $\\vec{\\tau} = \\vec{p} \\times \\vec{E} = [(2\\hat{i} + 3\\hat{j})\\times 10^{-29}] \\times [4\\hat{i}\\times 10^4] = 8(\\hat{i}\\times\\hat{i}) + 12(\\hat{j}\\times\\hat{i})\\times 10^{-25} = 0 - 12\\hat{k}\\times 10^{-25}\\text{ N}\\cdot\\text{m}$.'
  },
  {
    id: 'phy-a-12',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Current Electricity',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'A wire of resistance $16\\,\\Omega$ is uniformly stretched so that its length becomes twice its original length. If the density remains constant, the new resistance of the wire is:',
    options: [
      '$64\\,\\Omega$',
      '$32\\,\\Omega$',
      '$16\\,\\Omega$',
      '$8\\,\\Omega$'
    ],
    correctAnswer: 0,
    explanation: 'Resistance $R = \\rho \\frac{l}{A}$. Volume $V = A l$ is constant, so $A = V/l$, giving $R = \\rho \\frac{l^2}{V} \\propto l^2$. When length is doubled ($l\' = 2l$), $R\' = 2^2 \\times R = 4 \\times 16 = 64\\,\\Omega$.'
  },
  {
    id: 'phy-a-13',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Magnetic Effects of Current',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'A proton enters a uniform magnetic field $B$ perpendicular to its velocity with kinetic energy $K$. If an $\\alpha$-particle enters the same field with the same kinetic energy, the ratio of the radius of the circular path of the proton to that of the $\\alpha$-particle ($r_p : r_\\alpha$) is:',
    options: [
      '$1 : 1$',
      '$1 : 2$',
      '$2 : 1$',
      '$1 : \\sqrt{2}$'
    ],
    correctAnswer: 0,
    explanation: 'Radius in magnetic field $r = \\frac{p}{qB} = \\frac{\\sqrt{2mK}}{qB}$. Thus $r \\propto \\frac{\\sqrt{m}}{q}$. For proton: $m_p = m$, $q_p = e \\implies r_p \\propto \\frac{\\sqrt{m}}{e}$. For $\\alpha$-particle: $m_\\alpha = 4m$, $q_\\alpha = 2e \\implies r_\\alpha \\propto \\frac{\\sqrt{4m}}{2e} = \\frac{2\\sqrt{m}}{2e} = \\frac{\\sqrt{m}}{e}$. Hence $r_p : r_\\alpha = 1 : 1$.'
  },
  {
    id: 'phy-a-14',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Electromagnetic Induction',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'A conducting circular loop of radius $r = 0.1\\text{ m}$ and resistance $R = 2\\,\\Omega$ is placed in a uniform magnetic field perpendicular to its plane. The magnetic field changes according to $B(t) = (0.5t^2 + 2)\\text{ T}$. The induced current in the loop at $t = 2\\text{ s}$ is:',
    options: [
      '$0.0314\\text{ A}$',
      '$0.0628\\text{ A}$',
      '$0.1256\\text{ A}$',
      '$0.0157\\text{ A}$'
    ],
    correctAnswer: 0,
    explanation: 'Magnetic flux $\\Phi = B \\cdot A = B(\\pi r^2) = \\pi (0.1)^2 (0.5t^2 + 2) = 0.01\\pi (0.5t^2 + 2)$. Induced EMF $|\\mathcal{E}| = \\frac{d\\Phi}{dt} = 0.01\\pi (t)$. At $t = 2\\text{ s}$, $|\\mathcal{E}| = 0.02\\pi\\text{ V}$. Current $I = \\frac{\\mathcal{E}}{R} = \\frac{0.02\\pi}{2} = 0.01\\pi \\approx 0.0314\\text{ A}$.'
  },
  {
    id: 'phy-a-15',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Alternating Current',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'In a series $LCR$ circuit, $R = 10\\,\\Omega$, $L = 0.1\\text{ H}$, and $C = 10\\,\\mu\\text{F}$. The resonant angular frequency $\\omega_0$ and the Quality factor $Q$ of the circuit are respectively:',
    options: [
      '$1000\\text{ rad/s}, 10$',
      '$1000\\text{ rad/s}, 100$',
      '$500\\text{ rad/s}, 10$',
      '$2000\\text{ rad/s}, 20$'
    ],
    correctAnswer: 0,
    explanation: 'Resonant frequency $\\omega_0 = \\frac{1}{\\sqrt{LC}} = \\frac{1}{\\sqrt{0.1 \\times 10^{-5}}} = \\frac{1}{\\sqrt{10^{-6}}} = 1000\\text{ rad/s}$. Quality factor $Q = \\frac{\\omega_0 L}{R} = \\frac{1000 \\times 0.1}{10} = 10$.'
  },
  {
    id: 'phy-a-16',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Electromagnetic Waves',
    difficulty: 'Easy',
    isSample: true,
    questionText: 'In a plane electromagnetic wave travelling in free space, the peak value of electric field is $E_0 = 60\\text{ V/m}$. The peak value of the magnetic field $B_0$ is ($c = 3\\times 10^8\\text{ m/s}$):',
    options: [
      '$2 \\times 10^{-7}\\text{ T}$',
      '$1.8 \\times 10^{10}\\text{ T}$',
      '$5 \\times 10^{-7}\\text{ T}$',
      '$6 \\times 10^{-8}\\text{ T}$'
    ],
    correctAnswer: 0,
    explanation: 'Relation between electric and magnetic field amplitudes in an EM wave is $B_0 = \\frac{E_0}{c} = \\frac{60}{3\\times 10^8} = 2\\times 10^{-7}\\text{ T}$.'
  },
  {
    id: 'phy-a-17',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Ray Optics',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'A convex lens of focal length $f = 20\\text{ cm}$ in air (refractive index $\\mu_g = 1.5$) is completely immersed in water (refractive index $\\mu_w = 4/3$). Its new focal length in water is:',
    options: [
      '$80\\text{ cm}$',
      '$40\\text{ cm}$',
      '$20\\text{ cm}$',
      '$60\\text{ cm}$'
    ],
    correctAnswer: 0,
    explanation: 'By Lens Maker formula: $\\frac{1}{f_a} = (\\mu_g - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right) = (1.5 - 1)K = 0.5K$. In water: $\\frac{1}{f_w} = \\left(\\frac{\\mu_g}{\\mu_w} - 1\\right)K = \\left(\\frac{1.5}{4/3} - 1\\right)K = \\left(\\frac{9}{8} - 1\\right)K = \\frac{1}{8}K$. Dividing gives $\\frac{f_w}{f_a} = \\frac{0.5}{1/8} = 4 \\implies f_w = 4 \\times 20 = 80\\text{ cm}$.'
  },
  {
    id: 'phy-a-18',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Wave Optics',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'In Young’s double slit experiment, the slit separation is $d = 0.5\\text{ mm}$ and the distance of the screen from slits is $D = 1\\text{ m}$. If light of wavelength $\\lambda = 500\\text{ nm}$ is used, the fringe width $\\beta$ is:',
    options: [
      '$1.0\\text{ mm}$',
      '$0.5\\text{ mm}$',
      '$2.0\\text{ mm}$',
      '$0.25\\text{ mm}$'
    ],
    correctAnswer: 0,
    explanation: 'Fringe width $\\beta = \\frac{\\lambda D}{d} = \\frac{500 \\times 10^{-9} \\times 1}{0.5 \\times 10^{-3}} = 1000 \\times 10^{-6}\\text{ m} = 1.0\\text{ mm}$.'
  },
  {
    id: 'phy-a-19',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Dual Nature of Radiation',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'When radiation of wavelength $\\lambda$ falls on a metal surface, stopping potential is $3V_0$. When radiation of wavelength $2\\lambda$ is incident on the same surface, stopping potential is $V_0$. The threshold wavelength for the photoelectric effect of this metal is:',
    options: [
      '$4\\lambda$',
      '$3\\lambda$',
      '$2.5\\lambda$',
      '$5\\lambda$'
    ],
    correctAnswer: 0,
    explanation: 'From Einstein\'s photoelectric equation: $eV_0 = \\frac{hc}{2\\lambda} - W_0$ and $3eV_0 = \\frac{hc}{\\lambda} - W_0$. Multiplying the first equation by 3: $3eV_0 = \\frac{3hc}{2\\lambda} - 3W_0$. Equating gives $\\frac{hc}{\\lambda} - W_0 = \\frac{3hc}{2\\lambda} - 3W_0 \\implies 2W_0 = \\frac{hc}{2\\lambda} \\implies W_0 = \\frac{hc}{4\\lambda}$. Since $W_0 = \\frac{hc}{\\lambda_0}$, the threshold wavelength $\\lambda_0 = 4\\lambda$.'
  },
  {
    id: 'phy-a-20',
    subject: 'physics',
    section: 'A',
    type: 'mcq',
    topic: 'Semiconductors',
    difficulty: 'Easy',
    isSample: true,
    questionText: 'In an unbiased $p$-$n$ junction diode, the depletion region consists of:',
    options: [
      'Immobile positive and negative ions',
      'Free mobile electrons and holes only',
      'No charges of any kind',
      'Only donor impurity atoms'
    ],
    correctAnswer: 0,
    explanation: 'During the formation of a $p$-$n$ junction, diffusion of carriers leaves uncompensated immobile ionized donor impurities on the n-side and immobile ionized acceptor impurities on the p-side, forming the space charge / depletion layer.'
  },

  // ==========================================
  // PHYSICS - SECTION B (5 Numerical Questions)
  // ==========================================
  {
    id: 'phy-b-21',
    subject: 'physics',
    section: 'B',
    type: 'numerical',
    topic: 'Atomic Physics',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'The wavelength of the first line of the Lyman series for a hydrogen atom is $1215\\text{ \\AA}$. The wavelength of the first line of the Lyman series for a singly ionized helium ion ($\text{He}^+, Z = 2$) is $\\text{\\AA}$. (Give your answer rounded to the nearest integer)',
    correctAnswer: 304,
    acceptableRange: [303, 305],
    explanation: 'Wave number for hydrogen-like ions is $\\frac{1}{\\lambda} = R Z^2 \\left(\\frac{1}{1^2} - \\frac{1}{2^2}\\right)$. Hence $\\lambda \\propto \\frac{1}{Z^2}$. For $\\text{He}^+$, $Z = 2$: $\\lambda_{\\text{He}^+} = \\frac{\\lambda_H}{2^2} = \\frac{1215}{4} = 303.75\\text{ \\AA} \\approx 304\\text{ \\AA}$.'
  },
  {
    id: 'phy-b-22',
    subject: 'physics',
    section: 'B',
    type: 'numerical',
    topic: 'Nuclear Physics',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'A radioactive isotope has a half-life of 20 days. The time taken (in days) for its radioactive activity to reduce to $\\frac{1}{16}$ of its initial activity is:',
    correctAnswer: 80,
    acceptableRange: [80, 80],
    explanation: 'Fraction remaining $\\frac{N}{N_0} = \\left(\\frac{1}{2}\\right)^n$. Here $\\frac{1}{16} = \\left(\\frac{1}{2}\\right)^4$, which means $n = 4$ half-lives. Total time $t = n \\times T_{1/2} = 4 \\times 20 = 80\\text{ days}$.'
  },
  {
    id: 'phy-b-23',
    subject: 'physics',
    section: 'B',
    type: 'numerical',
    topic: 'Capacitance',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'A parallel plate capacitor with air between plates has a capacitance of $10\\,\\mu\\text{F}$. When a dielectric slab of dielectric constant $K = 5$ is introduced filling the entire space between the plates, and a potential difference of $20\\text{ V}$ is maintained across it, the electrostatic energy stored in the capacitor (in $\\text{mJ}$) is:',
    correctAnswer: 10,
    acceptableRange: [9.9, 10.1],
    explanation: 'New capacitance $C = K C_0 = 5 \\times 10\\,\\mu\\text{F} = 50\\,\\mu\\text{F}$. Stored energy $U = \\frac{1}{2} C V^2 = \\frac{1}{2} (50 \\times 10^{-6}\\text{ F}) (20\\text{ V})^2 = 25 \\times 10^{-6} \\times 400 = 10000 \\times 10^{-6}\\text{ J} = 10\\text{ mJ}$.'
  },
  {
    id: 'phy-b-24',
    subject: 'physics',
    section: 'B',
    type: 'numerical',
    topic: 'Current Electricity',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'In a meter bridge experiment, a null point is obtained at $40\\text{ cm}$ from the left end when a known resistance $S = 6\\,\\Omega$ is placed in the right gap. The value of unknown resistance $R$ in the left gap (in $\\Omega$) is:',
    correctAnswer: 4,
    acceptableRange: [4, 4],
    explanation: 'In balanced meter bridge condition: $\\frac{R}{S} = \\frac{l}{100 - l}$. With $l = 40\\text{ cm}$ and $S = 6\\,\\Omega$: $\\frac{R}{6} = \\frac{40}{60} = \\frac{2}{3} \\implies R = 6 \\times \\frac{2}{3} = 4\\,\\Omega$.'
  },
  {
    id: 'phy-b-25',
    subject: 'physics',
    section: 'B',
    type: 'numerical',
    topic: 'Units & Measurements',
    difficulty: 'Easy',
    isSample: true,
    questionText: 'The percentage errors in measurement of mass and speed of a body are $2\\%$ and $3\\%$ respectively. The maximum percentage error in the calculation of its kinetic energy is $\\%$.',
    correctAnswer: 8,
    acceptableRange: [8, 8],
    explanation: 'Kinetic energy $K = \\frac{1}{2} m v^2$. Maximum relative error $\\frac{\\Delta K}{K} = \\frac{\\Delta m}{m} + 2\\frac{\\Delta v}{v} = 2\\% + 2(3\\%) = 2\\% + 6\\% = 8\\%$.'
  },

  // ==========================================
  // CHEMISTRY - SECTION A (20 MCQs)
  // ==========================================
  {
    id: 'chem-a-01',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'Structure of Atom',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'The total number of radial nodes for a $4d$ orbital is:',
    options: [
      '1',
      '2',
      '3',
      '0'
    ],
    correctAnswer: 0,
    explanation: 'Number of radial nodes is given by the formula $n - l - 1$. For a $4d$ orbital, principal quantum number $n = 4$ and azimuthal quantum number $l = 2$. Therefore, radial nodes = $4 - 2 - 1 = 1$.'
  },
  {
    id: 'chem-a-02',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'Chemical Bonding & MOT',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'According to Molecular Orbital Theory (MOT), which of the following diatomic species is paramagnetic with a bond order of 2?',
    options: [
      '$O_2$',
      '$C_2$',
      '$N_2$',
      '$F_2$'
    ],
    correctAnswer: 0,
    explanation: 'For $O_2$ (16 electrons): configuration is $\\sigma 1s^2 \\sigma^* 1s^2 \\sigma 2s^2 \\sigma^* 2s^2 \\sigma 2p_z^2 (\\pi 2p_x^2 = \\pi 2p_y^2) (\\pi^* 2p_x^1 = \\pi^* 2p_y^1)$. Bond order $= \\frac{10 - 6}{2} = 2$, and the presence of two unpaired electrons in $\\pi^*$ antibonding orbitals makes it paramagnetic.'
  },
  {
    id: 'chem-a-03',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'Periodic Properties',
    difficulty: 'Easy',
    isSample: true,
    questionText: 'Which of the following elements has the most negative (highest magnitude) electron gain enthalpy?',
    options: [
      'Chlorine ($Cl$)',
      'Fluorine ($F$)',
      'Bromine ($Br$)',
      'Iodine ($I$)'
    ],
    correctAnswer: 0,
    explanation: 'Chlorine has the highest negative electron gain enthalpy ($-349\\text{ kJ/mol}$) among halogens because fluorine\'s very compact $2p$ subshell experiences significant inter-electronic repulsions when an extra electron enters.'
  },
  {
    id: 'chem-a-04',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'Thermodynamics',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'For a reversible process at equilibrium, the value of standard Gibbs free energy change $\\Delta G^\\circ$ is related to equilibrium constant $K$ by:',
    options: [
      '$\\Delta G^\\circ = -RT \\ln K$',
      '$\\Delta G^\\circ = RT \\ln K$',
      '$\\Delta G^\\circ = -\\frac{RT}{K}$',
      '$\\Delta G^\\circ = \\Delta H^\\circ + T\\Delta S^\\circ$'
    ],
    correctAnswer: 0,
    explanation: 'At equilibrium $\\Delta G = 0$. Since $\\Delta G = \\Delta G^\\circ + RT\\ln Q$ and at equilibrium $Q = K$, we have $0 = \\Delta G^\\circ + RT\\ln K \\implies \\Delta G^\\circ = -RT\\ln K$.'
  },
  {
    id: 'chem-a-05',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'Ionic Equilibrium',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'The solubility product of a sparingly soluble salt $AB_2$ is $K_{sp} = 3.2 \\times 10^{-11}$. Its molar solubility $S$ in pure water is:',
    options: [
      '$2.0 \\times 10^{-4}\\text{ M}$',
      '$4.0 \\times 10^{-4}\\text{ M}$',
      '$1.0 \\times 10^{-4}\\text{ M}$',
      '$5.6 \\times 10^{-6}\\text{ M}$'
    ],
    correctAnswer: 0,
    explanation: 'For $AB_2 \\rightleftharpoons A^{2+} + 2B^-$, $[A^{2+}] = S$, $[B^-] = 2S$. $K_{sp} = S(2S)^2 = 4S^3 = 3.2 \\times 10^{-11} \\implies S^3 = 8 \\times 10^{-12} \\implies S = 2.0 \\times 10^{-4}\\text{ mol/L}$.'
  },
  {
    id: 'chem-a-06',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'Electrochemistry',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'Given standard reduction potentials: $E^\\circ(Zn^{2+}/Zn) = -0.76\\text{ V}$ and $E^\\circ(Cu^{2+}/Cu) = +0.34\\text{ V}$. The standard EMF of the Daniell cell ($Zn | Zn^{2+} || Cu^{2+} | Cu$) is:',
    options: [
      '$+1.10\\text{ V}$',
      '$-1.10\\text{ V}$',
      '$+0.42\\text{ V}$',
      '$-0.42\\text{ V}$'
    ],
    correctAnswer: 0,
    explanation: '$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = E^\\circ(Cu^{2+}/Cu) - E^\\circ(Zn^{2+}/Zn) = 0.34 - (-0.76) = +1.10\\text{ V}$.'
  },
  {
    id: 'chem-a-07',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'Chemical Kinetics',
    difficulty: 'Easy',
    isSample: true,
    questionText: 'For a first order reaction, the time required for $99.9\\%$ completion of the reaction is approximately how many times the half-life ($t_{1/2}$)?',
    options: [
      '10 times',
      '3 times',
      '7 times',
      '5 times'
    ],
    correctAnswer: 0,
    explanation: '$t_{99.9\\%} = \\frac{2.303}{k}\\log\\left(\\frac{100}{100 - 99.9}\\right) = \\frac{2.303}{k}\\log(10^3) = \\frac{3 \\times 2.303}{k}$. Since $t_{1/2} = \\frac{0.693}{k} = \\frac{2.303 \\log 2}{k} = \\frac{2.303 \\times 0.301}{k}$, we get $\\frac{t_{99.9\\%}}{t_{1/2}} = \\frac{3}{0.301} \\approx 10$.'
  },
  {
    id: 'chem-a-08',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'Solutions',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'Which of the following $0.1\\text{ M}$ aqueous solutions will exhibit the lowest freezing point?',
    options: [
      '$Al_2(SO_4)_3$',
      '$NaCl$',
      '$BaCl_2$',
      'Glucose ($C_6H_{12}O_6$)'
    ],
    correctAnswer: 0,
    explanation: 'Depression in freezing point $\\Delta T_f = i K_f m$. The lowest freezing point corresponds to the maximum $\\Delta T_f$, i.e. maximum van \'t Hoff factor $i$. For $Al_2(SO_4)_3$, $i = 5$ ($2Al^{3+} + 3SO_4^{2-}$); for $BaCl_2$, $i = 3$; for $NaCl$, $i = 2$; for Glucose, $i = 1$.'
  },
  {
    id: 'chem-a-09',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'Coordination Chemistry',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'The geometry and hybridization of the central atom in $[Ni(CO)_4]$ and $[Ni(CN)_4]^{2-}$ are respectively:',
    options: [
      'Tetrahedral ($sp^3$) and Square planar ($dsp^2$)',
      'Square planar ($dsp^2$) and Tetrahedral ($sp^3$)',
      'Tetrahedral ($sp^3$) and Tetrahedral ($sp^3$)',
      'Octahedral ($sp^3d^2$) and Square planar ($dsp^2$)'
    ],
    correctAnswer: 0,
    explanation: 'In $[Ni(CO)_4]$, $Ni(0)$ has configuration $3d^8 4s^2$. Strong ligand $CO$ pairs electrons moving $4s$ electrons into $3d$, resulting in $3d^{10}$ and $sp^3$ tetrahedral geometry. In $[Ni(CN)_4]^{2-}$, $Ni^{2+}$ is $3d^8$, and strong field ligand $CN^-$ forces pairing within $3d$, leaving one inner $d$ orbital free for $dsp^2$ square planar geometry.'
  },
  {
    id: 'chem-a-10',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'd and f Block Elements',
    difficulty: 'Easy',
    isSample: true,
    questionText: 'The reason for the gradual decrease in ionic radii across the lanthanoid series (Lanthanoid Contraction) is:',
    options: [
      'Imperfect shielding of one $4f$ electron by another',
      'Effective shielding of nuclear charge by $5d$ electrons',
      'Increase in atomic mass without change in volume',
      'Decrease in nuclear charge across the series'
    ],
    correctAnswer: 0,
    explanation: 'The $4f$ electrons have poor diffused spatial shapes and provide poor shielding against the increasing positive nuclear charge. Consequently, the effective nuclear charge felt by outer electrons increases, pulling shells inward.'
  },
  {
    id: 'chem-a-11',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'p-Block Elements',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'In the structure of diborane ($B_2H_6$), the number of two-center two-electron ($2c-2e$) bonds and three-center two-electron ($3c-2e$) banana bonds are respectively:',
    options: [
      '4 and 2',
      '2 and 4',
      '6 and 0',
      '2 and 2'
    ],
    correctAnswer: 0,
    explanation: 'Diborane has 4 terminal $B-H$ bonds which are conventional $2c-2e$ covalent bonds, and 2 bridging $B-H-B$ hydrogen bonds which are electron-deficient $3c-2e$ banana bonds.'
  },
  {
    id: 'chem-a-12',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'Organic Reaction Mechanism',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'Which of the following alkyl halides undergoes $S_N1$ solvolysis at the fastest rate?',
    options: [
      'tert-Butyl bromide ($(CH_3)_3C-Br$)',
      'Isopropyl bromide ($(CH_3)_2CH-Br$)',
      'Ethyl bromide ($CH_3CH_2-Br$)',
      'Methyl bromide ($CH_3-Br$)'
    ],
    correctAnswer: 0,
    explanation: '$S_N1$ reaction rate is governed by carbocation stability. The tert-butyl cation $(CH_3)_3C^+$ is $3^\\circ$ and stabilized by 9 hyperconjugative $\\alpha$-hydrogens, making $(CH_3)_3C-Br$ the fastest to undergo unimolecular substitution.'
  },
  {
    id: 'chem-a-13',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'Hydrocarbons',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'Ozonolysis of an alkene produces acetone ($CH_3COCH_3$) and formaldehyde ($HCHO$). The IUPAC name of the starting alkene is:',
    options: [
      '2-Methylprop-1-ene',
      'But-2-ene',
      'But-1-ene',
      '2-Methylbut-2-ene'
    ],
    correctAnswer: 0,
    explanation: 'Recombining the carbonyl carbons: $(CH_3)_2C=O + O=CH_2 \\xrightarrow{-O} (CH_3)_2C=CH_2$. The compound is 2-methylprop-1-ene (isobutylene).'
  },
  {
    id: 'chem-a-14',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'Alcohols & Phenols',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'Phenol reacts with chloroform ($CHCl_3$) in the presence of aqueous $NaOH$ followed by acidification to produce salicylaldehyde. The electrophile involved in this Reimer-Tiemann reaction is:',
    options: [
      'Dichlorocarbene ($:CCl_2$)',
      'Trichloromethyl anion ($^-CCl_3$)',
      'Formyl cation ($^+CHO$)',
      'Chloromethyl cation ($^+CH_2Cl$)'
    ],
    correctAnswer: 0,
    explanation: 'In the Reimer-Tiemann reaction, hydroxide abstracts a proton from $CHCl_3$ to form $^-CCl_3$, which undergoes $\\alpha$-elimination of chloride ion to generate neutral, electron-deficient singlet dichlorocarbene ($:CCl_2$) as the attacking electrophile.'
  },
  {
    id: 'chem-a-15',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'Aldehydes & Ketones',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'Which of the following compounds does NOT undergo Aldol condensation in the presence of dilute aqueous base?',
    options: [
      'Benzaldehyde ($C_6H_5CHO$)',
      'Acetaldehyde ($CH_3CHO$)',
      'Propionaldehyde ($CH_3CH_2CHO$)',
      'Acetone ($CH_3COCH_3$)'
    ],
    correctAnswer: 0,
    explanation: 'Aldol condensation requires at least one acidic $\\alpha$-hydrogen adjacent to the carbonyl group. Benzaldehyde lacks any $\\alpha$-hydrogen atoms and instead undergoes the Cannizzaro reaction with concentrated alkali.'
  },
  {
    id: 'chem-a-16',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'Amines',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'When an aliphatic primary amine is heated with chloroform and alcoholic $KOH$, an extremely foul-smelling substance is produced. This reaction is known as:',
    options: [
      'Carbylamine reaction (Isocyanide test)',
      'Hoffmann bromamide degradation',
      'Gabriel phthalimide synthesis',
      'Sandmeyer reaction'
    ],
    correctAnswer: 0,
    explanation: 'The Carbylamine test ($R-NH_2 + CHCl_3 + 3KOH \\rightarrow R-NC + 3KCl + 3H_2O$) produces an alkyl isocyanide (carbylamine) with an intensely pungent, foul odor and is specific to primary amines.'
  },
  {
    id: 'chem-a-17',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'Biomolecules',
    difficulty: 'Easy',
    isSample: true,
    questionText: 'During the denaturation of a globular protein, which structural levels are disrupted while leaving the primary structure intact?',
    options: [
      'Secondary and tertiary structures',
      'Primary and secondary structures',
      'Primary, secondary and tertiary structures',
      'Only quaternary structure'
    ],
    correctAnswer: 0,
    explanation: 'Denaturation breaks weaker hydrogen bonds, ionic interactions, and hydrophobic interactions, uncoiling secondary, tertiary, and quaternary structures. Covalent peptide bonds linking the amino acid sequence (primary structure) remain intact.'
  },
  {
    id: 'chem-a-18',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'Purification & Characterization',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'In Kjeldahl’s method for estimation of nitrogen in an organic compound, nitrogen is converted quantitatively into:',
    options: [
      '$(NH_4)_2SO_4$',
      '$NH_3$ gas directly',
      '$NaNO_2$',
      '$N_2$ gas'
    ],
    correctAnswer: 0,
    explanation: 'In Kjeldahl\'s method, digestion of the organic compound with concentrated $H_2SO_4$ in the presence of $CuSO_4$ converts nitrogen present in the compound into ammonium sulphate ($(NH_4)_2SO_4$).'
  },
  {
    id: 'chem-a-19',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'Aromaticity',
    difficulty: 'Easy',
    isSample: true,
    questionText: 'According to Hückel\'s rule, a planar cyclic conjugated ring system is aromatic if it contains:',
    options: [
      '$(4n + 2)\\pi$ delocalized electrons',
      '$4n\\pi$ delocalized electrons',
      '$(2n + 1)\\pi$ delocalized electrons',
      '$(4n + 4)\\pi$ delocalized electrons'
    ],
    correctAnswer: 0,
    explanation: 'Hückel\'s rule specifies that planar, completely conjugated monocyclic ring systems possessing $(4n + 2)\\pi$ electrons (where $n = 0, 1, 2, \\dots$) have closed-shell electronic stability and are aromatic.'
  },
  {
    id: 'chem-a-20',
    subject: 'chemistry',
    section: 'A',
    type: 'mcq',
    topic: 'Chemical Equilibrium',
    difficulty: 'Easy',
    isSample: true,
    questionText: 'For the exothermic synthesis of ammonia $N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g) \\;(\\Delta H < 0)$, the yield of ammonia is favored by:',
    options: [
      'High pressure and low temperature',
      'Low pressure and high temperature',
      'High pressure and high temperature',
      'Low pressure and low temperature'
    ],
    correctAnswer: 0,
    explanation: 'Forward reaction is exothermic ($\Delta H < 0$), so lowering temperature shifts equilibrium forward (Le Chatelier). Forward reaction proceeds with a reduction in moles of gas ($4 \\rightarrow 2$), so increasing pressure shifts equilibrium towards fewer moles.'
  },

  // ==========================================
  // CHEMISTRY - SECTION B (5 Numerical Questions)
  // ==========================================
  {
    id: 'chem-b-21',
    subject: 'chemistry',
    section: 'B',
    type: 'numerical',
    topic: 'Basic Concepts of Chemistry',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'A solution of glucose ($C_6H_{12}O_6$, molar mass $180\\text{ g/mol}$) in water is prepared by dissolving $18\\text{ g}$ of glucose in $250\\text{ g}$ of water. The molality of the solution is $\\text{m}$. (Give answer as a decimal rounded to one decimal place, e.g. 0.4)',
    correctAnswer: 0.4,
    acceptableRange: [0.39, 0.41],
    explanation: 'Moles of glucose $= \\frac{18}{180} = 0.1\\text{ mol}$. Mass of solvent (water) $= 250\\text{ g} = 0.25\\text{ kg}$. Molality $m = \\frac{\\text{moles of solute}}{\\text{kg of solvent}} = \\frac{0.1}{0.25} = 0.4\\text{ m}$.'
  },
  {
    id: 'chem-b-22',
    subject: 'chemistry',
    section: 'B',
    type: 'numerical',
    topic: 'Coordination Chemistry',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'The spin-only magnetic moment of $[Mn(H_2O)_6]^{2+}$ (atomic number of $Mn = 25$) is $\\mu_{\\text{eff}} = \\sqrt{x}\\text{ BM}$. The value of integer $x$ is:',
    correctAnswer: 35,
    acceptableRange: [35, 35],
    explanation: 'Electronic configuration of $Mn^{2+}$ is $[Ar] 3d^5$. Since $H_2O$ is a weak field ligand, pairing does not occur, giving $n = 5$ unpaired electrons. $\\mu = \\sqrt{n(n+2)} = \\sqrt{5(7)} = \\sqrt{35}\\text{ BM}$. Hence $x = 35$.'
  },
  {
    id: 'chem-b-23',
    subject: 'chemistry',
    section: 'B',
    type: 'numerical',
    topic: 'Electrochemistry',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'How many Faradays ($F$) of electric charge are required to deposit $54\\text{ g}$ of aluminum ($Al$, molar mass $= 27\\text{ g/mol}$) from molten $Al_2O_3$?',
    correctAnswer: 6,
    acceptableRange: [6, 6],
    explanation: 'Reduction reaction is $Al^{3+} + 3e^- \\rightarrow Al$. 1 mole of $Al$ ($27\\text{ g}$) requires $3\\text{ F}$ of charge. Number of moles in $54\\text{ g} = \\frac{54}{27} = 2\\text{ mol}$. Charge required $= 2 \\times 3 = 6\\text{ F}$.'
  },
  {
    id: 'chem-b-24',
    subject: 'chemistry',
    section: 'B',
    type: 'numerical',
    topic: 'Chemical Kinetics',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'For a reaction $A + B \\rightarrow \\text{Products}$, doubling $[A]$ quadruples the rate, while doubling $[B]$ doubles the rate. The overall order of the reaction is:',
    correctAnswer: 3,
    acceptableRange: [3, 3],
    explanation: 'Rate law $r = k[A]^x [B]^y$. Doubling $[A]$ increases rate $2^x = 4 \\implies x = 2$. Doubling $[B]$ increases rate $2^y = 2 \\implies y = 1$. Overall order $= x + y = 2 + 1 = 3$.'
  },
  {
    id: 'chem-b-25',
    subject: 'chemistry',
    section: 'B',
    type: 'numerical',
    topic: 'Isomerism & Stereochemistry',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'Consider the molecule 2,3-dichlorobutane: $CH_3-CH(Cl)-CH(Cl)-CH_3$. The total number of stereoisomers (including enantiomers and meso forms) is:',
    correctAnswer: 3,
    acceptableRange: [3, 3],
    explanation: 'The molecule has $n = 2$ similar chiral carbon atoms. For symmetrical molecules with even $n$: number of optically active forms $a = 2^{n-1} = 2^{2-1} = 2$ (pair of enantiomers: $(2R,3R)$ and $(2S,3S)$), and number of meso forms $m = 2^{(n/2) - 1} = 2^0 = 1$ ($(2R,3S)$ meso). Total stereoisomers $= 2 + 1 = 3$.'
  },

  // ==========================================
  // MATHEMATICS - SECTION A (20 MCQs)
  // ==========================================
  {
    id: 'math-a-01',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Matrices & Determinants',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'If $A$ is an invertible square matrix of order $3 \\times 3$ such that $|A| = 4$, then the value of $|\\text{adj}(\\text{adj}(A))|$ is:',
    options: [
      '$256$',
      '$64$',
      '$16$',
      '$1024$'
    ],
    correctAnswer: 0,
    explanation: 'For any $n \\times n$ matrix $A$, $|\\text{adj}(\\text{adj}(A))| = |A|^{(n-1)^2}$. For $n = 3$, $(n-1)^2 = (2)^2 = 4$. Given $|A| = 4$, $|\\text{adj}(\\text{adj}(A))| = 4^4 = 256$.'
  },
  {
    id: 'math-a-02',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Limits & Calculus',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'The value of the limit $\\lim_{x \\to 0} \\left(\\frac{\\sin x}{x}\\right)^{1/x^2}$ is:',
    options: [
      '$e^{-1/6}$',
      '$e^{-1/3}$',
      '$e^{1/6}$',
      '$1$'
    ],
    correctAnswer: 0,
    explanation: 'This is in $1^\\infty$ indeterminate form. $\\lim_{x \\to 0} f(x)^{g(x)} = e^{\\lim_{x \\to 0} g(x)(f(x) - 1)}$. Here exponent $= \\lim_{x \\to 0} \\frac{\\frac{\\sin x}{x} - 1}{x^2} = \\lim_{x \\to 0} \\frac{\\sin x - x}{x^3}$. Using Maclaurin series $\\sin x = x - \\frac{x^3}{6} + O(x^5)$, we have $\\frac{-x^3/6}{x^3} = -\\frac{1}{6}$. Thus limit is $e^{-1/6}$.'
  },
  {
    id: 'math-a-03',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Definite Integrals',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'The value of the definite integral $I = \\int_0^{\\pi/2} \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}}\\,dx$ is:',
    options: [
      '$\\frac{\\pi}{4}$',
      '$\\frac{\\pi}{2}$',
      '$\\pi$',
      '$0$'
    ],
    correctAnswer: 0,
    explanation: 'Using the King\'s property $\\int_a^b f(x)\\,dx = \\int_a^b f(a+b-x)\\,dx$: $I = \\int_0^{\\pi/2} \\frac{\\sqrt{\\cos x}}{\\sqrt{\\cos x} + \\sqrt{\\sin x}}\\,dx$. Adding the two: $2I = \\int_0^{\\pi/2} 1\\,dx = \\frac{\\pi}{2} \\implies I = \\frac{\\pi}{4}$.'
  },
  {
    id: 'math-a-04',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Differential Equations',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'The integrating factor of the linear differential equation $\\frac{dy}{dx} + y \\tan x = \\sec x$ is:',
    options: [
      '$\\sec x$',
      '$\\cos x$',
      '$\\ln|\\sec x|$',
      '$e^{\\cos x}$'
    ],
    correctAnswer: 0,
    explanation: 'Equation is in standard form $\\frac{dy}{dx} + P(x)y = Q(x)$ where $P(x) = \\tan x$. Integrating factor $\\text{IF} = e^{\\int P(x)\\,dx} = e^{\\int \\tan x\\,dx} = e^{\\ln|\\sec x|} = \\sec x$.'
  },
  {
    id: 'math-a-05',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Vectors & 3D Geometry',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'If $\\vec{a} = 2\\hat{i} + \\hat{j} - \\hat{k}$ and $\\vec{b} = \\hat{i} - \\hat{j} + 2\\hat{k}$, the projection of vector $\\vec{a}$ along vector $\\vec{b}$ is:',
    options: [
      '$-\\frac{1}{\\sqrt{6}}$',
      '$\\frac{1}{\\sqrt{6}}$',
      '$-\\frac{1}{6}$',
      '$\\frac{3}{\\sqrt{6}}$'
    ],
    correctAnswer: 0,
    explanation: 'Projection of $\\vec{a}$ on $\\vec{b}$ is $\\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}$. Dot product $\\vec{a}\\cdot\\vec{b} = (2)(1) + (1)(-1) + (-1)(2) = 2 - 1 - 2 = -1$. Magnitude $|\\vec{b}| = \\sqrt{1^2 + (-1)^2 + 2^2} = \\sqrt{6}$. Hence projection is $-\\frac{1}{\\sqrt{6}}$.'
  },
  {
    id: 'math-a-06',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Probability',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'A bag contains 4 red and 6 black balls. Two balls are drawn successively without replacement. The probability that both balls are red is:',
    options: [
      '$\\frac{2}{15}$',
      '$\\frac{4}{25}$',
      '$\\frac{1}{5}$',
      '$\\frac{1}{3}$'
    ],
    correctAnswer: 0,
    explanation: '$P(\\text{both red}) = \\frac{{}^4C_2}{{}^{10}C_2} = \\frac{\\frac{4 \\times 3}{2}}{\\frac{10 \\times 9}{2}} = \\frac{6}{45} = \\frac{2}{15}$.'
  },
  {
    id: 'math-a-07',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Binomial Theorem',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'The coefficient of $x^4$ in the expansion of $\\left(x + \\frac{2}{x^2}\\right)^{10}$ is:',
    options: [
      '$180$',
      '$90$',
      '$45$',
      '$360$'
    ],
    correctAnswer: 0,
    explanation: 'General term $T_{r+1} = {}^{10}C_r x^{10-r} \\left(\\frac{2}{x^2}\\right)^r = {}^{10}C_r 2^r x^{10 - 3r}$. For exponent of $x$ to be 4: $10 - 3r = 4 \\implies 3r = 6 \\implies r = 2$. Coefficient $= {}^{10}C_2 2^2 = 45 \\times 4 = 180$.'
  },
  {
    id: 'math-a-08',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Complex Numbers',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'If $\\omega$ is a non-real complex cube root of unity, then the value of $(1 - \\omega + \\omega^2)(1 + \\omega - \\omega^2)$ is:',
    options: [
      '$4$',
      '$2$',
      '$-4$',
      '$0$'
    ],
    correctAnswer: 0,
    explanation: 'We know $1 + \\omega + \\omega^2 = 0 \\implies 1 + \\omega^2 = -\\omega$ and $1 + \\omega = -\\omega^2$. Then $(1 - \\omega + \\omega^2) = (-\\omega - \\omega) = -2\\omega$, and $(1 + \\omega - \\omega^2) = (-\\omega^2 - \\omega^2) = -2\\omega^2$. Product $= (-2\\omega)(-2\\omega^2) = 4\\omega^3 = 4(1) = 4$.'
  },
  {
    id: 'math-a-09',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Sequences & Series',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'If the sum of the first $n$ terms of an arithmetic progression is $S_n = 3n^2 + 5n$, then its $m$-th term $T_m$ is equal to 164 for $m = $:',
    options: [
      '$27$',
      '$26$',
      '$28$',
      '$25$'
    ],
    correctAnswer: 0,
    explanation: 'The $n$-th term $T_n = S_n - S_{n-1} = (3n^2 + 5n) - [3(n-1)^2 + 5(n-1)] = 6n + 2$. Setting $T_m = 6m + 2 = 164 \\implies 6m = 162 \\implies m = 27$.'
  },
  {
    id: 'math-a-10',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Coordinate Geometry (Conics)',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'The eccentricity of the hyperbola $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$ is:',
    options: [
      '$\\frac{5}{4}$',
      '$\\frac{4}{3}$',
      '$\\frac{5}{3}$',
      '$\\frac{\\sqrt{7}}{4}$'
    ],
    correctAnswer: 0,
    explanation: 'For a hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$, eccentricity $e = \\sqrt{1 + \\frac{b^2}{a^2}}$. Here $a^2 = 16, b^2 = 9$. Thus $e = \\sqrt{1 + \\frac{9}{16}} = \\sqrt{\\frac{25}{16}} = \\frac{5}{4}$.'
  },
  {
    id: 'math-a-11',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Straight Lines',
    difficulty: 'Easy',
    isSample: true,
    questionText: 'The distance between the parallel lines $3x + 4y - 9 = 0$ and $6x + 8y + 15 = 0$ is:',
    options: [
      '$\\frac{33}{10}$',
      '$\\frac{24}{5}$',
      '$\\frac{6}{5}$',
      '$\\frac{12}{5}$'
    ],
    correctAnswer: 0,
    explanation: 'Expressing both in identical coefficients: first line multiplied by 2 gives $6x + 8y - 18 = 0$. Distance $d = \\frac{|c_1 - c_2|}{\\sqrt{A^2 + B^2}} = \\frac{|15 - (-18)|}{\\sqrt{6^2 + 8^2}} = \\frac{33}{10}$.'
  },
  {
    id: 'math-a-12',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Circles',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'The length of the tangent drawn from the point $(4, 5)$ to the circle $x^2 + y^2 - 4x - 6y - 3 = 0$ is:',
    options: [
      '$\\sqrt{2}$',
      '$2$',
      '$\\sqrt{5}$',
      '$3$'
    ],
    correctAnswer: 0,
    explanation: 'Length of tangent from $(x_1, y_1)$ to circle $S = 0$ is $\\sqrt{S_1}$. Substituting $(4,5)$: $S_1 = 4^2 + 5^2 - 4(4) - 6(5) - 3 = 16 + 25 - 16 - 30 - 3 = 2$. Therefore length $L = \\sqrt{S_1} = \\sqrt{2}$.'
  },
  {
    id: 'math-a-13',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Application of Derivatives',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'The maximum value of the function $f(x) = x^3 - 3x + 2$ on the closed interval $[0, 2]$ is:',
    options: [
      '$4$',
      '$2$',
      '$0$',
      '$6$'
    ],
    correctAnswer: 0,
    explanation: 'Derivative $f\'(x) = 3x^2 - 3 = 3(x-1)(x+1)$. Critical points in $[0,2]$ is $x = 1$. Evaluating at boundaries and critical point: $f(0) = 2$, $f(1) = 1 - 3 + 2 = 0$, $f(2) = 8 - 6 + 2 = 4$. Maximum value is 4 (at $x = 2$).'
  },
  {
    id: 'math-a-14',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Inverse Trigonometry',
    difficulty: 'Easy',
    isSample: true,
    questionText: 'The principal value of $\\sin^{-1}\\left(\\sin\\frac{3\\pi}{4}\\right)$ is:',
    options: [
      '$\\frac{\\pi}{4}$',
      '$\\frac{3\\pi}{4}$',
      '$-\\frac{\\pi}{4}$',
      '$\\frac{5\\pi}{4}$'
    ],
    correctAnswer: 0,
    explanation: 'The principal branch of $\\sin^{-1} x$ is $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$. Since $\\frac{3\\pi}{4}$ lies in the second quadrant: $\\sin\\frac{3\\pi}{4} = \\sin\\left(\\pi - \\frac{\\pi}{4}\\right) = \\sin\\frac{\\pi}{4}$. Hence $\\sin^{-1}\\left(\\sin\\frac{3\\pi}{4}\\right) = \\frac{\\pi}{4}$.'
  },
  {
    id: 'math-a-15',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Statistics',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'If the variance of 10 observations $x_1, x_2, \\dots, x_{10}$ is $\\sigma^2 = 4$, and each observation is multiplied by $3$ and then increased by $2$, the new variance is:',
    options: [
      '$36$',
      '$38$',
      '$12$',
      '$14$'
    ],
    correctAnswer: 0,
    explanation: 'Variance is invariant under shift of origin and scales with the square of the scale factor: $\\text{Var}(ax + b) = a^2 \\text{Var}(x)$. With $a = 3$: $\\text{Var}(3x + 2) = 3^2 \\times 4 = 9 \\times 4 = 36$.'
  },
  {
    id: 'math-a-16',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Functions & Relations',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'The domain of the function $f(x) = \\sqrt{\\log_{10}\\left(\\frac{5x - x^2}{4}\\right)}$ is:',
    options: [
      '$[1, 4]$',
      '$(0, 5)$',
      '$[0, 5]$',
      '$(1, 4)$'
    ],
    correctAnswer: 0,
    explanation: 'For square root: $\\log_{10}\\left(\\frac{5x - x^2}{4}\\right) \\ge 0 \\implies \\frac{5x - x^2}{4} \\ge 1 \\implies 5x - x^2 \\ge 4 \\implies x^2 - 5x + 4 \\le 0 \\implies (x - 1)(x - 4) \\le 0 \\implies x \\in [1, 4]$. Also $\\frac{5x - x^2}{4} > 0$ holds strictly on $[1, 4]$.'
  },
  {
    id: 'math-a-17',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Permutations & Combinations',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'The number of 4-digit numbers that can be formed using digits $0, 1, 2, 3, 4, 5$ without repetition that are divisible by 5 is:',
    options: [
      '$108$',
      '$120$',
      '$96$',
      '$84$'
    ],
    correctAnswer: 0,
    explanation: 'A number is divisible by 5 if units digit is 0 or 5. Case 1: Units digit is 0. Thousands place has 5 choices ($1-5$), hundreds has 4 choices, tens has 3 choices: $5 \\times 4 \\times 3 = 60$. Case 2: Units digit is 5. Thousands place cannot be 0, so choices are $\{1,2,3,4\}$ (4 choices). Hundreds place has 4 choices (including 0), tens has 3 choices: $4 \\times 4 \\times 3 = 48$. Total $= 60 + 48 = 108$.'
  },
  {
    id: 'math-a-18',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: '3D Geometry',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'The equation of the plane passing through the point $(1, 2, 3)$ and parallel to the plane $2x + 3y - 4z + 7 = 0$ is:',
    options: [
      '$2x + 3y - 4z + 4 = 0$',
      '$2x + 3y - 4z - 4 = 0$',
      '$2x + 3y - 4z + 8 = 0$',
      '$2x + 3y - 4z - 8 = 0$'
    ],
    correctAnswer: 0,
    explanation: 'Parallel plane has the form $2x + 3y - 4z + d = 0$. Since it passes through $(1, 2, 3)$: $2(1) + 3(2) - 4(3) + d = 0 \\implies 2 + 6 - 12 + d = 0 \\implies -4 + d = 0 \\implies d = 4$. Equation is $2x + 3y - 4z + 4 = 0$.'
  },
  {
    id: 'math-a-19',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Differential Calculus',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'If $y = (\\tan x)^x$, then the value of $\\frac{dy}{dx}$ at $x = \\frac{\\pi}{4}$ is:',
    options: [
      '$2$',
      '$1$',
      '$\\frac{\\pi}{2}$',
      '$4$'
    ],
    correctAnswer: 0,
    explanation: 'Taking logarithm: $\\ln y = x \\ln(\\tan x)$. Differentiating: $\\frac{1}{y}\\frac{dy}{dx} = \\ln(\\tan x) + x \\cdot \\frac{1}{\\tan x} \\cdot \\sec^2 x$. At $x = \\frac{\\pi}{4}$, $\\tan(\\pi/4) = 1 \\implies \\ln 1 = 0$, $y = 1^{\\pi/4} = 1$, and $\\sec^2(\\pi/4) = 2$. Thus $\\left.\\frac{dy}{dx}\\right|_{x=\\pi/4} = 1 \\cdot \\left[0 + \\frac{\\pi}{4} \\cdot \\frac{1}{1} \\cdot 2\\right] = \\frac{\\pi}{2} \\dots$ wait, let\'s check: $x \\frac{\\sec^2 x}{\\tan x} = \\frac{\\pi}{4} \\times 2 = \\frac{\\pi}{2}$. Option C is $\\pi/2$, but let us verify if option C or A was set. Let us set correct index to 2 if $\\pi/2$ or let\'s check options.'
  },
  {
    id: 'math-a-20',
    subject: 'mathematics',
    section: 'A',
    type: 'mcq',
    topic: 'Quadratic Equations',
    difficulty: 'Easy',
    isSample: true,
    questionText: 'If $\\alpha$ and $\\beta$ are the roots of the quadratic equation $x^2 - 5x + 6 = 0$, then the value of $\\alpha^3 + \\beta^3$ is:',
    options: [
      '$35$',
      '$65$',
      '$45$',
      '$25$'
    ],
    correctAnswer: 0,
    explanation: 'Sum of roots $\\alpha + \\beta = 5$, product of roots $\\alpha\\beta = 6$. Using the algebraic identity: $\\alpha^3 + \\beta^3 = (\\alpha + \\beta)^3 - 3\\alpha\\beta(\\alpha + \\beta) = 5^3 - 3(6)(5) = 125 - 90 = 35$.'
  },

  // ==========================================
  // MATHEMATICS - SECTION B (5 Numerical Questions)
  // ==========================================
  {
    id: 'math-b-21',
    subject: 'mathematics',
    section: 'B',
    type: 'numerical',
    topic: 'Definite Integrals',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'The value of the definite integral $\\int_{-2}^{2} (x^3 + 3x^2 + 5x + 2)\\,dx$ is equal to:',
    correctAnswer: 24,
    acceptableRange: [24, 24],
    explanation: 'By properties of definite integrals over $[-a, a]$, odd functions $x^3$ and $5x$ integrate to zero. Even terms give $\\int_{-2}^{2} (3x^2 + 2)\\,dx = 2 \\int_0^2 (3x^2 + 2)\\,dx = 2 \\left[x^3 + 2x\\right]_0^2 = 2(8 + 4) = 2(12) = 24$.'
  },
  {
    id: 'math-b-22',
    subject: 'mathematics',
    section: 'B',
    type: 'numerical',
    topic: 'Vectors',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'If the vectors $\\vec{a} = 2\\hat{i} - \\hat{j} + \\hat{k}$, $\\vec{b} = \\hat{i} + 2\\hat{j} - 3\\hat{k}$, and $\\vec{c} = 3\\hat{i} + \\lambda\\hat{j} + 5\\hat{k}$ are coplanar, then the value of $\\lambda$ is:',
    correctAnswer: -4,
    acceptableRange: [-4, -4],
    explanation: 'For coplanar vectors, scalar triple product is zero: $\\begin{vmatrix} 2 & -1 & 1 \\\\ 1 & 2 & -3 \\\\ 3 & \\lambda & 5 \\end{vmatrix} = 0$. Expanding: $2(10 + 3\\lambda) - (-1)(5 - (-9)) + 1(\\lambda - 6) = 0 \\implies 20 + 6\\lambda + 14 + \\lambda - 6 = 0 \\implies 7\\lambda + 28 = 0 \\implies \\lambda = -4$.'
  },
  {
    id: 'math-b-23',
    subject: 'mathematics',
    section: 'B',
    type: 'numerical',
    topic: 'Binomial Theorem',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'The term independent of $x$ in the binomial expansion of $\\left(2x + \\frac{1}{3x^2}\\right)^9$ has coefficient $\\frac{N}{81}$. The value of integer $N$ is:',
    correctAnswer: 5376,
    acceptableRange: [5376, 5376],
    explanation: 'General term $T_{r+1} = {}^9C_r (2x)^{9-r} \\left(\\frac{1}{3x^2}\\right)^r = {}^9C_r 2^{9-r} 3^{-r} x^{9 - 3r}$. For independent term: $9 - 3r = 0 \\implies r = 3$. Value is ${}^9C_3 2^6 \\frac{1}{3^3} = 84 \\times 64 \\times \\frac{1}{27} = \\frac{5376}{27}$. To match denominator of 81: $\\frac{5376 \\times 3}{81} = \\frac{16128}{81}$ or let us check: ${}^9C_3 = \\frac{9 \\times 8 \\times 7}{6} = 84$. $84 \\times 64 / 27 = 5376/27 = 16128/81$. Let us rewrite the question to directly ask for the integer value of ${}^9C_3 \\times 2^6 / 27$ rounded or exact value.'
  },
  {
    id: 'math-b-24',
    subject: 'mathematics',
    section: 'B',
    type: 'numerical',
    topic: 'Differential Calculus',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'The slope of the tangent to the curve $x^2 + 2xy - 3y^2 = 0$ at the point $(1, 1)$ is:',
    correctAnswer: 1,
    acceptableRange: [1, 1],
    explanation: 'Differentiating implicitly with respect to $x$: $2x + 2\\left(y + x\\frac{dy}{dx}\\right) - 6y\\frac{dy}{dx} = 0$. At $(1, 1)$: $2 + 2\\left(1 + \\frac{dy}{dx}\\right) - 6\\frac{dy}{dx} = 0 \\implies 4 - 4\\frac{dy}{dx} = 0 \\implies \\frac{dy}{dx} = 1$.'
  },
  {
    id: 'math-b-25',
    subject: 'mathematics',
    section: 'B',
    type: 'numerical',
    topic: 'Matrices',
    difficulty: 'Moderate',
    isSample: true,
    questionText: 'If $A = \\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\end{bmatrix}$, then the sum of all elements of the matrix $A^{10}$ is:',
    correctAnswer: 13,
    acceptableRange: [13, 13],
    explanation: 'By induction: $A^2 = \\begin{bmatrix} 1 & 0 \\\\ 2 & 1 \\end{bmatrix}$, $A^n = \\begin{bmatrix} 1 & 0 \\\\ n & 1 \\end{bmatrix}$. For $n = 10$, $A^{10} = \\begin{bmatrix} 1 & 0 \\\\ 10 & 1 \\end{bmatrix}$. The sum of all elements is $1 + 0 + 10 + 1 = 13$.'
  }
];

// Fix math-b-23 clean integer question
const targetQ23 = RAW_QUESTION_BANK.find(q => q.id === 'math-b-23');
if (targetQ23) {
  targetQ23.questionText = 'The term independent of $x$ in the binomial expansion of $\\left(x^2 - \\frac{1}{x}\\right)^6$ is equal to:';
  targetQ23.correctAnswer = 15;
  targetQ23.acceptableRange = [15, 15];
  targetQ23.explanation = 'General term $T_{r+1} = {}^6C_r (x^2)^{6-r} (-x^{-1})^r = {}^6C_r (-1)^r x^{12 - 3r}$. For term independent of $x$: $12 - 3r = 0 \\implies r = 4$. Thus $T_5 = {}^6C_4 (-1)^4 = \\frac{6 \\times 5}{2} = 15$.';
}

// Fix math-a-19 option/answer consistency
const targetQ19 = RAW_QUESTION_BANK.find(q => q.id === 'math-a-19');
if (targetQ19) {
  targetQ19.options = [
    '$\\frac{\\pi}{2}$',
    '$2$',
    '$1$',
    '$4$'
  ];
  targetQ19.correctAnswer = 0;
  targetQ19.explanation = 'Taking logarithm: $\\ln y = x \\ln(\\tan x)$. Differentiating: $\\frac{1}{y}\\frac{dy}{dx} = \\ln(\\tan x) + x \\frac{\\sec^2 x}{\\tan x}$. At $x = \\frac{\\pi}{4}$: $\\tan(\\pi/4) = 1 \\implies \\ln 1 = 0$, $y = 1^{\\pi/4} = 1$, and $\\frac{\\sec^2(\\pi/4)}{\\tan(\\pi/4)} = \\frac{2}{1} = 2$. Thus $\\frac{dy}{dx} = 1 \\cdot \\left[0 + \\frac{\\pi}{4} \\times 2\\right] = \\frac{\\pi}{2}$.';
}

/**
 * Helper to build an exam question set based on preset or custom config
 */
export function getTestQuestions(presetId = 'full-mock-1', customConfig = null) {
  const preset = TEST_PRESETS.find(p => p.id === presetId) || TEST_PRESETS[0];

  let questions = [];

  if (preset.filterCount) {
    // Subject sprint
    for (const sub of preset.subjects) {
      const subQs = RAW_QUESTION_BANK.filter(q => q.subject === sub);
      const count = preset.filterCount[sub] || 5;
      questions.push(...subQs.slice(0, count));
    }
  } else if (preset.subjects.length === 1) {
    // Subject specific test
    questions = RAW_QUESTION_BANK.filter(q => q.subject === preset.subjects[0]);
  } else {
    // Full mock test
    questions = [...RAW_QUESTION_BANK];
  }

  return {
    preset,
    questions,
    totalQuestions: questions.length,
    durationMinutes: preset.durationMinutes
  };
}
