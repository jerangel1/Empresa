import { useState } from "react"
import { Administrator } from "@/app/types/admin"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronDown, ChevronUp } from 'lucide-react'

interface AdministratorCardProps {
  admin: Administrator
  rolePermissions: string[]
}

export function AdministratorCard({ admin, rolePermissions }: AdministratorCardProps) {
  const [showAllPermissions, setShowAllPermissions] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const extraPermissions = admin.permissions.filter(p => !rolePermissions.includes(p))

  const visibleRolePermissions = showAllPermissions ? rolePermissions : rolePermissions.slice(0, 2)
  const visibleExtraPermissions = showAllPermissions ? extraPermissions : extraPermissions.slice(0, 2)

  const hiddenRolePermissionsCount = rolePermissions.length - 2
  const hiddenExtraPermissionsCount = extraPermissions.length - 2

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="h-24 relative bg-black">
            <Avatar className="absolute bottom-0 left-4 transform translate-y-1/2 h-20 w-20 border-4 border-background">
              <AvatarImage src={admin.photoUrl} alt={admin.name} />
              <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="pt-14 pb-4">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{admin.name}</h3>
                <p className="text-sm text-muted-foreground">{admin.email}</p>
              </div>
              <Badge variant="outline" className="bg-black text-white">
                {admin.role}
              </Badge>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Permisos del Rol:</h4>
              <div className="flex flex-wrap gap-1 mb-2">
                {visibleRolePermissions.map((permission, index) => (
                  <Badge key={index} variant="secondary">
                    {permission}
                  </Badge>
                ))}
                {rolePermissions.length > 2 && (
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary"
                    onClick={() => setShowAllPermissions(!showAllPermissions)}
                  >
                    {showAllPermissions ? "Mostrar menos" : `+${hiddenRolePermissionsCount} más`}
                  </Badge>
                )}
              </div>
              {extraPermissions.length > 0 && (
                <>
                  <h4 className="text-sm font-medium mb-2 mt-4">Permisos Adicionales:</h4>
                  <div className="flex flex-wrap gap-1">
                    {visibleExtraPermissions.map((permission, index) => (
                      <Badge key={index} variant="secondary">
                        {permission}
                      </Badge>
                    ))}
                    {extraPermissions.length > 2 && (
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-secondary"
                        onClick={() => setShowAllPermissions(!showAllPermissions)}
                      >
                        {showAllPermissions ? "Mostrar menos" : `+${hiddenExtraPermissionsCount} más`}
                      </Badge>
                    )}
                  </div>
                </>
              )}
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowDetails(true)}
            >
              Ver detalles
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detalles del Administrador</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={admin.photoUrl} alt={admin.name} />
                <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{admin.name}</h3>
                <p className="text-sm text-muted-foreground">{admin.email}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Rol:</h4>
              <Badge variant="outline" className="bg-black text-white">
                {admin.role}
              </Badge>
            </div>
            <div>
              <h4 className="font-medium mb-2">Permisos:</h4>
              <div className="space-y-2">
                {admin.permissions.map((permission, index) => (
                  <Badge key={index} variant="secondary" className="mr-1">
                    {permission}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

