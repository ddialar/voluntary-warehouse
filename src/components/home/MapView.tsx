'use client'

import dynamic from 'next/dynamic'
import { Warehouse } from '@/core/domain/models/warehouse.model'
import { associateWithWarehouse } from '@/core/services/association.service'
import { NewWarehouseDialog } from '../dialogs/NewWarehouseDialog'
import { toaster } from '../toaster'

const DEFAULT_LOCATION: [number, number] = [39.394972, -0.411931]

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center">Cargando mapa...</div>
})

interface MapViewProps {
  warehouses: Warehouse[];
  onWarehouseCreate: () => void;
}

export const MapView = ({ warehouses, onWarehouseCreate }: MapViewProps) => {
  // const [isDialogOpen, setIsDialogOpen] = useState(false)
  // const { toast } = useToast()

  const handleWarehouseAssociation = async (warehouse: Warehouse) => {
    const toastId = toaster.loading('Asociando almacén...')

    try {
      await associateWithWarehouse({ userId: 'testing-user-id', warehouseId: warehouse.id })
      toaster.success(toastId, `Te has asociado al almacén ${warehouse.name}`)
      onWarehouseCreate()

    } catch (error) {
      toaster.error(toastId, error instanceof Error ? error.message : 'Error al asociarse al almacén')
    }
  }

  return (
    <>
      <div className="absolute top-4 right-4 z-[1000]">
        <NewWarehouseDialog
          onWarehouseCreate={onWarehouseCreate}
        />
      </div>
      <div className="h-screen relative">
        <Map
          center={DEFAULT_LOCATION}
          warehouses={warehouses}
          userLocation={DEFAULT_LOCATION}
          onWarehouseSelect={handleWarehouseAssociation}
        />
      </div>
    </>
  )
}
