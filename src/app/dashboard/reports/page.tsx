'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Download, Filter, BarChart3, Users, Calendar, CreditCard, Activity } from 'lucide-react'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function ReportsPage() {
  return (
    <ProtectedRoute>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Generate and view comprehensive reports and analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="clinical">Clinical</TabsTrigger>
          <TabsTrigger value="operational">Operational</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Patient Growth</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12.5%</div>
                <p className="text-xs text-muted-foreground">
                  +24 patients this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Appointment Rate</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground">
                  +2% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 45,231</div>
                <p className="text-xs text-muted-foreground">
                  +18% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>
                  Key metrics overview for the current month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: 'New Patients', value: '24', change: '+12%' },
                    { metric: 'Appointments', value: '156', change: '+8%' },
                    { metric: 'Revenue', value: 'R$ 45,231', change: '+18%' },
                    { metric: 'Satisfaction', value: '4.8/5', change: '+0.2' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.metric}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{item.value}</span>
                        <span className="text-xs text-green-600">{item.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Reports</CardTitle>
                <CardDescription>
                  Generate frequently used reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: 'Patient Demographics', icon: Users },
                    { title: 'Revenue Analysis', icon: CreditCard },
                    { title: 'Appointment Statistics', icon: Calendar },
                    { title: 'Clinical Outcomes', icon: Activity },
                  ].map((report, index) => {
                    const Icon = report.icon
                    return (
                      <Button key={index} variant="outline" className="w-full justify-start">
                        <Icon className="mr-2 h-4 w-4" />
                        {report.title}
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>
                Comprehensive financial analysis and revenue reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: 'Revenue Report', description: 'Monthly revenue breakdown' },
                  { title: 'Payment Analysis', description: 'Payment methods and success rates' },
                  { title: 'Expense Report', description: 'Operational costs and expenses' },
                  { title: 'Profit & Loss', description: 'Income statement overview' },
                  { title: 'Tax Report', description: 'Tax obligations and filings' },
                  { title: 'Budget vs Actual', description: 'Budget performance analysis' },
                ].map((report, index) => (
                  <Card key={index} className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="font-medium">{report.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {report.description}
                      </div>
                      <Button variant="ghost" size="sm" className="mt-3">
                        <Download className="mr-2 h-3 w-3" />
                        Generate
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clinical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Clinical Reports</CardTitle>
              <CardDescription>
                Medical and clinical performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: 'Patient Outcomes', description: 'Treatment results and recovery rates' },
                  { title: 'Medication Usage', description: 'Prescription patterns and usage' },
                  { title: 'Diagnosis Statistics', description: 'Common diagnoses and trends' },
                  { title: 'Doctor Performance', description: 'Physician efficiency and outcomes' },
                  { title: 'Readmission Rates', description: 'Patient readmission statistics' },
                  { title: 'Quality Metrics', description: 'Clinical quality indicators' },
                ].map((report, index) => (
                  <Card key={index} className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="font-medium">{report.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {report.description}
                      </div>
                      <Button variant="ghost" size="sm" className="mt-3">
                        <BarChart3 className="mr-2 h-3 w-3" />
                        View
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operational" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Operational Reports</CardTitle>
              <CardDescription>
                Hospital operations and efficiency metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: 'Appointment Utilization', description: 'Room and resource usage' },
                  { title: 'Staff Performance', description: 'Employee productivity metrics' },
                  { title: 'Wait Times', description: 'Patient waiting time analysis' },
                  { title: 'Resource Allocation', description: 'Equipment and room usage' },
                  { title: 'Patient Flow', description: 'Patient movement and processing' },
                  { title: 'Capacity Planning', description: 'Resource capacity analysis' },
                ].map((report, index) => (
                  <Card key={index} className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="font-medium">{report.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {report.description}
                      </div>
                      <Button variant="ghost" size="sm" className="mt-3">
                        <Activity className="mr-2 h-3 w-3" />
                        Analyze
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </ProtectedRoute>
  )
}