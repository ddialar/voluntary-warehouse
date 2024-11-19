import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  question: string
  cancelText: string
  confirmText: string
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  question,
  cancelText = 'Cancel',
  confirmText = 'Confirm'
}: ConfirmDialogProps) => (
  <div className="absolute top-4 right-4 z-[1000]">
    <Dialog open={isOpen} onClose={onClose} className="relative z-[1000]">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto max-w-sm rounded-lg bg-white p-6">
          <DialogTitle className="text-lg font-medium leading-6 text-gray-900 mb-4">{title}</DialogTitle>

          <p className="text-sm text-gray-500 mb-6">{question}</p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={onClose}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </div>
)
