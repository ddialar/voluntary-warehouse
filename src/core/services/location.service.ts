// import { Location } from '@/core/domain/models/warehouse.model'
// import { calculateDistance } from '@/core/domain/services/distance.service'

// export const getUserLocation = async (): Promise<Location> => {
//   console.log('Ejecutando getUserLocation ...')

//   return new Promise((resolve, reject) => {
//     console.dir({ geoloc: navigator.geolocation }, { depth: null })

//     if (!navigator.geolocation) {
//       console.log('Devolviendo error ...')
//       reject(new Error('La geolocalización no está soportada en este navegador.'))
//       return
//     }

//     console.log('Cogiendo posición del navegador ...')

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         console.dir({ message: 'Posición obtenida', position }, { depth: null })
//         resolve({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//           address: '' // Address will be empty due to it's not needed at this moment
//         })
//       },
//       (error) => {
//         console.dir({ error }, { depth: null })
//         let errorMessage = 'Error desconocido al obtener la ubicación'

//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage = 'No has dado permiso para acceder a tu ubicación.'
//             break
//           case error.POSITION_UNAVAILABLE:
//             errorMessage = 'La información de ubicación no está disponible.'
//             break
//           case error.TIMEOUT:
//             errorMessage = 'Se ha agotado el tiempo de espera al solicitar la ubicación.'
//             break
//         }

//         reject(new Error(errorMessage))
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0
//       }
//     )
//   })
// }

// export const isLocationWithinRange = (
//   center: Location,
//   point: Location,
//   radiusKm: number
// ): boolean => {
//   const distance = calculateDistance(center, point)
//   return distance <= radiusKm
// }

// interface NominatimResponse {
//   lat: string;
//   lon: string;
//   display_name: string;
// }

// export const geocodeAddress = async (address: string): Promise<Location> => {
//   try {
//     const encodedAddress = encodeURIComponent(address)
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`,
//       {
//         headers: {
//           'User-Agent': 'EmergencyAidPlatform/1.0' // Es importante identificar tu aplicación
//         }
//       }
//     )

//     if (!response.ok) {
//       throw new Error('Error en el servicio de geocodificación')
//     }

//     const data: NominatimResponse[] = await response.json()

//     if (!data.length) {
//       throw new Error('No se encontró la dirección especificada')
//     }

//     return {
//       lat: parseFloat(data[0].lat),
//       lng: parseFloat(data[0].lon),
//       address: data[0].display_name
//     }
//   } catch (error) {
//     console.error('Geocoding error:', error)
//     throw new Error('Error al obtener las coordenadas de la dirección')
//   }
// }

// // Utility function to add delay between requests
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// // Rate limiting version
// export const geocodeAddressWithRateLimit = async (address: string): Promise<Location> => {
//   await delay(1000) // Wait 1 second between requests to respect the rate limit
//   return geocodeAddress(address)
// }

export {}
