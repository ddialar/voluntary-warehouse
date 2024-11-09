import { getWarehouses } from '@/core/domain/services/warehouse.service'
import { HomeClient } from './HomeClient'

export default async function HomePage() {
  const warehouses = await getWarehouses()
  
  return <HomeClient warehouses={warehouses} />
}
