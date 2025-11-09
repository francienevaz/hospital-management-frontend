'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Users,
  Calendar,
  Stethoscope,
  CreditCard,
  Video,
  BarChart3,
  Settings,
  LayoutDashboard,
} from 'lucide-react'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Patients', href: '/dashboard/patients' },
  { icon: Calendar, label: 'Appointments', href: '/dashboard/appointments' },
  { icon: Stethoscope, label: 'Clinical', href: '/dashboard/clinical' },
  { icon: CreditCard, label: 'Finance', href: '/dashboard/finance' },
  { icon: Video, label: 'Telemedicine', href: '/dashboard/telemedicine' },
  { icon: BarChart3, label: 'Reports', href: '/dashboard/reports' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-background border-r w-64">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-semibold">Hospital Management</h1>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Button
              key={item.href}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                isActive && "bg-muted"
              )}
              asChild
            >
              <Link href={item.href}>
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          )
        })}
      </nav>
    </div>
  )
}