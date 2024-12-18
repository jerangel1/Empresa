'use client'

import { useState } from "react"
import { Role } from "@/app/types/admin"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface RoleCardProps {
  role: Role
  onViewDetails: (role: Role) => void
}

export function RoleCard({ role, onViewDetails }: RoleCardProps) {
  const [showAllPermissions, setShowAllPermissions] = useState(false)

  const visiblePermissions = showAllPermissions ? role.permissions : role.permissions.slice(0, 3)
  const hiddenPermissionsCount = role.permissions.length - 3

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="bg-primary p-4 text-primary-foreground">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold mb-1">{role.name}</h3>
            <Shield className="w-5 h-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <p className="text-sm text-muted-foreground">{role.description}</p>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {visiblePermissions.map((permission) => (
              <Badge key={permission} variant="secondary">
                {permission}
              </Badge>
            ))}
          </div>
          {role.permissions.length > 3 && (
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-secondary"
              onClick={() => setShowAllPermissions(!showAllPermissions)}
            >
              {showAllPermissions ? (
                <>Mostrar menos</>
              ) : (
                <>+{hiddenPermissionsCount} más</>
              )}
            </Badge>
          )}
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-between hover:bg-secondary" 
          onClick={() => onViewDetails(role)}
        >
          Ver detalles
          <ChevronRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

