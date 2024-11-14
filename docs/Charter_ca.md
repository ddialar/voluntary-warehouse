[English](../Charter.md) | [Castellano](./Charter_es.md)

# 🏥 Plataforma de Gestió d'Ajuda Humanitària

## 🎯 Objectiu

Plataforma web per a la gestió eficient d'ajuda humanitària en emergències, coordinant magatzems i voluntaris per assegurar el lliurament d'ajuda.

## 🌟 Característiques Principals

### 🏪 Gestió de Magatzems

- Registre de centres d'emmagatzematge
- Geolocalització de magatzems
- Radi d'acció de 5km per magatzem
- Visualització en mapa interactiu

### 👥 Sistema de Voluntaris

- Registre i autenticació de voluntaris
- Associació amb magatzems
- Rols: super_admin, admin, voluntari, usuari
- Gestió de permisos

### 📦 Gestió de Comandes

- Registre de sol·licituds d'ajuda
- Codis únics AAA-PPPP
- Estats: pendent, en preparació, llest per entregar, entregat
- Una comanda en preparació per voluntari
- Màxim 5 entregues simultànies per voluntari

### 🔄 Funcionalitats Offline

- Registre de comandes sense connexió
- Sincronització automàtica
- Emmagatzematge local de dades essencials

### 📊 Monitorització

- Panell d'administració
- Estadístiques d'entregues i eficiència
- Mapes de calor d'activitat
- Seguiment de temps d'entrega

## 🛠️ Tecnologies

### 💻 Frontend

- Next.js 14
- TypeScript
- TailwindCSS
- Leaflet per a mapes
- SWR per a estat/caché
- IndexedDB emmagatzematge offline

### ⚙️ Backend

- Next.js API Routes
- Sistema de caché
- Arquitectura hexagonal
- Autenticació xarxes socials

### 🧪 Testing

- Vitest tests unitaris
- Testing Library tests components
- Supertest tests API
- Playwright tests E2E

### 🚀 Desplegament

- Allotjament Vercel
- CI/CD automatitzat
- Desplegament automàtic master/beta

### 🔧 Característiques Tècniques

- Disseny responsive first
- PWA offline
- Multiidioma (Català/Castellà)
- Accessibilitat WCAG 2.1
- Caché optimitzada
- Geolocalització HTML5

### 🔒 Seguretat

- Autenticació segura
- Gestió de rols
- Protecció de dades
- Rate limiting APIs
- Validació de dades

### 🎨 UX/UI

- Interfície intuïtiva
- Feedback visual
- Notificacions d'estat
- Mapes interactius
- Indicadors de progrés

### 📈 Escalabilitat

- Arquitectura modular
- Caché eficient
- Optimització de consultes
- Gestió de càrrega del servidor
