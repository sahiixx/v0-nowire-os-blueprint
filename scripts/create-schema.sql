-- Nowhere OS Database Schema
-- PostgreSQL 15+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Workspaces table
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  plan VARCHAR(50) NOT NULL DEFAULT 'free',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar TEXT,
  role VARCHAR(50) NOT NULL DEFAULT 'member',
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Contacts table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  title VARCHAR(255),
  status VARCHAR(50) DEFAULT 'lead',
  tags TEXT[],
  custom_fields JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_contacted_at TIMESTAMP
);

-- Deals table
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  value DECIMAL(15, 2) NOT NULL DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'USD',
  stage VARCHAR(50) NOT NULL DEFAULT 'discovery',
  probability INTEGER DEFAULT 0,
  expected_close_date DATE,
  owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Automations table
CREATE TABLE automations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  trigger JSONB NOT NULL,
  conditions JSONB DEFAULT '[]',
  actions JSONB NOT NULL,
  enabled BOOLEAN DEFAULT true,
  last_run_at TIMESTAMP,
  run_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'todo',
  priority VARCHAR(50) DEFAULT 'medium',
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
  deal_id UUID REFERENCES deals(id) ON DELETE SET NULL,
  due_date TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Files table
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  path TEXT NOT NULL,
  size BIGINT NOT NULL,
  mime_type VARCHAR(255) NOT NULL,
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  tags TEXT[],
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Knowledge base documents table
CREATE TABLE knowledge_base_docs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100),
  tags TEXT[],
  embedding_id TEXT,
  published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Agent histories table
CREATE TABLE agent_histories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  agent_type VARCHAR(50) NOT NULL,
  task VARCHAR(255) NOT NULL,
  input JSONB NOT NULL,
  output JSONB,
  status VARCHAR(50) DEFAULT 'pending',
  approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
  approved_at TIMESTAMP,
  execution_time_ms INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Analytics events table
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  event_type VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  properties JSONB DEFAULT '{}',
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Campaigns table
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  target_audience TEXT[],
  content JSONB DEFAULT '{}',
  metrics JSONB DEFAULT '{}',
  scheduled_at TIMESTAMP,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tickets table
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'open',
  priority VARCHAR(50) DEFAULT 'medium',
  contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_users_workspace ON users(workspace_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_contacts_workspace ON contacts(workspace_id);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_deals_workspace ON deals(workspace_id);
CREATE INDEX idx_deals_contact ON deals(contact_id);
CREATE INDEX idx_tasks_workspace ON tasks(workspace_id);
CREATE INDEX idx_tasks_assigned ON tasks(assigned_to);
CREATE INDEX idx_files_workspace ON files(workspace_id);
CREATE INDEX idx_agent_histories_workspace ON agent_histories(workspace_id);
CREATE INDEX idx_analytics_workspace ON analytics_events(workspace_id);
CREATE INDEX idx_analytics_timestamp ON analytics_events(timestamp);
CREATE INDEX idx_campaigns_workspace ON campaigns(workspace_id);
CREATE INDEX idx_tickets_workspace ON tickets(workspace_id);
CREATE INDEX idx_tickets_contact ON tickets(contact_id);
