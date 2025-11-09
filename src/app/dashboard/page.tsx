'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Calendar, 
  CreditCard, 
  Activity,
  ArrowUpRight,
  Stethoscope
} from 'lucide-react'
import { ProtectedRoute } from '@/components/ProtectedRoute'

const stats = [
  {
    title: 'Total Patients',
    value: '1,234',
    icon: Users,
    description: '+12% from last month',
    color: 'bg-blue-500'
  },
  {
    title: 'Today Appointments',
    value: '24',
    icon: Calendar,
    description: '+4 from yesterday',
    color: 'bg-green-500'
  },
  {
    title: 'Revenue',
    value: '$45,231',
    icon: CreditCard,
    description: '+18% from last month',
    color: 'bg-amber-500'
  },
  {
    title: 'Active Cases',
    value: '89',
    icon: Activity,
    description: '+2 new today',
    color: 'bg-red-500'
  },
]

const quickActions = [
  { title: 'New Patient', description: 'Register new patient', icon: Users, href: '/dashboard/patients' },
  { title: 'Schedule Appointment', description: 'Book new appointment', icon: Calendar, href: '/dashboard/appointments' },
  { title: 'Medical Records', description: 'View clinical data', icon: Stethoscope, href: '/dashboard/clinical' },
  { title: 'Billing', description: 'Manage payments', icon: CreditCard, href: '/dashboard/finance' },
]

export default function DashboardPage() {
  return (
    <ProtectedRoute>
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`h-8 w-8 rounded-full ${stat.color} flex items-center justify-center`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used actions and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto flex-col items-center justify-center p-4"
                  asChild
                >
                  <a href={action.href}>
                    <Icon className="mb-2 h-6 w-6" />
                    <div className="text-center">
                      <div className="font-semibold">{action.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {action.description}
                      </div>
                    </div>
                    <ArrowUpRight className="absolute top-2 right-2 h-4 w-4" />
                  </a>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { patient: 'John Doe', time: '9:00 AM', doctor: 'Dr. Smith', status: 'Completed' },
                { patient: 'Jane Smith', time: '10:30 AM', doctor: 'Dr. Johnson', status: 'In Progress' },
                { patient: 'Mike Wilson', time: '11:15 AM', doctor: 'Dr. Brown', status: 'Scheduled' },
                { patient: 'Sarah Davis', time: '2:00 PM', doctor: 'Dr. Wilson', status: 'Scheduled' },
              ].map((appointment, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.time} • {appointment.doctor}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {appointment.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { service: 'Patient Database', status: 'Operational', uptime: '99.9%' },
                { service: 'Appointment System', status: 'Operational', uptime: '99.8%' },
                { service: 'Billing System', status: 'Maintenance', uptime: '95.2%' },
                { service: 'Telemedicine', status: 'Operational', uptime: '99.7%' },
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{service.service}</p>
                    <p className="text-sm text-muted-foreground">Uptime: {service.uptime}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    service.status === 'Operational' ? 'bg-green-100 text-green-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {service.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </ProtectedRoute>
  )
}