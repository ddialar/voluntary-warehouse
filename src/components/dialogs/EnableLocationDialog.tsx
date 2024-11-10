import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../shadcn/dialog"
import { Button } from "../shadcn/button"

interface RequestLocationPermissionProps {
  isInstructionsDialogOpen: boolean
  setIsInstructionsDialogOpen: (value: boolean) => void
  isCheckingPermission: boolean
  checkPermission: () => Promise<void>
}

export const EnableLocationDialog = ({ isInstructionsDialogOpen, setIsInstructionsDialogOpen, isCheckingPermission, checkPermission }: RequestLocationPermissionProps) =>
  <Dialog 
    open={isInstructionsDialogOpen} 
    onOpenChange={setIsInstructionsDialogOpen}
  >
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Habilitar ubicación</DialogTitle>
        <DialogDescription>
          {'Por favor, habilita el acceso a tu ubicación en la barra de navegación y luego haz clic en "Volver a intentar"'}
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => setIsInstructionsDialogOpen(false)}
        >
          Cancelar
        </Button>
        <Button
          onClick={checkPermission}
          disabled={isCheckingPermission}
        >
          {isCheckingPermission ? 'Verificando...' : 'Volver a intentar'}
        </Button>
      </div>
    </DialogContent>
  </Dialog>