import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, DollarSign, Target, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from "next/link"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$124,500",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Deals",
      value: "24",
      change: "+3",
      trend: "up",
      icon: Target,
    },
    {
      title: "Total Contacts",
      value: "1,248",
      change: "+156",
      trend: "up",
      icon: Users,
    },
    {
      title: "Conversion Rate",
      value: "24.8%",
      change: "-2.3%",
      trend: "down",
      icon: TrendingUp,
    },
  ]

  const recentTasks = [
    {
      id: "1",
      title: "Follow up with TechCorp",
      status: "in_progress",
      priority: "high",
      dueDate: "2 days",
    },
    {
      id: "2",
      title: "Prepare Q1 marketing campaign",
      status: "todo",
      priority: "medium",
      dueDate: "7 days",
    },
    {
      id: "3",
      title: "Update CRM documentation",
      status: "todo",
      priority: "low",
      dueDate: "14 days",
    },
  ]

  const recentActivity = [
    {
      type: "deal",
      message: "New deal added: Enterprise Platform Upgrade",
      value: "$50,000",
      time: "2 hours ago",
    },
    {
      type: "agent",
      message: "Marketing Agent completed campaign analysis",
      time: "4 hours ago",
    },
    {
      type: "ticket",
      message: "New support ticket: Integration issue with Slack",
      time: "5 hours ago",
    },
    {
      type: "contact",
      message: "3 new contacts added from LinkedIn import",
      time: "1 day ago",
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, here's what's happening today</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/analytics">View Analytics</Link>
          </Button>
          <Button asChild>
            <Link href="/agents">Launch AI Agent</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs">
                  <TrendIcon className={`h-3 w-3 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`} />
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Your upcoming and in-progress tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-start justify-between gap-4 rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  {task.status === "in_progress" ? (
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{task.title}</p>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {task.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Due in {task.dueDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard">View All Tasks</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your workspace</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                  {activity.type === "deal" && <Target className="h-4 w-4" />}
                  {activity.type === "agent" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                  {activity.type === "ticket" && <AlertCircle className="h-4 w-4 text-orange-500" />}
                  {activity.type === "contact" && <Users className="h-4 w-4" />}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm leading-none">{activity.message}</p>
                  {activity.value && (
                    <p className="text-sm font-semibold text-green-600">{activity.value}</p>
                  )}
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pipeline Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Discovery</span>
                  <span className="font-medium">8 deals</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-full w-[33%] rounded-full bg-blue-500" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Proposal</span>
                  <span className="font-medium">6 deals</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-full w-[25%] rounded-full bg-purple-500" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Negotiation</span>
                  <span className="font-medium">10 deals</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-full w-[42%] rounded-full bg-green-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">AI Agent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tasks Completed</span>
                <span className="text-2xl font-bold">42</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pending Approval</span>
                <Badge variant="secondary">3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="text-sm font-medium">+18%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/crm/contacts">Add Contact</Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/crm/deals">Create Deal</Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/automation">Build Automation</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
