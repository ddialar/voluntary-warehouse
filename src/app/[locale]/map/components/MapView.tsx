'use client'

// import { associateWithWarehouse } from '@/core/services/association.service'
import { toaster } from '@modules/core/components/toaster'
import { useWarehouses } from '@modules/warehouse/hooks'
import { Warehouse } from '@modules/warehouse/warehouse.model'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { CreateWarehouseDrawer } from './CreateWarehouseDrawer'

const DEFAULT_LOCATION: [number, number] = [39.394972, -0.411931]

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center">Cargando mapa...</div>
})

interface MapViewProps {
  onWarehouseCreate: () => void
}

export const MapView = ({ onWarehouseCreate }: MapViewProps) => {
  const { warehouses } = useWarehouses()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [newWarehouseLocation, setNewWarehouseLocation] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 })

  const handleWarehouseAssociation = async (warehouse: Warehouse) => {
    const toastId = toaster.loading('Asociando almacén...')

    try {
      // await associateWithWarehouse({ userId: 'testing-user-id', warehouseId: warehouse.id })
      toaster.success(toastId, `Te has asociado al almacén ${warehouse.name}`)
      onWarehouseCreate()
    } catch (error) {
      toaster.error(toastId, error instanceof Error ? error.message : 'Error al asociarse al almacén')
    }
  }

  const onCreateWarehouse = (location: { lat: number; lng: number }) => {
    setNewWarehouseLocation(location)
    setIsDrawerOpen(true)
    console.dir({ method: 'onCreateWarehouse', isDrawerOpen, newWarehouseLocation }, { depth: null })
  }
  const onCreateOrder = (location: { lat: number; lng: number }) => {
    console.dir({ method: 'onCreateOrder', location }, { depth: null })
  }

  console.dir({ method: 'MapView component', warehouses }, { depth: null })

  return (
    <>
      <div className="h-screen w-full relative">
        <Map
          center={DEFAULT_LOCATION}
          warehouses={warehouses}
          userLocation={DEFAULT_LOCATION}
          onWarehouseSelect={handleWarehouseAssociation}
          onCreateWarehouse={onCreateWarehouse}
          onCreateOrder={onCreateOrder}
        />
      </div>
      <div className="absolute top-4 right-4 z-[1000]">
        <CreateWarehouseDrawer
          isOpen={isDrawerOpen && newWarehouseLocation !== undefined}
          onClose={() => setIsDrawerOpen(false)}
          location={newWarehouseLocation!}
        />
      </div>
    </>
  )
}
