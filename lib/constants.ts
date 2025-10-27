// Hero Section
export const HERO = {
  headline: "Stop Infections Before They Spread",
  subheadline: "Cortiscope uses biologically-aware AI to predict and prevent hospital-acquired infections in real-time.",
  stats: [
    { value: "99.6%", label: "Accuracy" },
    { value: "3 Days", label: "Early Warning" },
    { value: "40%", label: "Reduced HAIs" },
    { value: "24/7", label: "Monitoring" },
  ],
  cta: {
    primary: "Request Demo",
    secondary: "Learn More",
  },
};

// Problem Section
export const PROBLEMS = [
  {
    title: "Reactive, Not Proactive",
    description: "Traditional surveillance systems only detect infections after they've already spread, leaving hospitals constantly playing catch-up.",
  },
  {
    title: "Data Blind Spots",
    description: "Most systems miss 60% of infection patterns by ignoring the biological and physical reality of how pathogens actually move through hospitals.",
  },
  {
    title: "False Alarm Fatigue",
    description: "Alert systems overwhelm staff with false positives, causing real threats to be missed in the noise.",
  },
];

// Comparison Section
export const COMPARISON = {
  title: "Why Traditional Systems Fail",
  rows: [
    {
      feature: "Detection Speed",
      traditional: "5-7 days after symptom onset",
      nososcan: "3 days before clinical symptoms",
    },
    {
      feature: "Accuracy",
      traditional: "70-80% (high false positive rate)",
      nososcan: "99.6% prediction accuracy",
    },
    {
      feature: "Approach",
      traditional: "Reactive - waits for lab results",
      nososcan: "Proactive - predicts transmission",
    },
    {
      feature: "Pathogen Coverage",
      traditional: "Limited to tested organisms",
      nososcan: "Universal - all pathogens",
    },
    {
      feature: "Integration",
      traditional: "Manual data entry, siloed systems",
      nososcan: "Automatic EMR integration",
    },
  ],
};

// Biologically Aware Section
export const BIOLOGICALLY_AWARE = {
  headline: "The First Biologically-Aware Infection Surveillance System",
  parts: [
    {
      title: "Biology",
      description: "We model how pathogens actually behave - their growth rates, colonization patterns, and transmission dynamics based on real microbiology, not just data correlations.",
    },
    {
      title: "Physics",
      description: "Infections spread through physical space. We map patient movements, staff workflows, and environmental factors to understand the actual transmission pathways in your facility.",
    },
    {
      title: "AI",
      description: "Our neural networks don't just find patterns - they understand causation. The system learns the unique ecology of your hospital while respecting universal biological laws.",
    },
  ],
};

// Technology Section
export const TECHNOLOGY = {
  title: "How NosoScan Works",
  features: [
    {
      title: "Continuous EMR Integration",
      description: "Seamlessly pulls data from your existing electronic medical records in real-time, no manual entry required.",
    },
    {
      title: "Physics-Based Transmission Modeling",
      description: "Maps patient movements, staff workflows, and environmental factors to model actual transmission pathways.",
    },
    {
      title: "Predictive Risk Scoring",
      description: "Every patient receives a dynamic risk score that updates continuously as conditions change.",
    },
    {
      title: "Automated Alert System",
      description: "Intelligent notifications go directly to infection prevention teams with specific, actionable recommendations.",
    },
    {
      title: "Outcome Tracking & Analytics",
      description: "Track the impact of interventions and generate compliance reports automatically.",
    },
  ],
};

// Use Cases Section
export const USE_CASES = {
  title: "Built for Every Department",
  cases: [
    {
      title: "Intensive Care Units",
      description: "Monitor the highest-risk patients with real-time surveillance that predicts ventilator-associated pneumonia, central line infections, and multi-drug resistant organisms before they manifest.",
    },
    {
      title: "Surgical Units",
      description: "Reduce surgical site infections by identifying pre-operative colonization risks and tracking post-operative wound healing patterns.",
    },
    {
      title: "Long-Term Care Facilities",
      description: "Protect vulnerable populations by detecting C. difficile transmission chains and preventing outbreaks before they spread through units.",
    },
    {
      title: "Emergency Departments",
      description: "Screen incoming patients for colonization risks and optimize bed placement to minimize transmission during high-census periods.",
    },
  ],
};

// Stats Section
export const STATS_SECTION = {
  title: "Proven Results Across Healthcare Systems",
  stats: [
    { value: "40%", label: "Reduction in HAIs" },
    { value: "99.6%", label: "Prediction Accuracy" },
    { value: "3 Days", label: "Early Warning Time" },
    { value: "$2.8M", label: "Avg. Annual Savings" },
    { value: "15 Min", label: "Setup Time" },
  ],
};

// CTA Section
export const CTA_SECTION = {
  headline: "Ready to Stop Infections Before They Start?",
  paths: [
    {
      title: "For Hospitals & Health Systems",
      description: "Schedule a personalized demo to see NosoScan in action with your data.",
      cta: "Request Demo",
    },
    {
      title: "For Research & Implementation Partners",
      description: "Join us in revolutionizing infection prevention through biologically-aware AI.",
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
