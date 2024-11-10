// src/core/services/association.service.ts
// import { db } from '@/lib/firebase'
// import {
//   collection,
//   doc,
//   getDoc,
//   setDoc,
//   query,
//   where,
//   getDocs,
//   serverTimestamp,
//   updateDoc
// } from 'firebase/firestore'
// import { Warehouse } from '@/core/domain/models/warehouse.model'
// import { User } from '@/core/domain/models/user.model'

interface AssociateWithWarehouseParams {
  userId: string;
  warehouseId: string;
}

export const associateWithWarehouse = async ({ userId, warehouseId }: AssociateWithWarehouseParams): Promise<void> => {
  try {
    // TODO: Verify that the warehouse exists and is active
    // const warehouseRef = doc(collection(db, 'warehouses'), warehouseId)
    // const warehouseDoc = await getDoc(warehouseRef)

    // if (!warehouseDoc.exists()) {
    //   throw new Error('El almacén no existe')
    // }

    // const warehouse = warehouseDoc.data() as Warehouse
    // if (!warehouse.active) {
    //   throw new Error('El almacén no está activo')
    // }

    // TODO: Verify that the user has no active orders
    // const ordersQuery = query(
    //   collection(db, 'orders'),
    //   where('deliveredBy', '==', userId),
    //   where('status', 'in', ['en_preparacion', 'listo_entrega', 'en_entrega'])
    // )

    // const activeOrders = await getDocs(ordersQuery)
    // if (!activeOrders.empty) {
    //   throw new Error('No puedes cambiar de almacén mientras tengas pedidos activos')
    // }

    // TODO: Verify the distance between the user and the warehouse
    // const distance = calculateDistance(
    //   userLocation,
    //   {
    //     lat: warehouse.location.lat,
    //     lng: warehouse.location.lng
    //   }
    // )

    // if (distance > 0.05) { // 50 metros en kilómetros
    //   throw new Error('Debes estar a menos de 50 metros del almacén para asociarte')
    // }

    // TODO: Get the current user
    // const userRef = doc(collection(db, 'users'), userId)
    // const userDoc = await getDoc(userRef)

    // if (!userDoc.exists()) {
    //   throw new Error('Usuario no encontrado')
    // }

    // const user = userDoc.data() as User

    // TODO: If the user is already associated with a warehouse, create a historical record
    // if (user.currentWarehouseId) {
    //   const historyRef = doc(collection(db, 'warehouse_associations'))
    //   await setDoc(historyRef, {
    //     userId,
    //     warehouseId: user.currentWarehouseId,
    //     associatedAt: user.warehouseAssociationDate || serverTimestamp(),
    //     disassociatedAt: serverTimestamp()
    //   })
    // }

    // TODO: Update the user's association
    // await updateDoc(userRef, {
    //   currentWarehouseId: warehouseId,
    //   role: ['super_admin', 'admin'].includes(user.role) ? user.role : 'volunteer',
    //   warehouseAssociationDate: serverTimestamp(),
    //   updatedAt: serverTimestamp()
    // })

    // TODO: Register new association in the history
    // const newAssociationRef = doc(collection(db, 'warehouse_associations'))
    // await setDoc(newAssociationRef, {
    //   userId,
    //   warehouseId,
    //   associatedAt: serverTimestamp(),
    //   disassociatedAt: null
    // })

    // TODO: Create audit record
    // const auditRef = doc(collection(db, 'audit_logs'))
    // await setDoc(auditRef, {
    //   timestamp: serverTimestamp(),
    //   userId,
    //   action: 'warehouse_association',
    //   details: {
    //     warehouseId,
    //     previousWarehouseId: user.currentWarehouseId || null
    //   }
    // })
  } catch (error) {
    console.error('Error in associateWithWarehouse:', error)
    throw error
  }
}