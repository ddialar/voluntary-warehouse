[English](../Charter.md) | [Català](./Charter_ca.md)

# 🏥 Plataforma de Gestión de Ayuda Humanitaria

## 🎯 Objetivo

Desarrollar una plataforma web que facilite la gestión y distribución eficiente de ayuda humanitaria en situaciones de emergencia, permitiendo la coordinación entre almacenes y voluntarios para asegurar que la ayuda llegue a quienes la necesitan.

## 🌟 Características Principales

### Gestión de Almacenes

- Registro de nuevos centros de almacenamiento
- Geolocalización de almacenes
- Radio de acción de 5km por almacén
- Visualización de almacenes en mapa interactivo

### Sistema de Voluntarios

- Registro y autenticación de voluntarios
- Asociación de voluntarios a almacenes
- Roles diferenciados: super_admin, admin, voluntario, usuario
- Gestión de permisos y accesos

### Gestión de Pedidos

- Registro de solicitudes de ayuda
- Sistema de códigos únicos AAA-PPPP
- Estados de pedido: pendiente, en preparación, listo para entrega, entregado
- Límite de un pedido en preparación por voluntario
- Máximo 5 pedidos en entrega simultáneos por voluntario

### Funcionalidades Offline

- Trabajo sin conexión para registro de pedidos
- Sincronización automática al recuperar conexión
- Almacenamiento local de datos esenciales

### Monitorización y Seguimiento

- Panel de administración para super_admin y admin
- Estadísticas de entregas y eficiencia
- Mapas de calor de zonas de actividad
- Seguimiento de tiempos de entrega

## 🛠️ Tecnologías

### Frontend

- Next.js 14
- TypeScript
- TailwindCSS
- Leaflet para mapas
- SWR para gestión de estado y caché
- IndexedDB para almacenamiento offline

### Backend

- API Routes de Next.js
- Sistema de caché para optimización
- Arquitectura hexagonal
- Autenticación mediante redes sociales

### Testing

- Vitest para tests unitarios
- Testing Library para tests de componentes
- Supertest para tests de API
- Tests E2E con Playwright

### Despliegue

- Vercel para hosting
- CI/CD automatizado
- Despliegues automáticos en master y beta

## 📱 Características Técnicas

- Diseño responsive first
- PWA para funcionamiento offline
- Multiidioma (Español/Valenciano)
- Accesibilidad WCAG 2.1
- Caché optimizada para rendimiento
- Geolocalización HTML5

## 🔒 Seguridad y Privacidad

- Autenticación segura
- Gestión de roles y permisos
- Protección de datos sensibles
- Rate limiting en APIs
- Validación de datos

## 🎨 UX/UI

- Interfaz intuitiva
- Feedback visual claro
- Notificaciones de estado
- Mapas interactivos
- Indicadores de progreso

## 📈 Escalabilidad

- Arquitectura modular
- Sistema de caché eficiente
- Optimización de consultas
- Gestión de carga de servidor
