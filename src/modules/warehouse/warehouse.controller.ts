import { Warehouse } from '@modules/warehouse/warehouse.model'
import { WarehouseRepository } from '@modules/warehouse/warehouse.repository'
import { randomUUID } from 'crypto'

const throwErrorIfUserHasCreatedWarehouseToday = async (userId: string): Promise<void> => {
  const start = new Date(new Date().setHours(0, 0, 0, 0))
  const end = new Date(new Date().setHours(23, 59, 59, 0))

  const warehousesCreatedToday = await WarehouseRepository.getWarehousesCreatedTodayByUserId({ userId, start, end })
  if (warehousesCreatedToday.length) {
    // TODO: Throw a correctly formatted error
    throw new Error('Ya has creado un almacén hoy')
  }
}

const throwErrorIfThereAreOtherWarehousesNearby = async (location: { lat: number; lng: number }): Promise<void> => {
  const existingWarehouse = await WarehouseRepository.getWarehouseByLocation(location)
  if (existingWarehouse) {
    throw new Error('Ya existe un almacén en esta ubicación')
  }
}

// REMOVE: This is a mock implementation
let mockedSequence = 0
const getNextWarehouseCode = async (): Promise<string> => {
  // const sequenceRef = doc(collection(db, WAREHOUSE_SEQUENCES_COLLECTION), 'warehouse')

  // try {
  //   const sequenceDoc = await getDoc(sequenceRef)
  //   let sequence = 1

  //   if (sequenceDoc.exists()) {
  //     sequence = sequenceDoc.data().currentValue + 1
  //   }

  //   await setDoc(sequenceRef, { currentValue: sequence })

  //   return sequence.toString().padStart(3, '0')
  // } catch (error) {
  //   console.error('Error getting warehouse sequence:', error)
  //   throw new Error('Error generando el código del almacén')
  // }

  return (++mockedSequence).toString().padStart(3, '0')
}

interface CreateWarehouseProps {
  name: string
  lat: number
  lng: number
  userId: string
}

const createWarehouse = async ({ name, lat, lng, userId }: CreateWarehouseProps): Promise<Warehouse> => {
  console.dir({ name, lat, lng, userId }, { depth: null })

  await throwErrorIfUserHasCreatedWarehouseToday(userId)
  await throwErrorIfThereAreOtherWarehousesNearby({ lat, lng })

  try {
    // Get sequential code for the warehouse
    const warehouseCode = await getNextWarehouseCode()

    const warehouse: Warehouse = {
      id: randomUUID(),
      code: warehouseCode,
      name,
      // REFACTOR: Include the address in the location object once it's provided in the request.
      location: { lat, lng, address: '' },
      createdBy: userId,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    console.dir({ method: 'createWarehouse controller', warehouse }, { depth: null })

    return await WarehouseRepository.createWarehouse(warehouse)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Error al crear el almacén')
  }
}

// export const getWarehouse = async (id: string): Promise<Warehouse | null> => {
//   const warehouseRef = doc(collection(db, WAREHOUSES_COLLECTION), id)
//   const warehouseDoc = await getDoc(warehouseRef)

//   if (!warehouseDoc.exists()) {
//     return null
//   }

//   return {
//     id: warehouseDoc.id,
//     ...warehouseDoc.data()
//   } as Warehouse
// }

const getWarehouses = async (): Promise<Array<Warehouse>> => {
  // return await WarehouseRepository.getWarehouses()

  return Promise.resolve([
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
  ])
}

export const WarehouseController = {
  createWarehouse,
  getWarehouses
}
