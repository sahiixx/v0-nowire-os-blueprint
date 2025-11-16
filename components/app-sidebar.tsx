"use client"

import * as React from "react"
import { LayoutDashboard, Bot, Users, Workflow, Megaphone, TrendingUp, Headphones, BarChart3, FolderOpen, Settings, User, Building2, Briefcase, GitBranch, Target, Mail, Share2, FileText, Receipt, Ticket, BookOpen, History, ChevronRight } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Link from "next/link"
import { usePathname } from 'next/navigation'

const iconMap = {
  LayoutDashboard,
  Bot,
  Users,
  Workflow,
  Megaphone,
  TrendingUp,
  Headphones,
  BarChart3,
  FolderOpen,
  Settings,
  User,
  Building2,
  Briefcase,
  GitBranch,
  Target,
  Mail,
  Share2,
  FileText,
  Receipt,
  Ticket,
  BookOpen,
  History,
}

interface NavItem {
  title: string
  href: string
  icon: keyof typeof iconMap
  badge?: string
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    title: "AI Agents",
    href: "/agents",
    icon: "Bot",
    children: [
      { title: "All Agents", href: "/agents", icon: "Bot" },
      { title: "Marketing Agent", href: "/agents/marketing", icon: "Megaphone" },
      { title: "Sales Agent", href: "/agents/sales", icon: "TrendingUp" },
      { title: "Support Agent", href: "/agents/support", icon: "Headphones" },
      { title: "History", href: "/agents/history", icon: "History" },
    ],
  },
  {
    title: "CRM",
    href: "/crm",
    icon: "Users",
    children: [
      { title: "Contacts", href: "/crm/contacts", icon: "User" },
      { title: "Companies", href: "/crm/companies", icon: "Building2" },
      { title: "Deals", href: "/crm/deals", icon: "Briefcase" },
      { title: "Pipeline", href: "/crm/pipeline", icon: "GitBranch" },
    ],
  },
  {
    title: "Automation",
    href: "/automation",
    icon: "Workflow",
  },
  {
    title: "Marketing",
    href: "/marketing",
    icon: "Megaphone",
    children: [
      { title: "Campaigns", href: "/marketing/campaigns", icon: "Target" },
      { title: "Email", href: "/marketing/email", icon: "Mail" },
      { title: "Social", href: "/marketing/social", icon: "Share2" },
      { title: "Content", href: "/marketing/content", icon: "FileText" },
    ],
  },
  {
    title: "Sales",
    href: "/sales",
    icon: "TrendingUp",
    children: [
      { title: "Workspace", href: "/sales", icon: "Briefcase" },
      { title: "Proposals", href: "/sales/proposals", icon: "FileText" },
      { title: "Quotes", href: "/sales/quotes", icon: "Receipt" },
    ],
  },
  {
    title: "Support",
    href: "/support",
    icon: "Headphones",
    children: [
      { title: "Tickets", href: "/support/tickets", icon: "Ticket" },
      { title: "Knowledge Base", href: "/support/kb", icon: "BookOpen" },
    ],
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: "BarChart3",
  },
  {
    title: "Files",
    href: "/files",
    icon: "FolderOpen",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "Settings",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Nowhere OS</span>
            <span className="text-xs text-muted-foreground">Demo Workspace</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = iconMap[item.icon]
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")

                if (item.children) {
                  return (
                    <Collapsible key={item.title} asChild defaultOpen={isActive}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton isActive={isActive}>
                            <Icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.children.map((child) => {
                              const ChildIcon = iconMap[child.icon]
                              const isChildActive = pathname === child.href
                              return (
                                <SidebarMenuSubItem key={child.title}>
                                  <SidebarMenuSubButton asChild isActive={isChildActive}>
                                    <Link href={child.href}>
                                      <ChildIcon className="h-4 w-4" />
                                      <span>{child.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              )
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
