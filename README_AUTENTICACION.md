# IntisCorp - Sistema de Autenticación

Sistema completo de login y autenticación para la plataforma IntisCorp con backend en Node.js/Express y frontend en React/TypeScript.

## Requisitos

- Node.js v16 o superior
- npm o yarn
- Credenciales de Firebase configuradas

## Estructura del Proyecto

```
backend/
  ├── server.js          # Servidor Express principal
  ├── .env               # Variables de entorno
  └── package.json

frontend/
  ├── src/
  │   ├── services/
  │   │   ├── firebase.ts      # Configuración de Firebase
  │   │   └── authService.ts   # Servicio de autenticación
  │   ├── app/
  │   │   ├── routes/
  │   │   │   └── index.tsx    # Rutas de la aplicación
  │   │   └── store/
  │   │       └── authStore.ts # Store de Zustand
  │   ├── features/
  │   │   ├── auth/
  │   │   │   └── LoginPage.tsx
  │   │   └── home/
  │   │       └── HomePage.tsx
  │   └── App.tsx         # Componente principal
  └── package.json
```

## Instalación

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Configuración

### Backend

1. El archivo `server.js` ya contiene la configuración de Firebase
2. El puerto por defecto es 5000 (modificable en `.env`)

### Frontend

El servicio `authService.ts` utiliza `http://localhost:5000` como URL base para las solicitudes API.

## Ejecución

### Backend (Terminal 1)

```bash
cd backend
npm start
```

El servidor se ejecutará en `http://localhost:5000`

### Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

El frontend se ejecutará en `http://localhost:5173` (o el puerto que Vite asigne)

## Características Implementadas

### Backend (Node.js + Express)

- **POST /api/auth/login** - Autenticación de usuarios
  - Body: `{ user: string, password: string }`
  - Response: `{ success: boolean, user: Object }`

- **GET /api/auth/user/:id** - Obtener información del usuario
  - Response: `{ success: boolean, user: Object }`

- **POST /api/auth/forgot-password** - Recuperación de contraseña
  - Body: `{ email: string }`
  - Response: `{ success: boolean, message: string }`

### Frontend (React + TypeScript)

- **LoginPage** - Página de login con:
  - Campo de usuario
  - Campo de contraseña
  - Botón "Iniciar Sesión"
  - Enlace "¿Olvidé mi contraseña?"
  - UI profesional con paleta de azules y blancos

- **HomePage** - Página de inicio con:
  - Saludo personalizando con el nombre de usuario
  - Información del perfil
  - Dashboard de estadísticas
  - Módulos disponibles (Reportes, Empresas, Chat)
  - Botón de cerrar sesión

- **Autenticación** - Sistema de estado con:
  - Store Zustand para manejo de estado
  - Rutas protegidas
  - Redirección automática a login

## Estructura de Datos en Firebase

```json
{
  "users": {
    "idAutomático": {
      "rol": "string",
      "nombre": "string",
      "email": "string",
      "password": "string",
      "user": "string"
    }
  }
}
```

## Paleta de Colores

- **Primario**: Azul (`#2563eb` - Blue-600)
- **Oscuro**: Azul Oscuro (`#1e3a8a` - Blue-900)
- **Acento**: Rojo (`#ef4444` - Red-500)
- **Fondo**: Blanco/Gris claro
- **Texto**: Gris oscuro/Gris neutro

## Flujo de Autenticación

1. Usuario ingresa sus credenciales en LoginPage
2. El frontend envía solicitud a `/api/auth/login`
3. Backend valida en Firebase Realtime Database
4. Si es correcto, se retorna información del usuario
5. Frontend guarda datos en Zustand store
6. Se redirige a `/home`
7. HomePage muestra información del usuario autenticado

## Próximas Mejoras

- [ ] Hash de contraseñas con bcryptjs
- [ ] Tokens JWT para sesiones seguras
- [ ] Envío de correos para recuperación de contraseña
- [ ] Protección CSRF
- [ ] Rate limiting
- [ ] Logs de auditoría
- [ ] Recuperación de contraseña por email

## Notas Importantes

⚠️ **Seguridad**: Las contraseñas se almacenan actualmente en texto plano. En producción:
- Usar bcryptjs para hashear contraseñas
- Implementar JWT para tokens
- Usar HTTPS
- Agregar validación en el backend

## Contacto

Desarrollado para IntisCorp
