'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Search, FileText, Pill, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ProtectedRoute } from '@/components/ProtectedRoute'

// Add Tabs component if not already added
// npx shadcn@latest add tabs

interface MedicalNote {
  id: string
  patientName: string
  doctorName: string
  content: string
  createdAt: string
}

interface Prescription {
  id: string
  patientName: string
  doctorName: string
  medication: string
  dosage: string
  status: 'active' | 'expired' | 'cancelled'
  issuedAt: string
  expiresAt: string
}

const mockMedicalNotes: MedicalNote[] = [
  {
    id: '1',
    patientName: 'Carlos Oliveira',
    doctorName: 'Dr. João Silva',
    content: 'Patient presents with migraine symptoms. Recommended rest and prescribed medication.',
    createdAt: '2024-01-10T14:30:00'
  },
  {
    id: '2',
    patientName: 'Ana Costa',
    doctorName: 'Dr. Maria Santos',
    content: 'Cardiac evaluation completed. ECG shows normal sinus rhythm. Recommended follow-up in 3 months.',
    createdAt: '2024-01-12T10:15:00'
  },
]

const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    patientName: 'Carlos Oliveira',
    doctorName: 'Dr. João Silva',
    medication: 'Paracetamol',
    dosage: '500mg',
    status: 'active',
    issuedAt: '2024-01-10T14:30:00',
    expiresAt: '2024-02-10T14:30:00'
  },
  {
    id: '2',
    patientName: 'Ana Costa',
    doctorName: 'Dr. Maria Santos',
    medication: 'Atorvastatin',
    dosage: '20mg',
    status: 'active',
    issuedAt: '2024-01-12T10:15:00',
    expiresAt: '2024-04-12T10:15:00'
  },
]

export default function ClinicalPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'expired': return 'secondary'
      case 'cancelled': return 'destructive'
      default: return 'default'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  return (
    <ProtectedRoute>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clinical Records</h1>
          <p className="text-muted-foreground">
            Manage medical notes, prescriptions, and patient records
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            New Note
          </Button>
          <Button>
            <Pill className="mr-2 h-4 w-4" />
            New Prescription
          </Button>
        </div>
      </div>

      <Tabs defaultValue="notes" className="space-y-6">
        <TabsList>
          <TabsTrigger value="notes">Medical Notes</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="records">Patient Records</TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Medical Notes</CardTitle>
              <CardDescription>
                Clinical observations and patient notes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Input
                  placeholder="Search medical notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Note Preview</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMedicalNotes.map((note) => (
                    <TableRow key={note.id}>
                      <TableCell className="font-medium">{note.patientName}</TableCell>
                      <TableCell>{note.doctorName}</TableCell>
                      <TableCell className="max-w-md truncate">
                        {note.content.length > 100 
                          ? `${note.content.substring(0, 100)}...` 
                          : note.content
                        }
                      </TableCell>
                      <TableCell>{formatDate(note.createdAt)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Note</DropdownMenuItem>
                            <DropdownMenuItem>Print</DropdownMenuItem>
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

        <TabsContent value="prescriptions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Prescriptions</CardTitle>
              <CardDescription>
                Active and historical medication prescriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Issued Date</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPrescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell className="font-medium">{prescription.patientName}</TableCell>
                      <TableCell>{prescription.doctorName}</TableCell>
                      <TableCell>{prescription.medication}</TableCell>
                      <TableCell>{prescription.dosage}</TableCell>
                      <TableCell>{formatDate(prescription.issuedAt)}</TableCell>
                      <TableCell>{formatDate(prescription.expiresAt)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(prescription.status)}>
                          {prescription.status}
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
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Renew</DropdownMenuItem>
                            <DropdownMenuItem>Print</DropdownMenuItem>
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

        <TabsContent value="records" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Clinical Records</CardTitle>
              <CardDescription>
                Comprehensive view of patient medical history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>Select a patient to view their complete clinical record</p>
                <Button className="mt-4">
                  <Search className="mr-2 h-4 w-4" />
                  Search Patient Records
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