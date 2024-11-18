'use client'

interface LocationPopupProps {
  title: string
  address: string
  isUserEnrolled?: boolean
  onEnroll: () => void
  onUnenroll: () => void
  translations: {
    enroll: string
    unenroll: string
  }
}

export const ActiveWarehousePopup = ({
  title,
  address,
  isUserEnrolled = false,
  onEnroll,
  onUnenroll,
  translations
}: LocationPopupProps) => (
  <div className="p-4">
    <h3 className="font-bold">{title}</h3>
    <p className="text-sm mb-2">{address}</p>
    <div className="flex flex-col gap-2">
      {isUserEnrolled ? (
        <button
          className="px-4 py-2 bg-red-500 text-black rounded hover:bg-red-600 text-sm font-medium w-full"
          onClick={onUnenroll}
        >
          {translations.unenroll}
        </button>
      ) : (
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full" onClick={onEnroll}>
          {translations.enroll}
        </button>
      )}
    </div>
  </div>
)
