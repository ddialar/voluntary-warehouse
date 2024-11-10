import { CreateWarehouseForm } from "../warehouse/CreateWarehouseForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/dialog"
import { Button } from "../shadcn/button"

interface NewWarehouseDialogProps {
  onWarehouseCreate: () => void;
}

export const NewWarehouseDialog = ({ onWarehouseCreate }: NewWarehouseDialogProps) =>
  <Dialog>
    <DialogTrigger asChild>
      <Button variant={"outline"}>Crear Almacén</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Crear Nuevo Almacén</DialogTitle>
      </DialogHeader>
      <CreateWarehouseForm
        onSuccess={() => {
          onWarehouseCreate()
          // toast({
          //   title: 'Almacén creado',
          //   description: 'El almacén se ha creado correctamente',
          // })
          console.log({
            title: 'Almacén creado',
            description: 'El almacén se ha creado correctamente',
          })
        }}
      />
    </DialogContent>
  </Dialog>