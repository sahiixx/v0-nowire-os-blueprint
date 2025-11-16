// Navigation structure for Nowhere OS

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    title: 'AI Agents',
    href: '/agents',
    icon: 'Bot',
    children: [
      { title: 'All Agents', href: '/agents', icon: 'Bot' },
      { title: 'Marketing Agent', href: '/agents/marketing', icon: 'Megaphone' },
      { title: 'Sales Agent', href: '/agents/sales', icon: 'TrendingUp' },
      { title: 'Support Agent', href: '/agents/support', icon: 'Headphones' },
      { title: 'History', href: '/agents/history', icon: 'History' },
    ],
  },
  {
    title: 'CRM',
    href: '/crm',
    icon: 'Users',
    children: [
      { title: 'Contacts', href: '/crm/contacts', icon: 'User' },
      { title: 'Companies', href: '/crm/companies', icon: 'Building2' },
      { title: 'Deals', href: '/crm/deals', icon: 'Briefcase' },
      { title: 'Pipeline', href: '/crm/pipeline', icon: 'GitBranch' },
    ],
  },
  {
    title: 'Automation',
    href: '/automation',
    icon: 'Workflow',
  },
  {
    title: 'Marketing',
    href: '/marketing',
    icon: 'Megaphone',
    children: [
      { title: 'Campaigns', href: '/marketing/campaigns', icon: 'Target' },
      { title: 'Email', href: '/marketing/email', icon: 'Mail' },
      { title: 'Social', href: '/marketing/social', icon: 'Share2' },
      { title: 'Content', href: '/marketing/content', icon: 'FileText' },
    ],
  },
  {
    title: 'Sales',
    href: '/sales',
    icon: 'TrendingUp',
    children: [
      { title: 'Workspace', href: '/sales', icon: 'Briefcase' },
      { title: 'Proposals', href: '/sales/proposals', icon: 'FileText' },
      { title: 'Quotes', href: '/sales/quotes', icon: 'Receipt' },
    ],
  },
  {
    title: 'Support',
    href: '/support',
    icon: 'Headphones',
    children: [
      { title: 'Tickets', href: '/support/tickets', icon: 'Ticket' },
      { title: 'Knowledge Base', href: '/support/kb', icon: 'BookOpen' },
    ],
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: 'BarChart3',
  },
  {
    title: 'Files',
    href: '/files',
    icon: 'FolderOpen',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: 'Settings',
  },
];
