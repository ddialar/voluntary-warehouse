'use client'

import { DEFAULT_LOCATION } from '@config'
import { ConfirmDialog } from '@modules/core/components'
import { toaster } from '@modules/core/components/toaster'
import { useWarehouses } from '@modules/warehouse/hooks'
import { Warehouse } from '@modules/warehouse/warehouse.model'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { CreateWarehouseDrawer } from './CreateWarehouseDrawer'

const Map = dynamic(() => import('./map/Map'), {
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center">Cargando mapa...</div>
})

interface MapViewProps {
  onWarehouseCreate: () => void
}

export const MapView = ({ onWarehouseCreate }: MapViewProps) => {
  const t = useTranslations()
  const { warehouses, enroll, unenroll, switchEnrollment, enrolledWarehouse } = useWarehouses()
  // REFACTOR Merge all these useState calls into a single object
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [newWarehouseLocation, setNewWarehouseLocation] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 })
  const [isConfirmSwitchWarehouseDialogOpen, setIsConfirmSwitchWarehouseDialogOpen] = useState(false)
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null)

  const handleEnrollUserAtWarehouse = async (warehouse: Warehouse) => {
    if (enrolledWarehouse) {
      setSelectedWarehouse(warehouse)
      setIsConfirmSwitchWarehouseDialogOpen(true)
      return
    }

    const toastId = toaster.loading(t('warehouse.toasts.enroll.loading'))

    const result = await enroll({ warehouseId: warehouse.id })

    if (result.success) {
      toaster.success(toastId, t('warehouse.toasts.enroll.success', { warehouse: warehouse.name }))
    } else {
      toaster.error(toastId, t('warehouse.toasts.enroll.error', { warehouse: warehouse.name }))
    }
  }

  const handleUnenrollUserFromWarehouse = async (warehouse: Warehouse) => {
    const toastId = toaster.loading(t('warehouse.toasts.unenroll.loading'))

    const result = await unenroll({ warehouseId: warehouse.id })
    if (result.success) {
      toaster.success(toastId, t('warehouse.toasts.unenroll.success', { warehouse: warehouse.name }))
    } else {
      toaster.error(toastId, t('warehouse.toasts.unenroll.error', { warehouse: warehouse.name }))
    }
  }

  const handleUserSwitchWarehouse = async () => {
    const toastId = toaster.loading(t('warehouse.toasts.switch.loading'))

    setIsConfirmSwitchWarehouseDialogOpen(false)

    const result = await switchEnrollment({
      prevWarehouseId: enrolledWarehouse!.id,
      nextWarehouseId: selectedWarehouse!.id
    })

    if (result.success) {
      toaster.success(toastId, t('warehouse.toasts.enroll.success', { warehouse: selectedWarehouse!.name }))
    } else {
      toaster.error(toastId, t('warehouse.toasts.enroll.error', { warehouse: selectedWarehouse!.name }))
    }
  }

  const onCreateWarehouse = (location: { lat: number; lng: number }) => {
    setNewWarehouseLocation(location)
    setIsDrawerOpen(true)
    console.dir({ method: 'onCreateWarehouse', isDrawerOpen, newWarehouseLocation }, { depth: null })
  }
  const onCreateOrder = (location: { lat: number; lng: number }) => {
    console.dir({ method: 'onCreateOrder', location }, { depth: null })
  }

  console.dir({ method: 'MapView component', warehouses }, { depth: null })

  return (
    <>
      <div className="h-screen w-full relative">
        <Map
          center={DEFAULT_LOCATION}
          warehouses={warehouses}
          userLocation={DEFAULT_LOCATION}
          onEnroll={handleEnrollUserAtWarehouse}
          onUnenroll={handleUnenrollUserFromWarehouse}
          onCreateWarehouse={onCreateWarehouse}
          onCreateOrder={onCreateOrder}
        />
      </div>
      <CreateWarehouseDrawer
        isOpen={isDrawerOpen && newWarehouseLocation !== undefined}
        onClose={() => setIsDrawerOpen(false)}
        location={newWarehouseLocation!}
      />
      <ConfirmDialog
        isOpen={isConfirmSwitchWarehouseDialogOpen}
        onClose={() => setIsConfirmSwitchWarehouseDialogOpen(false)}
        onConfirm={handleUserSwitchWarehouse}
        title={t('warehouse.dialogs.switchWarehouse.title')}
        question={t('warehouse.dialogs.switchWarehouse.question')}
        cancelText={t('common.cancel')}
        confirmText={t('common.confirm')}
      />
    </>
  )
}
