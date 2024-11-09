"use client"

import { redirect } from 'next/navigation'
// import { getServerSession } from 'next-auth'
import { MapView } from '@/components/home/MapView'
import { Warehouse } from '@/core/domain/models/warehouse.model'
// import { getWarehouses } from '@/core/services/warehouse.service'
// import { checkUserAssociation } from '@/core/services/association.service'

export default function HomePage() {
  // const session = await getServerSession()
  // if (!session) redirect('/login')

  // const userAssociation = await checkUserAssociation(session.user.id)
  // if (userAssociation) redirect('/dashboard')

  // const warehouses = await getWarehouses()
  const warehouses: Warehouse[] = []

  return (
    <main>
      <MapView 
        warehouses={warehouses} 
        onWarehouseCreate={() => redirect('/dashboard')} 
      />
    </main>
  )
}