// // import { db } from '@/lib/firebase'
// // import {
// //   collection,
// //   doc,
// //   setDoc,
// //   getDoc,
// //   query,
// //   where,
// //   getDocs,
// //   serverTimestamp,
// //   startOfDay,
// //   endOfDay,
// //   GeoPoint
// // } from 'firebase/firestore'
// import { Warehouse } from '@/core/domain/models/warehouse.model'
// import { randomUUID } from 'crypto'
// import { geocodeAddressWithRateLimit } from './location.service'
// import { WarehouseRepository } from '@/infrastructure/repository/warehouse.repository'

// // const WAREHOUSES_COLLECTION = 'warehouses'
// // const WAREHOUSE_SEQUENCES_COLLECTION = 'warehouse_sequences'

// const hasUserCreatedWarehouseToday = async (userId: string): Promise<boolean> => {
//   // const today = new Date()
//   // const start = startOfDay(today)
//   // const end = endOfDay(today)

//   // const warehousesRef = collection(db, WAREHOUSES_COLLECTION)
//   // const q = query(
//   //   warehousesRef,
//   //   where('createdBy', '==', userId),
//   //   where('createdAt', '>=', start),
//   //   where('createdAt', '<=', end)
//   // )

//   // const querySnapshot = await getDocs(q)
//   // return !querySnapshot.empty

//   return false
// }

// // REMOVE: This is a mock implementation
// let mockedSequence = 0
// const getNextWarehouseCode = async (): Promise<string> => {
//   // const sequenceRef = doc(collection(db, WAREHOUSE_SEQUENCES_COLLECTION), 'warehouse')

//   // try {
//   //   const sequenceDoc = await getDoc(sequenceRef)
//   //   let sequence = 1

//   //   if (sequenceDoc.exists()) {
//   //     sequence = sequenceDoc.data().currentValue + 1
//   //   }

//   //   await setDoc(sequenceRef, { currentValue: sequence })

//   //   return sequence.toString().padStart(3, '0')
//   // } catch (error) {
//   //   console.error('Error getting warehouse sequence:', error)
//   //   throw new Error('Error generando el código del almacén')
//   // }

//   return (++mockedSequence).toString().padStart(3, '0')
// }

// const getWarehouseByLocation = async (location: { lat: number; lng: number }): Promise<Warehouse | null> => {
//   // const warehousesRef = collection(db, WAREHOUSES_COLLECTION)
//   // const radius = 0.05 // 50 meters in degrees approximately

//   // const q = query(
//   //   warehousesRef,
//   //   where('geopoint', '>=', new GeoPoint(location.lat - radius, location.lng - radius)),
//   //   where('geopoint', '<=', new GeoPoint(location.lat + radius, location.lng + radius))
//   // )

//   // const querySnapshot = await getDocs(q)

//   // if (querySnapshot.empty) {
//   //   return null
//   // }

//   // const warehouse = querySnapshot.docs[0].data() as Warehouse
//   // return warehouse

//   return Promise.resolve(null)
// }

// interface CreateWarehouseProps {
//   name: string;
//   location: {
//     address: string;
//   };
//   userId: string
// }

// // NOTE: YLH Tienes que restructurar los archivos por caso de uso y esto debería convertirse en un handler y en un controller.

// export const createWarehouse = async ({ name, location, userId }: CreateWarehouseProps): Promise<void> => {

//   console.dir({ name, location, userId }, { depth: null })

//   // Check if the user has already created a warehouse today
//   const hasCreatedToday = await hasUserCreatedWarehouseToday(userId)
//   if (hasCreatedToday) {
//     throw new Error('Ya has creado un almacén hoy')
//   }

//   // Get sequential code for the warehouse
//   const warehouseCode = await getNextWarehouseCode()

//   try {
//     const geocodedLocation = await geocodeAddressWithRateLimit(location.address)

//     console.dir({ address: location.address, geocodedLocation }, { depth: null })

//     // Check if a warehouse already exists at that location
//     const existingWarehouse = await getWarehouseByLocation(geocodedLocation)
//     if (existingWarehouse) {
//       throw new Error('Ya existe un almacén en esta ubicación')
//     }

//     // NOTE: This definition of the document ID could be the rule for the test of entities in order to standarize the process for future database migrations.
//     const warehouseRef = { id: randomUUID() }
//     const warehouse: Warehouse = {
//       id: warehouseRef.id,
//       code: warehouseCode,
//       name,
//       location: {
//         ...geocodedLocation,
//         address: location.address
//       },
//       createdBy: userId,
//       active: true,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     }

//     console.dir({ warehouse }, { depth: null })

//     await WarehouseRepository.createWarehouse(warehouse)
//   } catch (error) {
//     if (error instanceof Error) {
//       throw error
//     }
//     throw new Error('Error al crear el almacén')
//   }
// }

