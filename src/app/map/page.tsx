// 'use client'

// import { MapPage } from '@modules/map/components'

// export default function Map() {
//   return <MapPage />
// }

'use client'

// import { redirect } from 'next/navigation'
import { MapView } from './components'

export default function MapPage() {
  return (
    <main>
      <MapView
        // onWarehouseCreate={() => redirect('/dashboard')}
        onWarehouseCreate={() => console.log('Redirecting to /dashboard')}
      />
    </main>
  )
}
