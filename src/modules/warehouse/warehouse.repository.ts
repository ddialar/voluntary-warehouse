// import { db } from '@/lib/firebase'
// import {
//   collection,
//   doc,
//   setDoc,
//   getDoc,
//   query,
//   where,
//   getDocs,
//   serverTimestamp,
//   startOfDay,
//   endOfDay,
//   GeoPoint
// } from 'firebase/firestore'

import { Warehouse } from './warehouse.model'

// REFACTOR: Remove this mock implementation once the database is connected
const warehousesObject: Record<'mockedWarehouses', Warehouse[]> = {
  mockedWarehouses: [
    {
      id: '1',
      code: 'PAI',
      name: 'Almacén Paiporta Principal',
      location: {
        lat: 39.4286,
        lng: -0.4175,
        address: 'Polígono Industrial La Pascualeta, Paiporta'
      },
      createdBy: 'system',
      active: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '2',
      code: 'CAT',
      name: 'Centro Logístico Catarroja',
      location: {
        lat: 39.4036,
        lng: -0.4027,
        address: 'Polígono Industrial El Bony, Catarroja'
      },
      createdBy: 'system',
      active: true,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    },
    {
      id: '3',
      code: 'ALF',
      name: 'Almacén Alfafar',
      location: {
        lat: 39.4225,
        lng: -0.3775,
        address: 'Polígono Industrial Rabisancho, Alfafar'
      },
      createdBy: 'system',
      active: true,
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03')
    },
    {
      id: '4',
      code: 'SED',
      name: 'Centro Distribución Sedaví',
      location: {
        lat: 39.4256,
        lng: -0.3839,
        address: 'Polígono Industrial Sedaví, Av. del Mediterráneo'
      },
      createdBy: 'system',
      active: true,
      createdAt: new Date('2024-01-04'),
      updatedAt: new Date('2024-01-04')
    },
    {
      id: '5',
      code: 'ALB',
      name: 'Almacén Albal Norte',
      location: {
        lat: 39.3947,
        lng: -0.4119,
        address: 'Polígono Industrial Juan Peris, Albal'
      },
      createdBy: 'system',
      active: true,
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05')
    },
    {
      id: '6',
      code: 'TOR',
      name: 'Logística Torrent Mas del Jutge',
      location: {
        lat: 39.432,
        lng: -0.4477,
        address: 'Polígono Industrial Mas del Jutge, Torrent'
      },
      createdBy: 'system',
      active: true,
      createdAt: new Date('2024-01-06'),
      updatedAt: new Date('2024-01-06')
    },
    {
      id: '7',
      code: 'TO2',
      name: 'Centro Logístico Torrent Sur',
      location: {
        lat: 39.4173,
        lng: -0.4594,
        address: "Polígono Industrial El Toll i L'Alberca, Torrent"
      },
      createdBy: 'system',
      active: false,
      createdAt: new Date('2024-01-07'),
      updatedAt: new Date('2024-01-07')
    },
    {
      id: '8',
      code: 'PIC',
      name: 'Almacén Picanya Principal',
      location: {
        lat: 39.4359,
        lng: -0.4336,
        address: 'Polígono Industrial Alquería de Moret, Picanya'
      },
      createdBy: 'system',
      active: true,
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-08')
    },
    {
      id: '9',
      code: 'PA2',
      name: 'Almacén Paiporta Sur',
      location: {
        lat: 39.4234,
        lng: -0.4147,
        address: 'Polígono Industrial La Mina, Paiporta'
      },
      createdBy: 'system',
      active: true,
      createdAt: new Date('2024-01-09'),
      updatedAt: new Date('2024-01-09')
    },
    {
      id: '10',
      code: 'PI2',
      name: 'Centro Logístico Picanya Sur',
      location: {
        lat: 39.4312,
        lng: -0.4367,
        address: 'Polígono Industrial Faitanar, Picanya'
      },
      createdBy: 'system',
      active: true,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    }
  ]
}

// const WAREHOUSES_COLLECTION = 'warehouses'
// const WAREHOUSE_SEQUENCES_COLLECTION = 'warehouse_sequences'

const createWarehouse = async (warehouse: Warehouse): Promise<Warehouse> => {
  // TODO: Create a new warehouse in storage
  // const warehouseRef = doc(collection(db, WAREHOUSES_COLLECTION))
  // await setDoc(warehouseRef, {
  //   ...warehouse,
  //   geopoint: new GeoPoint(geocodedLocation.lat, geocodedLocation.lng),
  //   createdAt: serverTimestamp(),
  //   updatedAt: serverTimestamp()
  // })

  console.dir({ method: 'createWarehouse repository', warehouse }, { depth: null })

  warehousesObject.mockedWarehouses = [...warehousesObject.mockedWarehouses, warehouse]

  console.log('>>>>>>> (createWarehouse) Almacenes almacenados:', warehousesObject.mockedWarehouses.length)

  return Promise.resolve(warehouse)
}

const getWarehouses = async (): Promise<Array<Warehouse>> => {
  // TODO: Request all warehouses from storage
  // const warehousesRef = collection(db, WAREHOUSES_COLLECTION)
  // const q = query(warehousesRef, where('active', '==', true))

  // const querySnapshot = await getDocs(q)
  // return querySnapshot.docs.map(doc => ({
  //   id: doc.id,
  //   ...doc.data()
  // } as Warehouse))

  // return await storageAdapter.getWarehouses()

  console.log('>>>>>>> (getWarehouses) Almacenes almacenados:', warehousesObject.mockedWarehouses.length)

  return Promise.resolve(warehousesObject.mockedWarehouses)
}

interface GetWarehousesCreatedTodayByUserIdParams {
  userId: string
  start: Date
  end: Date
}

const getWarehousesCreatedTodayByUserId = async ({
  userId,
  start,
  end
}: GetWarehousesCreatedTodayByUserIdParams): Promise<Array<Warehouse>> => {
  // const today = new Date()
  // const start = startOfDay(today)
  // const end = endOfDay(today)
  // const warehousesRef = collection(db, WAREHOUSES_COLLECTION)
  // const q = query(
  //   warehousesRef,
  //   where('createdBy', '==', userId),
  //   where('createdAt', '>=', start),
  //   where('createdAt', '<=', end)
  // )
  // const querySnapshot = await getDocs(q)
  // return !querySnapshot.empty

  return Promise.resolve(
    warehousesObject.mockedWarehouses.filter(
      ({ createdBy, createdAt }) => createdBy === userId && createdAt >= start && createdAt <= end
    )
  )
}

const getWarehouseByLocation = async (location: { lat: number; lng: number }): Promise<Warehouse | null> => {
  // const warehousesRef = collection(db, WAREHOUSES_COLLECTION)
  // const radius = 0.05 // 50 meters in degrees approximately

  // const q = query(
  //   warehousesRef,
  //   where('geopoint', '>=', new GeoPoint(location.lat - radius, location.lng - radius)),
  //   where('geopoint', '<=', new GeoPoint(location.lat + radius, location.lng + radius))
  // )

  // const querySnapshot = await getDocs(q)

  // if (querySnapshot.empty) {
  //   return null
  // }

  // const warehouse = querySnapshot.docs[0].data() as Warehouse
  // return warehouse

  return Promise.resolve(null)
}

export const WarehouseRepository = {
  createWarehouse,
  getWarehouses,
  getWarehousesCreatedTodayByUserId,
  getWarehouseByLocation
}
