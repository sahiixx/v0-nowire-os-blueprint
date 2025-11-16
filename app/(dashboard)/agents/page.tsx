import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, Megaphone, TrendingUp, Headphones, FileText, DollarSign, Workflow, ArrowRight, Zap, Shield, Clock } from 'lucide-react'
import Link from "next/link"

const agents = [
  {
    id: "marketing",
    name: "Marketing Agent",
    description: "Create marketing content, analyze campaigns, and optimize strategies",
    icon: Megaphone,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    capabilities: 6,
    tasksCompleted: 142,
    status: "active",
  },
  {
    id: "sales",
    name: "Sales Agent",
    description: "Generate proposals, analyze pipeline, and forecast revenue",
    icon: TrendingUp,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    capabilities: 6,
    tasksCompleted: 98,
    status: "active",
  },
  {
    id: "crm",
    name: "CRM Agent",
    description: "Enrich contacts, manage data, and analyze relationships",
    icon: Bot,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    capabilities: 6,
    tasksCompleted: 267,
    status: "active",
  },
  {
    id: "content",
    name: "Content Agent",
    description: "Write blog posts, generate copy, and create documentation",
    icon: FileText,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    capabilities: 6,
    tasksCompleted: 73,
    status: "active",
  },
  {
    id: "support",
    name: "Support Agent",
    description: "Draft responses, search knowledge base, and prioritize tickets",
    icon: Headphones,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    capabilities: 6,
    tasksCompleted: 189,
    status: "active",
  },
  {
    id: "financial",
    name: "Financial Agent",
    description: "Analyze revenue trends, calculate metrics, and generate reports",
    icon: DollarSign,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    capabilities: 6,
    tasksCompleted: 45,
    status: "active",
  },
  {
    id: "operations",
    name: "Operations Agent",
    description: "Optimize workflows, identify bottlenecks, and improve processes",
    icon: Workflow,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    capabilities: 6,
    tasksCompleted: 61,
    status: "active",
  },
]

export default function AgentsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Agents</h1>
          <p className="text-muted-foreground">
            Intelligent assistants to help automate and enhance your business operations
          </p>
        </div>
        <Button asChild>
          <Link href="/agents/history">View History</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tasks Completed
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">875</div>
            <p className="text-xs text-muted-foreground">+23% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Approval
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Requires your review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Safety Status
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Active</div>
            <p className="text-xs text-muted-foreground">All guardrails enabled</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => {
          const Icon = agent.icon
          return (
            <Card key={agent.id} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${agent.bgColor}`}>
                    <Icon className={`h-6 w-6 ${agent.color}`} />
                  </div>
                  <Badge variant={agent.status === "active" ? "default" : "secondary"}>
                    {agent.status}
                  </Badge>
                </div>
                <CardTitle className="mt-4">{agent.name}</CardTitle>
                <CardDescription>{agent.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Capabilities</span>
                  <span className="font-medium">{agent.capabilities}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tasks Completed</span>
                  <span className="font-medium">{agent.tasksCompleted}</span>
                </div>
                <Button className="w-full" asChild>
                  <Link href={`/agents/${agent.id}`}>
                    Launch Agent
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500 text-white">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>AI Safety & Guardrails</CardTitle>
              <CardDescription className="text-blue-900 dark:text-blue-100">
                All AI agents operate with human supervision and strict safety controls
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 md:grid-cols-2">
            <li className="flex items-center gap-2 text-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Human approval required for external actions
            </li>
            <li className="flex items-center gap-2 text-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Complete audit trail for all operations
            </li>
            <li className="flex items-center gap-2 text-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Rate limits enforced per agent
            </li>
            <li className="flex items-center gap-2 text-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Input validation on all requests
            </li>
            <li className="flex items-center gap-2 text-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              No autonomous financial operations
            </li>
            <li className="flex items-center gap-2 text-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Timeout protection on all tasks
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
