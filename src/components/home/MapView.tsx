"use client"

import { useState, useEffect } from 'react'
import { LatLngExpression } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
// import { Button } from '@/components/ui/button'
// import { 
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger 
// } from '@/components/ui/dialog'
import { Warehouse } from '@/core/domain/models/warehouse.model'
// import { getUserLocation } from '@/core/services/location.service'
// import { associateWithWarehouse } from '@/core/services/association.service'
// import { useToast } from '@/components/ui/use-toast'
// import { CreateWarehouseForm } from '../warehouse/CreateWarehouseForm'

interface MapViewProps {
  warehouses: Warehouse[];
  onWarehouseCreate: () => void;
}

const MOCKED_LOCATION: LatLngExpression = [39.396457, -0.413798]

const LocationControl = () => {
  const map = useMap()
  
  const centerToUserLocation = async () => {
    try {
      // const location = await getUserLocation()
      const location = {
        lat: MOCKED_LOCATION[0],
        lng: MOCKED_LOCATION[1]
      }
      map.setView([location.lat, location.lng], 15)
    } catch (error) {
      console.error('Error getting user location:', error)
    }
  }

  return (
    <div className="leaflet-bottom leaflet-right p-4">
      <button
        onClick={centerToUserLocation}
        className="bg-white shadow-lg"
      >
        Mi Ubicación
      </button>
      {/* <Button 
        onClick={centerToUserLocation}
        className="bg-white shadow-lg"
      >
        Mi Ubicación
      </Button> */}
    </div>
  )
}

export const MapView = ({ warehouses }: MapViewProps) => {
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null)
  // const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null)
  // const { toast } = useToast()

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        // const location = await getUserLocation()
        const location = {
        lat: MOCKED_LOCATION[0],
        lng: MOCKED_LOCATION[1]
      }
        setUserLocation([location.lat, location.lng])
      } catch (error) {
        console.error('Error getting user location:', error)
      }
    }

    initializeLocation()
  }, [])

  // const handleWarehouseAssociation = async (warehouse: Warehouse) => {
  //   try {
  //     await associateWithWarehouse(warehouse.id)
  //     toast({
  //       title: 'Asociación exitosa',
  //       description: `Te has asociado al almacén ${warehouse.name}`,
  //     })
  //   } catch (error) {
  //     toast({
  //       title: 'Error',
  //       description: (error as Error).message,
  //       variant: 'destructive',
  //     })
  //   }
  // }

  return (
    <div className="h-screen relative">
      <MapContainer

        center={userLocation || [39.396457, -0.413798]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        <LocationControl />
        
        {warehouses.map(warehouse => (
          <Marker
            key={warehouse.id}
            position={[warehouse.location.lat, warehouse.location.lng]}
            eventHandlers={{
              // click: () => setSelectedWarehouse(warehouse)
              click: () => console.log(warehouse)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{warehouse.name}</h3>
                <p className="text-sm">{warehouse.location.address}</p>
                {/* <Button
                  onClick={() => handleWarehouseAssociation(warehouse)}
                  className="mt-2 w-full"
                >
                  Asociarme
                </Button> */}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* <div className="absolute top-4 right-4 z-[1000]">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Crear Almacén</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Almacén</DialogTitle>
            </DialogHeader>
            <CreateWarehouseForm onSuccess={onWarehouseCreate} />
          </DialogContent>
        </Dialog>
      </div> */}
    </div>
  )
}