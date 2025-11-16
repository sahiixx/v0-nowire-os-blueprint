"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Send, Loader2, CheckCircle2, AlertCircle, Info } from 'lucide-react'
import Link from "next/link"
import { useParams } from 'next/navigation'

const agentConfigs: Record<string, any> = {
  marketing: {
    name: "Marketing Agent",
    description: "AI-powered marketing assistant",
    capabilities: [
      "Generate email copy",
      "Create social media posts",
      "Analyze campaign performance",
      "Suggest audience segments",
      "Optimize ad spend",
      "Generate content ideas",
    ],
    exampleTasks: [
      "Create a welcome email sequence for new customers",
      "Analyze our Q1 campaign performance",
      "Generate social media posts for product launch",
      "Suggest improvements for our email open rates",
    ],
  },
  sales: {
    name: "Sales Agent",
    description: "AI-powered sales assistant",
    capabilities: [
      "Generate proposals",
      "Analyze deal pipeline",
      "Suggest next actions",
      "Create follow-up emails",
      "Identify upsell opportunities",
      "Forecast revenue",
    ],
    exampleTasks: [
      "Generate a proposal for TechCorp enterprise deal",
      "Analyze our pipeline for Q2",
      "Create a follow-up email for Sarah at Startup.io",
      "Identify accounts ready for upselling",
    ],
  },
  support: {
    name: "Support Agent",
    description: "AI-powered support assistant",
    capabilities: [
      "Draft support responses",
      "Search knowledge base",
      "Suggest solutions",
      "Analyze ticket patterns",
      "Generate help articles",
      "Prioritize tickets",
    ],
    exampleTasks: [
      "Draft a response for Slack integration ticket",
      "Search KB for authentication issues",
      "Analyze common support requests this month",
      "Create a help article about custom fields",
    ],
  },
}

export default function AgentPage() {
  const params = useParams()
  const agentId = params.agentId as string
  const agent = agentConfigs[agentId] || agentConfigs.marketing
  
  const [task, setTask] = useState("")
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'agent' | 'system'; content: string; status?: string }>>([
    {
      role: "system",
      content: `Welcome to ${agent.name}! I'm ready to help you with your tasks. All external actions will require your approval.`,
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!task.trim() || isLoading) return

    const userMessage = task
    setTask("")
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "agent",
        content: `I'll help you with that. Let me analyze the request and prepare a response. This is a simulated response showing how the agent would process your task: "${userMessage}". In production, this would connect to the AI backend service.`,
        status: "requires_approval"
      }])
      setIsLoading(false)
    }, 2000)
  }

  const handleApprove = () => {
    setMessages(prev => [...prev, {
      role: "system",
      content: "Task approved and executed successfully. The agent has completed the requested action.",
    }])
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/agents">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{agent.name}</h1>
          <p className="text-muted-foreground">{agent.description}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="flex flex-col h-[600px]">
            <CardHeader>
              <CardTitle>Agent Chat</CardTitle>
              <CardDescription>
                Describe what you need help with, and the agent will assist you
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : message.role === 'system'
                          ? 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
                          : 'bg-muted'
                      }`}>
                        <div className="flex items-start gap-2">
                          {message.role === 'agent' && <Info className="h-4 w-4 mt-0.5 shrink-0" />}
                          <p className="text-sm">{message.content}</p>
                        </div>
                        {message.status === "requires_approval" && (
                          <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
                            <Badge variant="secondary">Requires Approval</Badge>
                            <Button size="sm" onClick={handleApprove}>
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-4">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <Textarea
                  placeholder="Describe your task..."
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className="min-h-[60px]"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" className="h-[60px] w-[60px] shrink-0" disabled={isLoading || !task.trim()}>
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {agent.capabilities.map((capability: string, index: number) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    {capability}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Example Tasks</CardTitle>
              <CardDescription>Try asking the agent to...</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {agent.exampleTasks.map((example: string, index: number) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-2 px-3"
                    onClick={() => setTask(example)}
                  >
                    <span className="text-sm line-clamp-2">{example}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
            <CardHeader>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-500 shrink-0" />
                <div>
                  <CardTitle className="text-base">Safety Notice</CardTitle>
                  <CardDescription className="text-orange-900 dark:text-orange-100 text-xs">
                    External actions require approval. All operations are logged.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}
