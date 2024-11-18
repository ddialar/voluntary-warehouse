import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

type FontAwesomeMapIcon =
  | 'fa-location-dot'
  | 'fa-map-marker'
  | 'fa-map-pin'
  | 'fa-thumbtack'
  | 'fa-circle'
  | 'fa-star'
  | 'fa-home'
  | 'fa-building'
  | 'fa-flag'
  | 'fa-car'
  | 'fa-bicycle'
  | 'fa-bus'
  | 'fa-train'
  | 'fa-plane'
  | 'fa-shopping-cart'
  | 'fa-utensils'
  | 'fa-hotel'
  | 'fa-hospital'
  | 'fa-parking'
  | 'fa-info-circle'
  | 'fa-warehouse'

interface IconOptions {
  icon: FontAwesomeMapIcon
  fontSize?: number
  iconColor?: string
  iconSize?: [number, number]
  iconAnchor?: [number, number]
}

const createCustomMarker = ({
  icon,
  fontSize = 50,
  iconColor = '#3f8ecd',
  iconSize = [25, 40],
  iconAnchor = [iconSize[0] / 2, 0]
}: IconOptions): L.DivIcon => {
  const html = `
    <i 
      class="fa ${icon}" 
      style="
        color: ${iconColor}; 
        font-size: ${fontSize}px;
        line-height: 1;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -100%);
      "
    ></i>
  `

  return L.divIcon({
    html,
    className: 'custom-marker-container',
    iconSize,
    iconAnchor
  })
}

export const WarehouseIcon = createCustomMarker({ icon: 'fa-location-dot', fontSize: 45, iconColor: '#3f8ecd' })
export const EnrolledWarehouseIcon = createCustomMarker({ icon: 'fa-location-dot', fontSize: 45, iconColor: '#e93535' })
export const NewWarehouseIcon = createCustomMarker({ icon: 'fa-location-dot', fontSize: 40, iconColor: '#0cb107' })
// TODO Create múltiple icons for orders, with different colors based on the order status
export const OrderIcon = createCustomMarker({ icon: 'fa-map-pin', fontSize: 45, iconColor: '#3f8ecd' })
