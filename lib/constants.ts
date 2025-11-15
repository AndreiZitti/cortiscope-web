// Hero Section
export const HERO = {
  headline: "Fast, Transparent Brain Tumor AI for Any Hospital",
  subheadline: "Runs locally. Results you can trust.",
  stats: [
    { icon: "🔒", value: "No Cloud Upload" },
    { icon: "⚡", value: "30K Parameters" },
    { icon: "✓", value: "100% Explainable" },
    { icon: "⏱️", value: "5-Second Analysis" },
  ],
  cta: {
    primary: "Try It Out",
    secondary: "Contact Us",
  },
};

// Problem Section
export const PROBLEMS = [
  {
    title: "Too Expensive",
    description: "Current medical AI requires GPU clusters hospitals can't afford.",
  },
  {
    title: "Can't Be Verified",
    description: "Black-box models clinicians can't audit or explain to patients.",
  },
  {
    title: "Slow & Invasive",
    description: "Takes months to deploy, requires uploading patient data to the cloud.",
  },
];

// Comparison Section
export const COMPARISON = {
  title: "Why NosoScan Is Different",
  rows: [
    {
      feature: "Parameters",
      traditional: "Millions of parameters",
      nososcan: "30,000 parameters",
    },
    {
      feature: "Hardware",
      traditional: "GPU clusters required",
      nososcan: "Runs on hospital laptops",
    },
    {
      feature: "Transparency",
      traditional: "Black box decisions",
      nososcan: "Fully traceable pathways",
    },
    {
      feature: "Training Time",
      traditional: "Months to train",
      nososcan: "Days to deploy",
    },
    {
      feature: "Cost",
      traditional: "$$$$ compute infrastructure",
      nososcan: "$ CPU-only deployment",
    },
  ],
};

// Why NosoScan Works Section
export const WHY_IT_WORKS = {
  headline: "Why NosoScan Works",
  subheadline: "The three-pillar methodology enables efficiency + accuracy",
  parts: [
    {
      title: "Biology guides",
      description: "Built-in anatomical knowledge ensures realistic, biologically-plausible results. The model understands tissue structure and organ relationships.",
    },
    {
      title: "Physics informs",
      description: "Mathematical rules and physical principles guide the model's predictions, ensuring outputs that obey natural laws and constraints.",
    },
    {
      title: "AI supports",
      description: "Neural networks process medical scans with speed and precision, combining learned patterns with biological and physical constraints.",
    },
  ],
  result: "Result: 30K parameters, not millions. Accuracy without bloat.",
  videoCaption: "Biology-guided segmentation in action",
};

// Built for Trust Section
export const BUILT_FOR_TRUST = {
  title: "Built for Trust",
  subheadline: "Transparency and explainability by design",
  features: [
    {
      title: "Every decision pathway is visible",
      description: "No hidden layers, no mystery—see exactly how the model reaches its conclusions.",
    },
    {
      title: "Clinicians can audit the reasoning",
      description: "Medical professionals can review and validate the AI's diagnostic process.",
    },
    {
      title: "Regulators can verify the logic",
      description: "Built for regulatory approval with complete traceability and documentation.",
    },
    {
      title: "No black box mystery",
      description: "While competitors optimize for performance alone, we optimize for trust.",
    },
  ],
};

// Use Cases Section
export const USE_CASES = {
  title: "Where NosoScan Works",
  cases: [
    {
      title: "Tumor Monitoring in Oncology",
      description: "Volumetric tumor segmentation measures total volume and subregions (necrosis, enhancing core). Supports longitudinal care, dose adjustments, and therapy response prediction.",
    },
    {
      title: "Clinical Trials & Research",
      description: "Highly efficient model works consistently across imaging centers. Reduces manual annotation burden and bias in multi-site studies. Explainability aids regulatory approval.",
    },
    {
      title: "Pre-Surgical Planning",
      description: "High anatomical accuracy produces exportable 3D models. Integrates with surgical navigation tools for precise planning.",
    },
    {
      title: "Resource-Limited / Field Deployment",
      description: "Runs on CPU-only edge devices (Raspberry Pi, Jetson). Brings morphological diagnostics to settings where full radiology infrastructure isn't available.",
    },
  ],
};

// Stats Section
export const STATS_SECTION = {
  title: "By The Numbers",
  stats: [
    { value: "70%", label: "Reduction in training time" },
    { value: "30,000", label: "Parameters (vs millions)" },
    { value: "60 kB", label: "Model size" },
    { value: "100%", label: "Decision traceability" },
    { value: "$35", label: "Works on Raspberry Pi hardware" },
  ],
};

// Solution Cards
export const SOLUTIONS = [
  {
    title: "Tiny & Efficient",
    description: "Runs on standard laptops, no GPU needed.",
  },
  {
    title: "Fully Explainable",
    description: "Every decision traceable, auditable.",
  },
  {
    title: "Instant & On-Premise",
    description: "Download and use immediately, patient data never leaves.",
  },
];

// CTA Section
export const CTA_SECTION = {
  headline: "Ready to Deploy Real Medical AI?",
  paths: [
    {
      title: "For Hospitals",
      description: "See how NosoScan can work in your imaging workflow and resource constraints.",
      cta: "Schedule Demo",
    },
    {
      title: "For Hardware Partners",
      description: "Discuss integration opportunities and edge deployment strategies.",
      cta: "Partner With Us",
    },
  ],
  form: {
    fields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "organization", label: "Organization", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "message", label: "Message", type: "textarea", required: false },
    ],
  },
};

// Footer
export const FOOTER = {
  copyright: "© 2024 Cortiscope. All rights reserved.",
  links: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
};
