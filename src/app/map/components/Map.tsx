'use client'

import { Warehouse } from '@modules/warehouse/warehouse.model'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { NewLocationPopup } from './NewLocationPopup'

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
  onWarehouseSelect: (warehouse: Warehouse) => void
  onCreateWarehouse: (location: { lat: number; lng: number }) => void
  onCreateOrder: (location: { lat: number; lng: number }) => void
}

const Map = ({
  center,
  warehouses,
  userLocation,
  onWarehouseSelect,
  onCreateWarehouse,
  onCreateOrder
}: LeafletMapProps) => {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const tempMarkerRef = useRef<L.Marker | null>(null)

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
        tempMarkerRef.current = L.marker([lat, lng], {
          icon: L.icon({
            iconUrl: markerIcon.src,
            iconRetinaUrl: markerIcon2x.src,
            shadowUrl: markerShadow.src,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }).addTo(mapRef.current!)

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
      const marker = L.marker([warehouse.location.lat, warehouse.location.lng]).addTo(mapRef.current!)

      const popupContent = document.createElement('div')
      popupContent.className = 'p-2'

      const title = document.createElement('h3')
      title.className = 'font-bold'
      title.textContent = warehouse.name

      const address = document.createElement('p')
      address.className = 'text-sm mb-2'
      address.textContent = warehouse.location.address

      const button = document.createElement('button')
      button.className = 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full'
      button.textContent = 'Asociarme'
      button.onclick = () => onWarehouseSelect(warehouse)

      popupContent.appendChild(title)
      popupContent.appendChild(address)
      popupContent.appendChild(button)

      marker.bindPopup(popupContent)
    })
  }, [warehouses, userLocation, onWarehouseSelect])

  return <div ref={mapContainerRef} className="h-full w-full" />
}

export default Map
