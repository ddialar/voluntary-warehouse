const toRad = (value: number) => value * Math.PI / 180

export const calculateDistance = (
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
) => {
  const R = 6371 // Earth radius in km
  const dLat = toRad(point2.lat - point1.lat)
  const dLon = toRad(point2.lng - point1.lng)
  const lat1 = toRad(point1.lat)
  const lat2 = toRad(point2.lat)

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

