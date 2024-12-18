export interface Employee {
  id: string
  name: string
  photoUrl: string
  position: string
  branch: string
  area: string
  startDate: string
  isActive: boolean
}

export type Position = 'admin' | 'cajero' | 'gerente' | 'asistente' | 'seguridad'

