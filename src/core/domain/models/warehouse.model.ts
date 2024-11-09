export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Warehouse {
  id: string;
  code: string; // AAA
  name: string;
  location: Location;
  createdBy: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
