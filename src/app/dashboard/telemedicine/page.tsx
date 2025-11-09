'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Video, Clock, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ProtectedRoute } from '@/components/ProtectedRoute'

interface TeleSession {
  id: string
  patientName: string
  doctorName: string
  startTime: string
  endTime?: string
  duration: number
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  sessionUrl: string
}

const mockSessions: TeleSession[] = [
  {
    id: '1',
    patientName: 'Carlos Oliveira',
    doctorName: 'Dr. João Silva',
    startTime: '2024-01-15T14:00:00',
    duration: 45,
    status: 'scheduled',
    sessionUrl: 'https://televisit.example.com/session/1'
  },
  {
    id: '2',
    patientName: 'Ana Costa',
    doctorName: 'Dr. Maria Santos',
    startTime: '2024-01-15T10:30:00',
    endTime: '2024-01-15T11:15:00',
    duration: 45,
    status: 'completed',
    sessionUrl: 'https://televisit.example.com/session/2'
  },
  {
    id: '3',
    patientName: 'Pedro Almeida',
    doctorName: 'Dr. João Silva',
    startTime: '2024-01-16T09:00:00',
    duration: 30,
    status: 'cancelled',
    sessionUrl: 'https://televisit.example.com/session/3'
  },
]

export default function TelemedicinePage() {
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR')
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'scheduled': return 'default'
      case 'in-progress': return 'secondary'
      case 'completed': return 'outline'
      case 'cancelled': return 'destructive'
      default: return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="h-4 w-4" />
      case 'in-progress': return <Video className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'cancelled': return <XCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const upcomingSessions = mockSessions.filter(s => s.status === 'scheduled')
  const completedSessions = mockSessions.filter(s => s.status === 'completed')

  return (
    <ProtectedRoute>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Telemedicine</h1>
          <p className="text-muted-foreground">
            Manage virtual consultations and tele-sessions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Session
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today Sessions</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +1 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Next 7 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              +3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38min</div>
            <p className="text-xs text-muted-foreground">
              -2min from average
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="completed">Completed Sessions</TabsTrigger>
          <TabsTrigger value="new">Schedule New</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tele-Sessions</CardTitle>
              <CardDescription>
                Scheduled virtual consultations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Scheduled Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.patientName}</TableCell>
                      <TableCell>{session.doctorName}</TableCell>
                      <TableCell>{formatDateTime(session.startTime)}</TableCell>
                      <TableCell>{session.duration} min</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(session.status)} className="flex items-center gap-1 w-24">
                          {getStatusIcon(session.status)}
                          {session.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Video className="mr-2 h-4 w-4" />
                              Start Session
                            </DropdownMenuItem>
                            <DropdownMenuItem>Reschedule</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Cancel Session
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Sessions</CardTitle>
              <CardDescription>
                Historical telemedicine consultations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Session Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.patientName}</TableCell>
                      <TableCell>{session.doctorName}</TableCell>
                      <TableCell>{formatDateTime(session.startTime)}</TableCell>
                      <TableCell>{session.duration} min</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(session.status)} className="flex items-center gap-1 w-24">
                          {getStatusIcon(session.status)}
                          {session.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Recording</DropdownMenuItem>
                            <DropdownMenuItem>Session Notes</DropdownMenuItem>
                            <DropdownMenuItem>Generate Report</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule New Tele-Session</CardTitle>
              <CardDescription>
                Create a new virtual consultation session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 max-w-2xl">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Select Patient</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                    <option value="">Choose a patient...</option>
                    <option value="1">Carlos Oliveira</option>
                    <option value="2">Ana Costa</option>
                    <option value="3">Pedro Almeida</option>
                  </select>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Select Doctor</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                    <option value="">Choose a doctor...</option>
                    <option value="1">Dr. João Silva</option>
                    <option value="2">Dr. Maria Santos</option>
                  </select>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Session Date & Time</label>
                  <input 
                    type="datetime-local" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Estimated Duration (minutes)</label>
                  <input 
                    type="number" 
                    defaultValue="30"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  />
                </div>

                <Button className="w-full">
                  <Video className="mr-2 h-4 w-4" />
                  Schedule Tele-Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </ProtectedRoute>
  )
}