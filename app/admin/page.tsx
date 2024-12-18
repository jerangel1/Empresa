'use client'

import { useState } from "react"
import { Administrator, ActivityLog, Role } from "@/app/types/admin"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdministratorCard } from "../components/administrator-card"
import { AdministratorFormModal } from "../components/administrator-form-modal"
import { RoleFormModal } from "../components/role-form-modal"
import { RoleCard } from "../components/role-card"
import { RoleDetailsModal } from "../components/role-details-modal"
import { Plus, UserPlus, ShieldPlus, Settings, Search, LayoutGrid, LayoutList } from 'lucide-react'
import { AdministratorsTable } from "../components/administrators-table"
import { RolesTable } from "../components/roles-table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock data
const INITIAL_ADMINS: Administrator[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    role: "Super Admin",
    photoUrl: "https://i.pravatar.cc/150?img=1",
    permissions: ["crear_usuarios", "editar_usuarios", "eliminar_usuarios", "ver_registros"],
  },
  {
    id: "2",
    name: "María García",
    email: "maria@example.com",
    role: "Admin",
    photoUrl: "https://i.pravatar.cc/150?img=2",
    permissions: ["crear_usuarios", "editar_usuarios", "ver_registros"],
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    role: "Gerente",
    photoUrl: "https://i.pravatar.cc/150?img=3",
    permissions: ["ver_registros", "gestionar_sucursales"],
  },
  {
    id: "4",
    name: "Ana Martínez",
    email: "ana@example.com",
    role: "Admin",
    photoUrl: "https://i.pravatar.cc/150?img=4",
    permissions: ["crear_usuarios", "editar_usuarios", "ver_registros", "gestionar_inventario"],
  },
]

const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: "1",
    adminId: "1",
    adminName: "Juan Pérez",
    action: "Creó un nuevo usuario",
    timestamp: "2023-05-15T10:30:00Z",
  },
  {
    id: "2",
    adminId: "2",
    adminName: "María García",
    action: "Actualizó permisos de rol",
    timestamp: "2023-05-14T15:45:00Z",
  },
  {
    id: "3",
    adminId: "3",
    adminName: "Carlos Rodríguez",
    action: "Generó reporte de ventas",
    timestamp: "2023-05-13T09:15:00Z",
  },
]

const INITIAL_ROLES: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Acceso completo a todas las funciones del sistema",
    permissions: ["crear_usuarios", "editar_usuarios", "eliminar_usuarios", "ver_registros", "gestionar_finanzas", "gestionar_sucursales", "gestionar_inventario"],
  },
  {
    id: "2",
    name: "Admin",
    description: "Acceso a la mayoría de las funciones, excepto eliminar usuarios",
    permissions: ["crear_usuarios", "editar_usuarios", "ver_registros", "gestionar_finanzas", "gestionar_sucursales"],
  },
  {
    id: "3",
    name: "Gerente",
    description: "Acceso limitado a funciones específicas de gestión",
    permissions: ["ver_registros", "gestionar_sucursales", "gestionar_inventario"],
  },
]

const PERMISSIONS_DESCRIPTION: { [key: string]: string } = {
  crear_usuarios: "Permite crear nuevos usuarios en el sistema",
  editar_usuarios: "Permite modificar la información de usuarios existentes",
  eliminar_usuarios: "Permite eliminar usuarios del sistema",
  ver_registros: "Permite ver los registros de actividad del sistema",
  gestionar_finanzas: "Permite acceder y gestionar información financiera",
  gestionar_sucursales: "Permite administrar las sucursales de la empresa",
  gestionar_inventario: "Permite gestionar el inventario de productos",
}

