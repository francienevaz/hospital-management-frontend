'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Eye, Edit, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ProtectedRoute } from '@/components/ProtectedRoute'

interface Patient {
  id: string
  fullName: string
  cpf: string
  birthDate: string
  phone: string
  email?: string
  medicalRecordNumber?: string
  status: 'active' | 'inactive'
}

const mockPatients: Patient[] = [
  {
    id: '1',
    fullName: 'Carlos Oliveira',
    cpf: '123.456.789-00',
    birthDate: '1985-05-15',
    phone: '(11) 99999-9999',
    email: 'carlos@email.com',
    medicalRecordNumber: 'MRN001',
    status: 'active'
  },
  {
    id: '2',
    fullName: 'Ana Costa',
    cpf: '987.654.321-00',
    birthDate: '1990-08-22',
    phone: '(11) 88888-8888',
    email: 'ana@email.com',
    medicalRecordNumber: 'MRN002',
    status: 'active'
  },
  {
    id: '3',
    fullName: 'Pedro Almeida',
    cpf: '456.789.123-00',
    birthDate: '1978-12-10',
    phone: '(11) 77777-7777',
    medicalRecordNumber: 'MRN003',
    status: 'inactive'
  },
]

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPatients = patients.filter(patient =>
    patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cpf.includes(searchTerm) ||
    patient.medicalRecordNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getStatusVariant = (status: string) => {
    return status === 'active' ? 'default' : 'secondary'
  }

  return (
    <ProtectedRoute>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
          <p className="text-muted-foreground">
            Manage patient records and information
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Patient
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
          <CardDescription>
            Search and manage all patient information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search patients by name, CPF, or medical record..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Birth Date</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Medical Record</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.fullName}</TableCell>
                  <TableCell>{patient.cpf}</TableCell>
                  <TableCell>{formatDate(patient.birthDate)}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.medicalRecordNumber}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(patient.status)}>
                      {patient.status}
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
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredPatients.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No patients found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    </ProtectedRoute>
  )
}