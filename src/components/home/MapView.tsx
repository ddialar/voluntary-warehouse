'use client'

import { useState, useEffect } from 'react'
// import { Button } from '@/components/ui/button'
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog'
// import { useToast } from '@/components/ui/use-toast'
import { Warehouse } from '@/core/domain/models/warehouse.model'
// import { CreateWarehouseForm } from '@/components/forms/CreateWarehouseForm'
// import { getUserLocation } from '@/core/services/location.service'
// import { associateWithWarehouse } from '@/core/services/association.service'
import dynamic from 'next/dynamic'
import { LatLngExpression } from 'leaflet'
import { calculateDistance } from '@/core/domain/services/distance.service'

const DEFAULT_LOCATION: LatLngExpression = [39.394972, -0.411931]

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center">Cargando mapa...</div>
})

interface MapViewProps {
  warehouses: Warehouse[];
  onWarehouseCreate: () => void;
}

// export const MapView = ({ warehouses, onWarehouseCreate }: MapViewProps) => {
export const MapView = ({ warehouses }: MapViewProps) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  // const { toast } = useToast()

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        // const location = await getUserLocation()
        const location = {
          lat: DEFAULT_LOCATION[0],
          lng: DEFAULT_LOCATION[1]
        }
        setUserLocation([location.lat, location.lng])
      } catch (error) {
        // toast({
        //   title: 'Error de ubicación',
        //   description: 'No se pudo obtener tu ubicación. Por favor, activa el GPS.',
        //   variant: 'destructive',
        // })
        console.log({
          title: 'Error de ubicación',
          description: 'No se pudo obtener tu ubicación. Por favor, activa el GPS.',
          variant: 'destructive',
          error
        })
      }
    }

    initializeLocation()
  // }, [toast])
  }, [])

  const handleWarehouseAssociation = async (warehouse: Warehouse) => {
    try {
      if (!userLocation) {
        throw new Error('No se pudo obtener tu ubicación')
      }

      const [lat, lng] = userLocation
      const distance = calculateDistance(
        { lat, lng },
        { lat: warehouse.location.lat, lng: warehouse.location.lng }
      )

      if (distance > 0.05) {
        throw new Error('Debes estar a menos de 50 metros del almacén para asociarte')
      }

      // await associateWithWarehouse(warehouse.id)
      // toast({
      //   title: 'Asociación exitosa',
      //   description: `Te has asociado al almacén ${warehouse.name}`,
      // })
      // onWarehouseCreate()
    } catch (error) {
      // toast({
      //   title: 'Error',
      //   description: error instanceof Error ? error.message : 'Error al asociarse al almacén',
      //   variant: 'destructive',
      // })
      console.log({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error al asociarse al almacén',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="h-screen relative">
      <div className="h-full">
        <Map
          center={userLocation || [39.4699, -0.3763]}
          warehouses={warehouses}
          userLocation={userLocation}
          onWarehouseSelect={handleWarehouseAssociation}
        />
      </div>

      {/* <div className="absolute top-4 right-4 z-[1000]">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Crear Almacén</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Almacén</DialogTitle>
            </DialogHeader>
            <CreateWarehouseForm
              userLocation={userLocation}
              onSuccess={() => {
                onWarehouseCreate()
                toast({
                  title: 'Almacén creado',
                  description: 'El almacén se ha creado correctamente',
                })
              }}
            />
          </DialogContent>
        </Dialog>
      </div> */}
    </div>
  )
}
