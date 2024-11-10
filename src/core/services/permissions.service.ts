type PermissionStatus = 'granted' | 'denied' | 'prompt' | 'unavailable';

export const requestLocationPermission = async (): Promise<PermissionStatus> => {
  // Primero verificamos si la geolocalización está disponible
  if (!navigator.geolocation) {
    return 'unavailable'
  }

  try {
    // Usamos una promesa que resuelve cuando obtenemos la ubicación
    const result = await new Promise<GeolocationPosition | GeolocationPositionError>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
    })

    // Si llegamos aquí, significa que obtuvimos la posición
    if (result instanceof GeolocationPosition) {
      return 'granted'
    }

    return 'denied'
  } catch (error) {
    if (error instanceof GeolocationPositionError) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          return 'denied'
        case error.POSITION_UNAVAILABLE:
          return 'unavailable'
        case error.TIMEOUT:
          return 'prompt'
      }
    }
    return 'unavailable'
  }
}

export const waitForLocationPermission = async (
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<PermissionStatus> => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const status = await requestLocationPermission()
    if (status === 'granted') {
      return status
    }
    // Esperar antes del siguiente intento
    await new Promise(resolve => setTimeout(resolve, delayMs))
  }
  return 'denied'
}
