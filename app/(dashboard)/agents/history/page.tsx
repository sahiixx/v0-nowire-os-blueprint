import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, Clock, XCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import Link from "next/link"

const history = [
  {
    id: "1",
    agent: "Marketing Agent",
    task: "Generate Q1 campaign email copy",
    status: "completed",
    approvedBy: "Admin User",
    executionTime: "2.4s",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    agent: "Sales Agent",
    task: "Analyze pipeline for enterprise deals",
    status: "completed",
    approvedBy: "Admin User",
    executionTime: "3.1s",
    timestamp: "4 hours ago",
  },
  {
    id: "3",
    agent: "CRM Agent",
    task: "Enrich contact data for new imports",
    status: "completed",
    approvedBy: null,
    executionTime: "1.8s",
    timestamp: "5 hours ago",
  },
  {
    id: "4",
    agent: "Marketing Agent",
    task: "Create social media post schedule",
    status: "requires_approval",
    approvedBy: null,
    executionTime: null,
    timestamp: "6 hours ago",
  },
  {
    id: "5",
    agent: "Support Agent",
    task: "Draft response for integration issue ticket",
    status: "completed",
    approvedBy: "Support Agent",
    executionTime: "1.2s",
    timestamp: "1 day ago",
  },
  {
    id: "6",
    agent: "Financial Agent",
    task: "Generate monthly revenue report",
    status: "completed",
    approvedBy: "Admin User",
    executionTime: "4.7s",
    timestamp: "1 day ago",
  },
  {
    id: "7",
    agent: "Operations Agent",
    task: "Analyze workflow efficiency metrics",
    status: "failed",
    approvedBy: null,
    executionTime: "0.5s",
    timestamp: "2 days ago",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-500"><CheckCircle2 className="h-3 w-3 mr-1" />Completed</Badge>
    case "requires_approval":
      return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
    case "failed":
      return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>
    default:
      return <Badge><AlertCircle className="h-3 w-3 mr-1" />Unknown</Badge>
  }
}

export default function AgentHistoryPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/agents">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent History</h1>
          <p className="text-muted-foreground">
            Complete audit trail of all AI agent activities
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">875</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">862</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Approval
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">10</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest AI agent tasks and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approved By</TableHead>
                <TableHead>Execution Time</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.agent}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.task}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{item.approvedBy || <span className="text-muted-foreground">N/A</span>}</TableCell>
                  <TableCell>{item.executionTime || <span className="text-muted-foreground">-</span>}</TableCell>
                  <TableCell className="text-muted-foreground">{item.timestamp}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
