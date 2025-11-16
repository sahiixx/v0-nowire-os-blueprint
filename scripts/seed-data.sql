-- Seed data for Nowhere OS development

-- Insert demo workspace
INSERT INTO workspaces (id, name, slug, plan, settings) VALUES
('00000000-0000-0000-0000-000000000001', 'Demo Workspace', 'demo-workspace', 'business', 
 '{"timezone": "America/New_York", "currency": "USD", "language": "en", "ai_enabled": true, "ai_approval_required": true}');

-- Insert demo users
INSERT INTO users (id, email, name, role, workspace_id) VALUES
('00000000-0000-0000-0000-000000000011', 'admin@example.com', 'Admin User', 'admin', '00000000-0000-0000-0000-000000000001'),
('00000000-0000-0000-0000-000000000012', 'sales@example.com', 'Sales Rep', 'member', '00000000-0000-0000-0000-000000000001'),
('00000000-0000-0000-0000-000000000013', 'support@example.com', 'Support Agent', 'member', '00000000-0000-0000-0000-000000000001');

-- Insert demo contacts
INSERT INTO contacts (workspace_id, email, name, phone, company, title, status, tags) VALUES
('00000000-0000-0000-0000-000000000001', 'john@techcorp.com', 'John Smith', '+1-555-0101', 'TechCorp Inc', 'CTO', 'customer', ARRAY['enterprise', 'vip']),
('00000000-0000-0000-0000-000000000001', 'sarah@startup.io', 'Sarah Johnson', '+1-555-0102', 'Startup.io', 'CEO', 'prospect', ARRAY['startup', 'hot-lead']),
('00000000-0000-0000-0000-000000000001', 'mike@agency.com', 'Mike Davis', '+1-555-0103', 'Creative Agency', 'Marketing Director', 'lead', ARRAY['marketing']),
('00000000-0000-0000-0000-000000000001', 'lisa@enterprise.com', 'Lisa Chen', '+1-555-0104', 'Enterprise Solutions', 'VP Sales', 'customer', ARRAY['enterprise']),
('00000000-0000-0000-0000-000000000001', 'david@growth.co', 'David Wilson', '+1-555-0105', 'Growth Co', 'Founder', 'prospect', ARRAY['startup']);

-- Insert demo deals
INSERT INTO deals (workspace_id, contact_id, title, value, stage, probability, expected_close_date, owner_id, notes) VALUES
('00000000-0000-0000-0000-000000000001', 
 (SELECT id FROM contacts WHERE email = 'john@techcorp.com'), 
 'Enterprise Platform Upgrade', 50000, 'negotiation', 75, CURRENT_DATE + INTERVAL '30 days',
 '00000000-0000-0000-0000-000000000012', 'High-value enterprise deal, needs executive approval'),
('00000000-0000-0000-0000-000000000001',
 (SELECT id FROM contacts WHERE email = 'sarah@startup.io'),
 'Startup Package', 12000, 'proposal', 50, CURRENT_DATE + INTERVAL '14 days',
 '00000000-0000-0000-0000-000000000012', 'Fast-moving startup, price-sensitive'),
('00000000-0000-0000-0000-000000000001',
 (SELECT id FROM contacts WHERE email = 'mike@agency.com'),
 'Marketing Suite', 8500, 'discovery', 25, CURRENT_DATE + INTERVAL '60 days',
 '00000000-0000-0000-0000-000000000012', 'Still evaluating competitors');

-- Insert demo tasks
INSERT INTO tasks (workspace_id, title, description, status, priority, assigned_to, due_date) VALUES
('00000000-0000-0000-0000-000000000001', 'Follow up with TechCorp', 'Send proposal and schedule demo', 'in_progress', 'high',
 '00000000-0000-0000-0000-000000000012', CURRENT_DATE + INTERVAL '2 days'),
('00000000-0000-0000-0000-000000000001', 'Prepare Q1 marketing campaign', 'Design email templates and landing pages', 'todo', 'medium',
 '00000000-0000-0000-0000-000000000012', CURRENT_DATE + INTERVAL '7 days'),
('00000000-0000-0000-0000-000000000001', 'Update CRM documentation', 'Add new feature guides to knowledge base', 'todo', 'low',
 '00000000-0000-0000-0000-000000000013', CURRENT_DATE + INTERVAL '14 days');

-- Insert demo campaigns
INSERT INTO campaigns (workspace_id, name, type, status, target_audience, metrics, created_by) VALUES
('00000000-0000-0000-0000-000000000001', 'Q1 Product Launch', 'email', 'running', 
 ARRAY['enterprise', 'vip'], 
 '{"sent": 1250, "opened": 425, "clicked": 87, "converted": 12, "revenue": 48000}',
 '00000000-0000-0000-0000-000000000012'),
('00000000-0000-0000-0000-000000000001', 'Spring Promotion', 'social', 'scheduled',
 ARRAY['startup', 'hot-lead'],
 '{"sent": 0, "opened": 0, "clicked": 0, "converted": 0, "revenue": 0}',
 '00000000-0000-0000-0000-000000000012');

-- Insert demo tickets
INSERT INTO tickets (workspace_id, subject, description, status, priority, contact_id, assigned_to) VALUES
('00000000-0000-0000-0000-000000000001', 'Integration issue with Slack', 
 'Unable to connect Slack workspace for notifications', 'in_progress', 'high',
 (SELECT id FROM contacts WHERE email = 'john@techcorp.com'),
 '00000000-0000-0000-0000-000000000013'),
('00000000-0000-0000-0000-000000000001', 'Feature request: Custom fields',
 'Would like to add custom fields to contact records', 'open', 'medium',
 (SELECT id FROM contacts WHERE email = 'sarah@startup.io'),
 '00000000-0000-0000-0000-000000000013');

-- Insert demo knowledge base docs
INSERT INTO knowledge_base_docs (workspace_id, title, content, category, tags, published, created_by) VALUES
('00000000-0000-0000-0000-000000000001', 'Getting Started with Nowhere OS',
 'Welcome to Nowhere OS! This guide will help you get started with your AI Business Operating System...', 
 'Getting Started', ARRAY['onboarding', 'basics'], true, '00000000-0000-0000-0000-000000000011'),
('00000000-0000-0000-0000-000000000001', 'How to Create Automations',
 'Automations help you streamline repetitive tasks. Here''s how to build your first automation...', 
 'Automation', ARRAY['automation', 'tutorial'], true, '00000000-0000-0000-0000-000000000011'),
('00000000-0000-0000-0000-000000000001', 'AI Agents Overview',
 'Learn about the different AI agents available in Nowhere OS and how to use them safely...', 
 'AI Agents', ARRAY['ai', 'agents', 'overview'], true, '00000000-0000-0000-0000-000000000011');
