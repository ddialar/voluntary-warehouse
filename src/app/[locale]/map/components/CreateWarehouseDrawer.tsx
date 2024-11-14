'use client'

import { Drawer } from 'vaul'
import { CreateWarehouseForm } from './CreateWarehouseForm'

interface CreateWarehouseDrawerProps {
  isOpen: boolean
  onClose: () => void
  location: { lat: number; lng: number }
}

export const CreateWarehouseDrawer = ({ isOpen, onClose, location }: CreateWarehouseDrawerProps) => (
  <Drawer.Root direction="right" open={isOpen} onOpenChange={onClose}>
    <Drawer.Portal>
      <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[1000]" />
      <Drawer.Content className="fixed bottom-0 right-0 h-full w-full sm:max-w-[400px] bg-white z-[1100]">
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-4">
            <Drawer.Title className="text-lg font-semibold">Crear Nuevo Almacén</Drawer.Title>
          </div>
          <CreateWarehouseForm location={location} onClose={onClose} />
        </div>
      </Drawer.Content>
    </Drawer.Portal>
  </Drawer.Root>
)
