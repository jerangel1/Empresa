'use client'

import { useState } from "react"
import { Branch } from "@/types/branch"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Building2, Users, LayoutGrid, LayoutList } from 'lucide-react'
import { BranchCard } from "../components/branch-card"
import { BranchesTable } from "../components/branches-table"
import { BranchFormModal } from "../components/branch-form-modal"
import { BranchDetailsCard } from "../components/branch-details-card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data - replace with actual data from your backend
const INITIAL_BRANCHES: Branch[] = [
  {
    id: "1",
    name: "Sucursal Central",
    address: "Calle Principal 123",
    manager: {
      id: "1",
      name: "Ana Garcia",
      photoUrl: "/placeholder.svg",
    },
    areas: [
      {
        id: "1",
        name: "Cremería",
        registers: [
          {
            id: "1",
            name: "Caja 1",
            isActive: true,
            cashiers: [
              {
                id: "1",
                name: "Juan Pérez",
                photoUrl: "/placeholder.svg",
                isActive: true,
                role: "cashier"
              },
            ],
          },
          {
            id: "2",
            name: "Caja 2",
            isActive: true,
            cashiers: [
              {
                id: "2",
                name: "María López",
                photoUrl: "/placeholder.svg",
                isActive: true,
                role: "cashier"
              },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "Carnicería",
        registers: [
          {
            id: "3",
            name: "Caja 1",
            isActive: true,
            cashiers: [
              {
                id: "3",
                name: "Pedro Sánchez",
                photoUrl: "/placeholder.svg",
                isActive: true,
                role: "cashier"
              },
            ],
          },
        ],
      },
    ],
    employeeCount: 15,
  },
  {
    id: "2",
    name: "Sucursal Norte",
    address: "Av. del Norte 456",
    manager: {
      id: "2",
      name: "Carlos Rodríguez",
      photoUrl: "/placeholder.svg",
    },
    areas: [
      {
        id: "3",
        name: "Panadería",
        registers: [
          {
            id: "4",
            name: "Caja 1",
            isActive: true,
            cashiers: [
              {
                id: "4",
                name: "Ana Martínez",
                photoUrl: "/placeholder.svg",
                isActive: true,
                role: "cashier"
              },
            ],
          },
        ],
      },
    ],
    employeeCount: 10,
  },
  {
    id: "3",
    name: "Sucursal Sur",
    address: "Blvd. del Sur 789",
    manager: {
      id: "3",
      name: "Laura Gómez",
      photoUrl: "/placeholder.svg",
    },
    areas: [
      {
        id: "4",
        name: "Frutería",
        registers: [
          {
            id: "5",
            name: "Caja 1",
            isActive: true,
            cashiers: [
              {
                id: "5",
                name: "Roberto Díaz",
                photoUrl: "/placeholder.svg",
                isActive: true,
                role: "cashier"
              },
            ],
          },
        ],
      },
    ],
    employeeCount: 8,
  },
]

export default function Sucursales() {
  const [branches, setBranches] = useState<Branch[]>(INITIAL_BRANCHES)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBranch, setSelectedBranch] = useState<Branch | undefined>()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [viewType, setViewType] = useState<'card' | 'table'>('card')
  const [showBranchDetails, setShowBranchDetails] = useState(false)
  const [showEmployeesModal, setShowEmployeesModal] = useState(false)


  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.areas.some((area) => area.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const totalEmployees = branches.reduce((sum, branch) => sum + branch.employeeCount, 0)

  const handleAddBranch = (data: Partial<Branch>) => {
    const newBranch: Branch = {
      id: (branches.length + 1).toString(),
      name: data.name!,
      address: data.address!,
      manager: INITIAL_BRANCHES[0].manager, // In a real app, use the selected manager
      areas: data.areas || [],
      employeeCount: 0,
    }
    setBranches([...branches, newBranch])
    setIsFormOpen(false)
  }

  const handleEditBranch = (data: Partial<Branch>) => {
    if (!selectedBranch) return;
    
    const updatedBranch: Branch = {
      ...selectedBranch,
      name: data.name ?? selectedBranch.name,
      address: data.address ?? selectedBranch.address,
      areas: data.areas ?? selectedBranch.areas,
    };
    
    setBranches(branches.map(branch => 
      branch.id === selectedBranch.id ? updatedBranch : branch
    ));
    setIsFormOpen(false);
    setSelectedBranch(undefined);
  };

  const handleDeleteBranch = (branchId: string) => {
    setBranches(branches.filter((branch) => branch.id !== branchId))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold flex items-center">
                <Building2 className="w-8 h-8 mr-2 text-primary" />
                Sucursales
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewType(viewType === 'card' ? 'table' : 'card')}
                >
                  {viewType === 'card' ? (
                    <>
                      <LayoutList className="w-4 h-4 mr-2" />
                      Vista de Tabla
                    </>
                  ) : (
                    <>
                      <LayoutGrid className="w-4 h-4 mr-2" />
                      Vista de Tarjetas
                    </>
                  )}
                </Button>
                <Button onClick={() => setIsFormOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Sucursal
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-1" />
                  <span>{branches.length} Sucursales</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{totalEmployees} Empleados</span>
                </div>
              </div>
              <Input
                placeholder="Buscar sucursal, área o caja..."
                className="max-w-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewType === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBranches.map((branch) => (
                <BranchCard
                  key={branch.id}
                  branch={branch}
                  onEdit={() => handleEditBranch(branch)}
                  onDelete={handleDeleteBranch}
                />
              ))}
            </div>
          ) : (
            <BranchesTable
              branches={filteredBranches}
              onViewDetails={(branch) => {
                setSelectedBranch(branch)
                setShowBranchDetails(true)
              }}
              onViewEmployees={(branch) => {
                setSelectedBranch(branch)
                setShowEmployeesModal(true)
              }}
              onEdit={handleEditBranch}
              onDelete={handleDeleteBranch}
            />
          )}
        </CardContent>
      </Card>

      <BranchFormModal
        branch={selectedBranch}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setSelectedBranch(undefined)
        }}
        onSubmit={selectedBranch ? handleEditBranch : handleAddBranch}
      />
      <Dialog open={showBranchDetails} onOpenChange={setShowBranchDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Detalles de la Sucursal</DialogTitle>
          </DialogHeader>
          {selectedBranch && <BranchDetailsCard branch={selectedBranch} />}
        </DialogContent>
      </Dialog>

      <Dialog open={showEmployeesModal} onOpenChange={setShowEmployeesModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Empleados de la Sucursal</DialogTitle>
          </DialogHeader>
          {/* Add employee list component here */}
        </DialogContent>
      </Dialog>
    </div>
  )
}
