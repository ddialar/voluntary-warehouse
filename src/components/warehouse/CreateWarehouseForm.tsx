import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/shadcn/input'
import { Button } from '@/components/shadcn/button'
import { createWarehouse } from '@/core/services/warehouse.service'
// import { getUserLocation } from '@/core/services/location.service'
import { toaster } from '@/components/toaster'

const createWarehouseSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  address: z.string().min(1, 'La dirección es requerida'),
})

type CreateWarehouseData = z.infer<typeof createWarehouseSchema>;

interface CreateWarehouseFormProps {
  onSuccess: () => void;
}

export const CreateWarehouseForm = ({ onSuccess }: CreateWarehouseFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<CreateWarehouseData>({
    resolver: zodResolver(createWarehouseSchema),
    defaultValues: {
      name: 'Testing',
      address: 'Calle de Santiago Miralles, 17, 46470, Albal, Valencia',
    }
  })

  const onSubmit = async (data: CreateWarehouseData) => {
    try {
      setIsSubmitting(true)
      const toasterId = toaster.loading('Creando almacén ...')
      // const location = await getUserLocation()

      console.dir({ data, location }, { depth: null })
      
      await createWarehouse({
          name: data.name,
          location: {
            // ...location,
            address: data.address,
          },
          // REFACTOR: It's required to obtain the user id from the session
          userId: 'testing-user-id',
      })

      toaster.success(toasterId, 'El almacén se ha creado correctamente')

      onSuccess()
    } catch (error) {
      toaster.directError((error as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          placeholder="Nombre del almacén"
          {...form.register('name')}
        />
        {form.formState.errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Dirección"
          {...form.register('address')}
        />
        {form.formState.errors.address && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.address.message}
          </p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creando...' : 'Crear Almacén'}
      </Button>
    </form>
  )
}