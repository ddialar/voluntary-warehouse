'use client'

import { Warehouse } from '@modules/warehouse/warehouse.model'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { ActiveWarehousePopup } from './components'
import { NewLocationPopup } from './components/NewLocationPopup'
import { DefaultIcon } from './components/icons'

type IconDefaultPrototype = typeof L.Icon.Default.prototype & {
  _getIconUrl?: (name: string) => string
}

// Leaflet icons configuration
delete (L.Icon.Default.prototype as IconDefaultPrototype)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src
})

interface LeafletMapProps {
  center: [number, number]
  warehouses: Warehouse[]
  userLocation: [number, number] | null
  onEnroll: (warehouse: Warehouse) => void
  onUnenroll: (warehouse: Warehouse) => void
  onCreateWarehouse: (location: { lat: number; lng: number }) => void
  onCreateOrder: (location: { lat: number; lng: number }) => void
}

const Map = ({
  center,
  warehouses,
  userLocation,
  onEnroll,
  onUnenroll,
  onCreateWarehouse,
  onCreateOrder
}: LeafletMapProps) => {
  const t = useTranslations()
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const tempMarkerRef = useRef<L.Marker | null>(null)

  const newMarkerTranslations = {
    createWarehouse: t('warehouse.popup.createWarehouse'),
    createOrder: t('warehouse.popup.createOrder')
  }

  const createWarehousePopup = useCallback(
    (warehouse: Warehouse): HTMLElement => {
      const container = document.createElement('div')
      const root = createRoot(container)

      root.render(
        <ActiveWarehousePopup
          title={`${warehouse.code} - ${warehouse.name}`}
          address={warehouse.address}
          onEnroll={() => onEnroll(warehouse)}
          onUnenroll={() => onUnenroll(warehouse)}
          translations={{
            enroll: t('warehouse.popup.enroll'),
            unenroll: t('warehouse.popup.unenroll')
          }}
        />
      )

      return container
    },
    [onEnroll, onUnenroll, t]
  )

  useEffect(() => {
    console.log('Initializing map with center:', center)

    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false,
        minZoom: 5,
        maxZoom: 25
      }).setView(center, 18)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 30
      }).addTo(mapRef.current)

      // Adding click event to create temporary markers
      mapRef.current.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng

        // Remove previous temporary marker
        if (tempMarkerRef.current) {
          tempMarkerRef.current.remove()
        }

        // Create new temporary marker
        tempMarkerRef.current = L.marker([lat, lng], { icon: DefaultIcon }).addTo(mapRef.current!)

        tempMarkerRef.current.on('popupclose', () => {
          if (tempMarkerRef.current) {
            tempMarkerRef.current.remove()
            tempMarkerRef.current = null
          }
        })

        // Create the popup container
        const popupContainer = document.createElement('div')

        // Create the React root
        const root = createRoot(popupContainer)

        // Render the popup component
        root.render(
          <NewLocationPopup
            lat={lat}
            lng={lng}
            onCreateWarehouse={() => {
              onCreateWarehouse?.({ lat, lng })
              if (tempMarkerRef.current) {
                tempMarkerRef.current.closePopup()
              }
            }}
            onCreateOrder={() => {
              onCreateOrder?.({ lat, lng })
              if (tempMarkerRef.current) {
                tempMarkerRef.current.closePopup()
              }
            }}
            translations={newMarkerTranslations}
          />
        )

        tempMarkerRef.current.bindPopup(popupContainer).openPopup()
      })

      console.log('Map initialized:', mapRef.current)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, mapRef.current.getZoom())
    }
  }, [center])

  useEffect(() => {
    if (!mapRef.current) return

    // Removing current markers
    mapRef.current.eachLayer(layer => {
      if (layer instanceof L.Marker || layer instanceof L.Circle) {
        layer.remove()
      }
    })

    // Add user location circle in case there is one
    if (userLocation) {
      L.circle(userLocation, {
        radius: 50,
        color: 'blue',
        fillColor: 'blue'
      }).addTo(mapRef.current)
    }

    // Add warehouse markers
    warehouses.forEach(warehouse => {
      L.marker([warehouse.lat, warehouse.lng], { icon: DefaultIcon })
        .bindPopup(createWarehousePopup(warehouse))
        .addTo(mapRef.current!)
    })
  }, [warehouses, userLocation, createWarehousePopup])

  return <div ref={mapContainerRef} className="h-full w-full" />
}

export default Map
