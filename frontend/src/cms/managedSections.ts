import type {
  ComparisonTableContent,
  FoundationContent,
  GovernLayersContent,
  IntroVideoContent,
  PainPoint,
  TrustedByContent,
} from "../types";

export interface ServiceOffering {
  title: string;
  description: string;
}

export const cmsDefaults = {
  painPoints: [
    {
      icon: "ML",
      title: "Disconnected ML Tools",
      description: "Too many vendors, no seamless integration.",
      color: "#f97316",
    },
    {
      icon: "AU",
      title: "Lack of Auditing",
      description: "Unable to prove compliance to stakeholders.",
      color: "#0ea5e9",
    },
    {
      icon: "RG",
      title: "Regulatory Risks",
      description: "Changing laws mean constant overhead without automation.",
      color: "#ec4899",
    },
  ] satisfies PainPoint[],

  services: [
    {
      title: "Implementation Planning",
      description:
        "End-to-end support for rolling out automated AI controls without disrupting engineering speed.",
    },
    {
      title: "Compliance Auditing",
      description:
        "Expert guidance mapping your AI infrastructure directly against regulatory frameworks like the EU AI Act.",
    },
    {
      title: "Custom Integrations",
      description: "Building dedicated connectors for obscure legacy tools into the Thndr platform.",
    },
  ] satisfies ServiceOffering[],

  comparisonTable: {
    ourFeatures: [
      "Automated Mapping",
      "Real-time Monitoring",
      "Unified Dashboard",
      "API-first Integration",
      "Proactive Alerts",
    ],
    legacyFeatures: [
      "Manual Tracking",
      "Periodic Audits",
      "Fragmented Tools",
      "Siloed Systems",
      "Reactive Fixes",
    ],
    rows: [
      { feature: "Compliance Mapping", us: true, them: false },
      { feature: "Audit Readiness", us: true, them: false },
      { feature: "Model Monitoring", us: true, them: false },
      { feature: "Policy Enforcement", us: true, them: false },
      { feature: "Role-based Access", us: true, them: true },
    ],
  } satisfies ComparisonTableContent,

  foundation: {
    title: "The complete foundation for AI governance",
    subtitle: "Eliminate fragmentation, establish trust, and scale AI with automation.",
    ctaLabel: "Book a Demo",
    pillars: [
      {
        title: "Unified",
        description: "Eliminate fragmented AI oversight across tools, teams, and vendors.",
        icon: "UN",
        color: "#00d4aa",
        features: [
          "300+ integrations",
          "Vendor- and environment-agnostic",
          "Central AI governance registry",
        ],
      },
      {
        title: "Trusted AI",
        description: "Deploy AI with confidence across the organization and ecosystem.",
        icon: "TR",
        color: "#a855f7",
        features: [
          "Continuous security, compliance, risk monitoring",
          "Organization-wide interpretability and transparency",
          "Centralized internal and external AI risk oversight",
        ],
      },
      {
        title: "Automated",
        description: "Reduce manual governance effort while accelerating compliant AI development.",
        icon: "AU",
        color: "#3b82f6",
        features: [
          "Automated enforcement, reporting, auditing",
          "AI governance workflows automated",
          "Faster AI development with governance controls",
        ],
      },
    ],
  } satisfies FoundationContent,

  governLayers: {
    title: "Govern Every Layer of Your AI Stack",
    subtitle:
      "From data to models to deployment and autonomous systems, Thndr AI provides end-to-end governance across your entire AI lifecycle.",
    layers: [
      {
        id: "data",
        label: "Data Governance",
        title: "Data Governance",
        subtitle: "Build AI on trusted, compliant data.",
        description: "Ensure visibility, control, and accountability from data ingestion to model input.",
        features: [
          "Data sourcing, ownership, and cataloging",
          "Privacy-preserving transformations and lineage",
          "Automated compliance checks and audits",
          "Access control and consent management",
        ],
      },
      {
        id: "model",
        label: "AI Model Governance",
        title: "AI Model Governance",
        subtitle: "Govern models throughout their lifecycle.",
        description: "Track, validate, and control AI models from development to deployment.",
        features: [
          "Model registry and version control",
          "Bias detection and fairness monitoring",
          "Performance tracking and drift detection",
          "Model documentation and explainability",
        ],
      },
      {
        id: "deployment",
        label: "Deployment Governance",
        title: "Deployment Governance",
        subtitle: "Control what gets deployed and where.",
        description: "Automate deployment policies and enforce governance gates.",
        features: [
          "Deployment approval workflows",
          "Environment-specific policies",
          "Rollback and incident management",
          "Continuous monitoring in production",
        ],
      },
      {
        id: "agent",
        label: "Agent Governance",
        title: "Agent Governance",
        subtitle: "Govern autonomous AI agents at scale.",
        description: "Monitor and control AI agents, their actions, and permissions.",
        features: [
          "Agent behavior monitoring",
          "Permission and scope management",
          "Action logging and audit trails",
          "Safety guardrails and constraints",
        ],
      },
    ],
  } satisfies GovernLayersContent,

  introVideo: {
    label: "INTRODUCING THNDR AI",
    title: "A Unified Approach to AI Governance",
    subtitle:
      "Thndr AI connects your existing AI infrastructure and automates governance across models, agents, and environments.",
    videoUrl: "",
    fallbackText: "Watch How Thndr AI Works",
  } satisfies IntroVideoContent,

  trustedBy: {
    label: "Trusted by AI-Driven Teams",
    logos: [
      { name: "Commonwealth", text: "COMMONWEALTH GROUP" },
      { name: "Apple", text: "APPLE" },
      { name: "CVS Health", text: "CVS HEALTH" },
      { name: "Amazon", text: "AMAZON" },
      { name: "McKesson", text: "MCKESSON" },
      { name: "Cencora", text: "CENCORA" },
    ],
  } satisfies TrustedByContent,
};

export type ManagedCmsSection = keyof typeof cmsDefaults;

export const managedSectionMeta: Record<ManagedCmsSection, { title: string; description: string }> = {
  painPoints: {
    title: "Pain Points",
    description: "Cards in the The Fragmentation Problem section.",
  },
  services: {
    title: "Services",
    description: "Professional Services cards in the Enterprise Services section.",
  },
  comparisonTable: {
    title: "Comparison Table",
    description: "Rows and feature lists in the Why Modern Enterprises Choose Thndr section.",
  },
  foundation: {
    title: "Foundation",
    description: "Cards and copy in the complete foundation section.",
  },
  governLayers: {
    title: "Govern Layers",
    description: "Tabs and panel content in the AI stack governance section.",
  },
  introVideo: {
    title: "Intro Video",
    description: "Headline and optional video URL for the intro media section.",
  },
  trustedBy: {
    title: "Trusted By",
    description: "Logo label and partner names shown beneath hero.",
  },
};
