"use client"

// import { redirect } from 'next/navigation'
import { MapView } from '@/components/home/MapView'
import { Warehouse } from '@/core/domain/models/warehouse.model'

interface HomeClientProps {
  warehouses: Warehouse[]
}

export function HomeClient({ warehouses }: HomeClientProps) {
  return (
    <main>
      <MapView 
        warehouses={warehouses} 
        // onWarehouseCreate={() => redirect('/dashboard')} 
        onWarehouseCreate={() => console.log('Redirecting to /dashboard')} 
      />
    </main>
  )
}