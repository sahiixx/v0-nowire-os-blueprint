// AI Agent configurations for Nowhere OS

export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  requiresApproval: boolean;
  maxExecutionTime: number;
  rateLimit: {
    requests: number;
    period: 'minute' | 'hour' | 'day';
  };
}

export const AI_AGENTS: Record<string, AgentConfig> = {
  marketing: {
    id: 'marketing',
    name: 'Marketing Agent',
    description: 'Helps create marketing content, analyze campaigns, and optimize strategies',
    capabilities: [
      'Generate email copy',
      'Create social media posts',
      'Analyze campaign performance',
      'Suggest audience segments',
      'Optimize ad spend',
      'Generate content ideas',
    ],
    requiresApproval: true,
    maxExecutionTime: 30000,
    rateLimit: {
      requests: 20,
      period: 'hour',
    },
  },
  sales: {
    id: 'sales',
    name: 'Sales Agent',
    description: 'Assists with sales processes, proposal generation, and deal insights',
    capabilities: [
      'Generate proposals',
      'Analyze deal pipeline',
      'Suggest next actions',
      'Create follow-up emails',
      'Identify upsell opportunities',
      'Forecast revenue',
    ],
    requiresApproval: true,
    maxExecutionTime: 30000,
    rateLimit: {
      requests: 15,
      period: 'hour',
    },
  },
  crm: {
    id: 'crm',
    name: 'CRM Agent',
    description: 'Manages contact data, enrichment, and relationship insights',
    capabilities: [
      'Enrich contact data',
      'Identify duplicate contacts',
      'Suggest contact tags',
      'Analyze relationship health',
      'Generate contact summaries',
      'Update contact fields',
    ],
    requiresApproval: false,
    maxExecutionTime: 20000,
    rateLimit: {
      requests: 30,
      period: 'hour',
    },
  },
  content: {
    id: 'content',
    name: 'Content Agent',
    description: 'Creates and optimizes content across various formats',
    capabilities: [
      'Write blog posts',
      'Generate social captions',
      'Create documentation',
      'Summarize documents',
      'Improve copy',
      'Generate headlines',
    ],
    requiresApproval: true,
    maxExecutionTime: 45000,
    rateLimit: {
      requests: 10,
      period: 'hour',
    },
  },
  support: {
    id: 'support',
    name: 'Support Agent',
    description: 'Provides customer support assistance and knowledge base management',
    capabilities: [
      'Draft support responses',
      'Search knowledge base',
      'Suggest solutions',
      'Analyze ticket patterns',
      'Generate help articles',
      'Prioritize tickets',
    ],
    requiresApproval: false,
    maxExecutionTime: 25000,
    rateLimit: {
      requests: 50,
      period: 'hour',
    },
  },
  financial: {
    id: 'financial',
    name: 'Financial Analysis Agent',
    description: 'Analyzes financial data and provides business insights',
    capabilities: [
      'Analyze revenue trends',
      'Calculate metrics',
      'Generate financial reports',
      'Identify cost patterns',
      'Forecast revenue',
      'Compare periods',
    ],
    requiresApproval: true,
    maxExecutionTime: 40000,
    rateLimit: {
      requests: 10,
      period: 'hour',
    },
  },
  operations: {
    id: 'operations',
    name: 'Operations Agent',
    description: 'Optimizes workflows and operational processes',
    capabilities: [
      'Analyze workflow efficiency',
      'Suggest process improvements',
      'Identify bottlenecks',
      'Generate automation ideas',
      'Create task lists',
      'Optimize resource allocation',
    ],
    requiresApproval: true,
    maxExecutionTime: 35000,
    rateLimit: {
      requests: 15,
      period: 'hour',
    },
  },
};

export const AI_SAFETY_RULES = [
  'All external actions require human approval',
  'No autonomous financial transactions',
  'No infrastructure modifications',
  'All actions are logged and auditable',
  'Rate limits enforced per agent type',
  'Input validation on all requests',
  'No self-modifying behavior',
  'Timeout protection on all operations',
];
