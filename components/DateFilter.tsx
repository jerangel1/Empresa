'use client'

import { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import { es } from 'date-fns/locale'

export function DateFilter({ onFilterChange }: { onFilterChange: (filter: { type: string; from?: Date; to?: Date }) => void }) {
  const [filterType, setFilterType] = useState('day')
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined
  })

  const handleFilterChange = (value: string) => {
    setFilterType(value)
    const today = new Date()
    let from: Date | undefined
    let to: Date | undefined

    switch (value) {
      case 'day':
        from = today
        to = today
        break
      case 'week':
        from = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay())
        to = today
        break
      case 'month':
        from = new Date(today.getFullYear(), today.getMonth(), 1)
        to = today
        break
      case 'year':
        from = new Date(today.getFullYear(), 0, 1)
        to = today
        break
      default:
        break
    }

    onFilterChange({ type: value, from, to })
  }

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range)
    if (range.from && range.to) {
      onFilterChange({ 
        type: 'custom', 
        from: range.from,
        to: range.to
      })
    }
  }

  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 sm:items-center">
      <Select value={filterType} onValueChange={handleFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccionar período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Hoy</SelectItem>
          <SelectItem value="week">Esta Semana</SelectItem>
          <SelectItem value="month">Este Mes</SelectItem>
          <SelectItem value="year">Este Año</SelectItem>
          <SelectItem value="custom">Personalizado</SelectItem>
        </SelectContent>
      </Select>

      {filterType === 'custom' && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "dd/MM/yyyy", { locale: es })} -{" "}
                    {format(dateRange.to, "dd/MM/yyyy", { locale: es })}
                  </>
                ) : (
                  format(dateRange.from, "dd/MM/yyyy", { locale: es })
                )
              ) : (
                <span>Seleccionar fechas</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
              locale={es}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