// // export const getWarehouse = async (id: string): Promise<Warehouse | null> => {
// //   const warehouseRef = doc(collection(db, WAREHOUSES_COLLECTION), id)
// //   const warehouseDoc = await getDoc(warehouseRef)

// //   if (!warehouseDoc.exists()) {
// //     return null
// //   }

// //   return {
// //     id: warehouseDoc.id,
// //     ...warehouseDoc.data()
// //   } as Warehouse
// // }

// export const getWarehouses = async (): Promise<Array<Warehouse>> => {
//   // TODO: Request all warehouses from storage
//   // return await WarehouseRepository.getWarehouses()

//   return Promise.resolve([
//     {
//       id: "1",
//       code: "PAI",
//       name: "Almacén Paiporta Principal",
//       location: {
//         lat: 39.4286,
//         lng: -0.4175,
//         address: "Polígono Industrial La Pascualeta, Paiporta"
//       },
//       createdBy: "system",
//       active: true,
//       createdAt: new Date("2024-01-01"),
//       updatedAt: new Date("2024-01-01")
//     },
//     {
//       id: "2",
//       code: "CAT",
//       name: "Centro Logístico Catarroja",
//       location: {
//         lat: 39.4036,
//         lng: -0.4027,
//         address: "Polígono Industrial El Bony, Catarroja"
//       },
//       createdBy: "system",
//       active: true,
//       createdAt: new Date("2024-01-02"),
//       updatedAt: new Date("2024-01-02")
//     },
//     {
//       id: "3",
//       code: "ALF",
//       name: "Almacén Alfafar",
//       location: {
//         lat: 39.4225,
//         lng: -0.3775,
//         address: "Polígono Industrial Rabisancho, Alfafar"
//       },
//       createdBy: "system",
//       active: true,
//       createdAt: new Date("2024-01-03"),
//       updatedAt: new Date("2024-01-03")
//     },
//     {
//       id: "4",
//       code: "SED",
//       name: "Centro Distribución Sedaví",
//       location: {
//         lat: 39.4256,
//         lng: -0.3839,
//         address: "Polígono Industrial Sedaví, Av. del Mediterráneo"
//       },
//       createdBy: "system",
//       active: true,
//       createdAt: new Date("2024-01-04"),
//       updatedAt: new Date("2024-01-04")
//     },
//     {
//       id: "5",
//       code: "ALB",
//       name: "Almacén Albal Norte",
//       location: {
//         lat: 39.3947,
//         lng: -0.4119,
//         address: "Polígono Industrial Juan Peris, Albal"
//       },
//       createdBy: "system",
//       active: true,
//       createdAt: new Date("2024-01-05"),
//       updatedAt: new Date("2024-01-05")
//     },
//     {
//       id: "6",
//       code: "TOR",
//       name: "Logística Torrent Mas del Jutge",
//       location: {
//         lat: 39.4320,
//         lng: -0.4477,
//         address: "Polígono Industrial Mas del Jutge, Torrent"
//       },
//       createdBy: "system",
//       active: true,
//       createdAt: new Date("2024-01-06"),
//       updatedAt: new Date("2024-01-06")
//     },
//     {
//       id: "7",
//       code: "TO2",
//       name: "Centro Logístico Torrent Sur",
//       location: {
//         lat: 39.4173,
//         lng: -0.4594,
//         address: "Polígono Industrial El Toll i L'Alberca, Torrent"
//       },
//       createdBy: "system",
//       active: false,
//       createdAt: new Date("2024-01-07"),
//       updatedAt: new Date("2024-01-07")
//     },
//     {
//       id: "8",
//       code: "PIC",
//       name: "Almacén Picanya Principal",
//       location: {
//         lat: 39.4359,
//         lng: -0.4336,
//         address: "Polígono Industrial Alquería de Moret, Picanya"
//       },
//       createdBy: "system",
//       active: true,
//       createdAt: new Date("2024-01-08"),
//       updatedAt: new Date("2024-01-08")
//     },
//     {
//       id: "9",
//       code: "PA2",
//       name: "Almacén Paiporta Sur",
//       location: {
//         lat: 39.4234,
//         lng: -0.4147,
//         address: "Polígono Industrial La Mina, Paiporta"
//       },
//       createdBy: "system",
//       active: true,
//       createdAt: new Date("2024-01-09"),
//       updatedAt: new Date("2024-01-09")
//     },
//     {
//       id: "10",
//       code: "PI2",
//       name: "Centro Logístico Picanya Sur",
//       location: {
//         lat: 39.4312,
//         lng: -0.4367,
//         address: "Polígono Industrial Faitanar, Picanya"
//       },
//       createdBy: "system",
//       active: true,
//       createdAt: new Date("2024-01-10"),
//       updatedAt: new Date("2024-01-10")
//     }
//   ])
// }

export {}
