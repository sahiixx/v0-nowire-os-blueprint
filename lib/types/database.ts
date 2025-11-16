// Database type definitions for Nowhere OS

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  workspace_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: 'free' | 'pro' | 'business' | 'enterprise';
  settings: WorkspaceSettings;
  created_at: Date;
  updated_at: Date;
}

export interface WorkspaceSettings {
  timezone: string;
  currency: string;
  language: string;
  ai_enabled: boolean;
  ai_approval_required: boolean;
}

export interface Contact {
  id: string;
  workspace_id: string;
  email: string;
  name: string;
  phone?: string;
  company?: string;
  title?: string;
  status: 'lead' | 'prospect' | 'customer' | 'churned';
  tags: string[];
  custom_fields: Record<string, any>;
  created_at: Date;
  updated_at: Date;
  last_contacted_at?: Date;
}

export interface Deal {
  id: string;
  workspace_id: string;
  contact_id: string;
  title: string;
  value: number;
  currency: string;
  stage: 'discovery' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  probability: number;
  expected_close_date?: Date;
  owner_id: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Automation {
  id: string;
  workspace_id: string;
  name: string;
  description?: string;
  trigger: AutomationTrigger;
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  enabled: boolean;
  last_run_at?: Date;
  run_count: number;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface AutomationTrigger {
  type: 'scheduled' | 'crm_event' | 'form_submission' | 'manual' | 'file_upload';
  config: Record<string, any>;
}

export interface AutomationCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  value: any;
}

export interface AutomationAction {
  type: 'send_email' | 'update_crm' | 'run_ai_task' | 'tag_contact' | 'notify_team';
  config: Record<string, any>;
  requires_approval: boolean;
}

export interface Task {
  id: string;
  workspace_id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to?: string;
  contact_id?: string;
  deal_id?: string;
  due_date?: Date;
  completed_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface File {
  id: string;
  workspace_id: string;
  name: string;
  path: string;
  size: number;
  mime_type: string;
  uploaded_by: string;
  tags: string[];
  metadata: Record<string, any>;
  created_at: Date;
}

export interface KnowledgeBaseDoc {
  id: string;
  workspace_id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  embedding_id?: string;
  published: boolean;
  views: number;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface AgentHistory {
  id: string;
  workspace_id: string;
  agent_type: 'marketing' | 'sales' | 'crm' | 'content' | 'support' | 'financial' | 'operations';
  task: string;
  input: Record<string, any>;
  output: Record<string, any>;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'requires_approval';
  approved_by?: string;
  approved_at?: Date;
  execution_time_ms: number;
  created_at: Date;
}

export interface AnalyticsEvent {
  id: string;
  workspace_id: string;
  event_type: string;
  entity_type: 'contact' | 'deal' | 'task' | 'automation' | 'agent' | 'campaign';
  entity_id: string;
  properties: Record<string, any>;
  user_id?: string;
  timestamp: Date;
}

export interface Campaign {
  id: string;
  workspace_id: string;
  name: string;
  type: 'email' | 'social' | 'content' | 'ads';
  status: 'draft' | 'scheduled' | 'running' | 'paused' | 'completed';
  target_audience: string[];
  content: Record<string, any>;
  metrics: CampaignMetrics;
  scheduled_at?: Date;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface CampaignMetrics {
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
  revenue: number;
}

export interface Ticket {
  id: string;
  workspace_id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  contact_id: string;
  assigned_to?: string;
  tags: string[];
  created_at: Date;
  updated_at: Date;
  resolved_at?: Date;
}
