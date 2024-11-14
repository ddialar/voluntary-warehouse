[Castellano](./docs/Charter_es.md) | [Català](./docs/Charter_ca.md)

# 🏥 Humanitarian Aid Management Platform

## 🎯 Objective

Web platform for efficient humanitarian aid management in emergencies, coordinating warehouses and volunteers to ensure aid delivery.

## 🌟 Key Features

### 🏪 Warehouse Management

- Register storage centers
- Warehouse geolocation
- 5km action radius per warehouse
- Interactive map visualization

### 👥 Volunteer System

- Volunteer registration and authentication
- Warehouse association
- Roles: super_admin, admin, volunteer, user
- Permission management

### 📦 Order Management

- Aid request registration
- AAA-PPPP unique codes
- Status: pending, in preparation, ready for delivery, delivered
- One preparation order per volunteer
- Maximum 5 simultaneous deliveries per volunteer

### 🔄 Offline Features

- Offline order registration
- Automatic sync on reconnection
- Essential data local storage

### 📊 Monitoring

- Admin panel for super_admin and admin
- Delivery and efficiency statistics
- Activity heat maps
- Delivery time tracking

## 🛠️ Technologies

### 💻 Frontend

- Next.js 14
- TypeScript
- TailwindCSS
- Leaflet maps
- SWR for state/cache
- IndexedDB offline storage

### ⚙️ Backend

- Next.js API Routes
- Cache system
- Hexagonal architecture
- Social media authentication

### 🧪 Testing

- Vitest unit tests
- Testing Library component tests
- Supertest API tests
- Playwright E2