export default function Admin() {
  const [admins, setAdmins] = useState<Administrator[]>(INITIAL_ADMINS)
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS)
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false)
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [viewingRole, setViewingRole] = useState<Role | null>(null)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [activeTab, setActiveTab] = useState("users")
  const [viewType, setViewType] = useState<'card' | 'table'>('card')
  const [selectedAdmin, setSelectedAdmin] = useState<Administrator | null>(null)

  const getRolePermissions = (roleName: string) => {
    const role = INITIAL_ROLES.find(r => r.name === roleName)
    return role ? role.permissions : []
  }

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddAdmin = (adminData: Omit<Administrator, 'id'>) => {
    const newAdmin: Administrator = {
      id: String(admins.length + 1),
      ...adminData,
    }
    setAdmins([...admins, newAdmin])
  }

  const handleAddRole = (roleData: Omit<Role, 'id'>) => {
    const newRole: Role = {
      id: String(roles.length + 1),
      ...roleData,
    }
    setRoles([...roles, newRole])
  }

  const handleEditRole = (updatedRole: Role) => {
    setRoles(roles.map(role => role.id === updatedRole.id ? updatedRole : role))
    setEditingRole(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Settings className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">Administración</h2>
            </div>
            <div className="flex items-center space-x-2">
              {activeTab === 'users' && (
                <Button onClick={() => setIsAdminModalOpen(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Nuevo Usuario
                </Button>
              )}
              {activeTab === 'roles' && (
                <Button onClick={() => setIsRoleModalOpen(true)}>
                  <ShieldPlus className="w-4 h-4 mr-2" />
                  Nuevo Rol
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="users" className="space-y-6" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="users">Usuarios</TabsTrigger>
                <TabsTrigger value="roles">Roles</TabsTrigger>
                <TabsTrigger value="activity">Registro de Actividades</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 w-[200px]"
                  />
                </div>
                {(activeTab === 'users' || activeTab === 'roles') && (
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
                )}
              </div>
            </div>

            <TabsContent value="users">
              {viewType === 'card' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAdmins.map((admin) => (
                    <AdministratorCard key={admin.id} admin={admin} rolePermissions={getRolePermissions(admin.role)} />
                  ))}
                </div>
              ) : (
                <AdministratorsTable administrators={filteredAdmins} rolePermissions={getRolePermissions} onViewDetails={(admin) => setSelectedAdmin(admin)} />
              )}
            </TabsContent>

            <TabsContent value="roles">
              {viewType === 'card' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRoles.map((role) => (
                    <RoleCard
                      key={role.id}
                      role={role}
                      onViewDetails={setViewingRole}
                    />
                  ))}
                </div>
              ) : (
                <RolesTable roles={filteredRoles} onViewDetails={setViewingRole} />
              )}
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Registro de Actividades Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left">Administrador</th>
                        <th className="text-left">Acción</th>
                        <th className="text-left">Fecha y Hora</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activityLogs.map((log) => (
                        <tr key={log.id}>
                          <td className="font-medium">{log.adminName}</td>
                          <td>{log.action}</td>
                          <td>{new Date(log.timestamp).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AdministratorFormModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSubmit={handleAddAdmin}
        roles={roles}
      />

      <RoleFormModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onSubmit={handleAddRole}
      />

      <RoleDetailsModal
        role={viewingRole}
        isOpen={!!viewingRole}
        onClose={() => setViewingRole(null)}
        onEdit={handleEditRole}
        onDelete={(roleId) => {
          setRoles(roles.filter(role => role.id !== roleId))
          setViewingRole(null)
        }}
        permissionsDescription={PERMISSIONS_DESCRIPTION}
      />

      <RoleFormModal
        isOpen={!!editingRole}
        onClose={() => setEditingRole(null)}
        onSubmit={handleEditRole}
        initialRole={editingRole}
      />

      <Dialog open={!!selectedAdmin} onOpenChange={() => setSelectedAdmin(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detalles del Administrador</DialogTitle>
          </DialogHeader>
          {selectedAdmin && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedAdmin.photoUrl} alt={selectedAdmin.name} />
                  <AvatarFallback>{selectedAdmin.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedAdmin.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedAdmin.email}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Rol:</h4>
                <Badge variant="outline" className="bg-black text-white">
                  {selectedAdmin.role}
                </Badge>
              </div>
              <div>
                <h4 className="font-medium mb-2">Permisos:</h4>
                <div className="space-y-2">
                  {selectedAdmin.permissions.map((permission, index) => (
                    <Badge key={index} variant="secondary" className="mr-1">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

