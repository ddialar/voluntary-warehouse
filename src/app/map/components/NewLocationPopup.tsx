interface LocationPopupProps {
  lat: number;
  lng: number;
  onCreateWarehouse: () => void;
  onCreateOrder: () => void;
}

export const NewLocationPopup = ({ lat, lng, onCreateWarehouse, onCreateOrder }: LocationPopupProps) =>
  <div className="p-4">
    <div className="flex flex-col gap-2">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium w-full"
        onClick={onCreateWarehouse}
      >
        Crear Almacén
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-medium w-full"
        onClick={onCreateOrder}
      >
        Crear Pedido
      </button>
    </div>
  </div>