'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { toaster } from '@modules/core/components/toaster'
import { useWarehouses } from '@modules/warehouse/hooks'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createWarehouseSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  lat: z.number(),
  lng: z.number()
})

export type CreateWarehouseFormData = z.infer<typeof createWarehouseSchema>

interface CreateWarehouseFormProps {
  location: { lat: number; lng: number }
  onClose: () => void
}

export const CreateWarehouseForm = ({ location, onClose }: CreateWarehouseFormProps) => {
  const t = useTranslations()
  const { create: createWarehouse } = useWarehouses()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateWarehouseFormData>({
    resolver: zodResolver(createWarehouseSchema),
    values: {
      name: '',
      lat: location.lat,
      lng: location.lng
    }
  })

  const onSubmitForm = async (data: CreateWarehouseFormData) => {
    await onSubmit(data)
  }

  const onSubmit = async (data: CreateWarehouseFormData) => {
    setIsSubmitting(true)
    const toasterId = toaster.loading(t('warehouse.create.toasts.creating'))

    const result = await createWarehouse(data)
    if (result.success) {
      // toaster.success(toasterId, 'Almacén creado correctamente')
      toaster.success(toasterId, t('warehouse.create.toasts.creationSuceess'))
    } else {
      // toaster.error(toasterId, 'Error al crear el almacén')
      toaster.error(toasterId, t('warehouse.create.toasts.creationError'))
    }

    reset()
    onClose()
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col h-full">
      <div className="flex-grow space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            {t('warehouse.create.form.title')}
          </label>
          <input
            id="name"
            {...register('name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent"
            placeholder={t('warehouse.create.form.namePlaceholder')}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <input type="hidden" {...register('lat', { value: location.lat })} />
        <input type="hidden" {...register('lng', { value: location.lng })} />

        {location && (
          <div className="text-sm text-gray-500">
            <p>
              {t('common.latitude')}: {location.lat.toFixed(6)}
            </p>
            <p>
              {t('common.longitude')}: {location.lng.toFixed(6)}
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-6 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 
            bg-white border border-gray-300 rounded-md hover:bg-gray-50 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {t('common.cancel')}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 text-sm font-medium text-white 
            bg-blue-600 rounded-md hover:bg-blue-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('common.creating') : t('common.create')}
        </button>
      </div>
    </form>
  )
}
