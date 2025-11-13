# Sistema de Login IntisCorp

Sistema completo de autenticación para la plataforma IntisCorp con soporte para roles (admin y tecnico).

## 🎨 Características

- ✅ Login seguro con validación de usuario y contraseña
- ✅ Autenticación contra Firebase Realtime Database
- ✅ Soporte para roles: Admin y Técnico
- ✅ Página de recuperación de contraseña
- ✅ Página Home personalizada
- ✅ Rutas protegidas
- ✅ Diseño responsivo con Tailwind CSS
- ✅ Paleta de colores profesional (Indigo, Purple, Blue)

## 📁 Estructura del Proyecto

```
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── firebase.js          # Configuración de Firebase Admin
│   │   ├── controllers/
│   │   │   └── authController.js    # Lógica de autenticación
│   │   ├── routes/
│   │   │   └── auth.js              # Rutas de autenticación
│   │   └── server.js                 # Servidor Express
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── context/
│   │   │   │   └── AuthContext.tsx   # Contexto de autenticación
│   │   │   └── routes/
│   │   │       └── ProtectedRoute.tsx # Rutas protegidas
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx         # Página de login
│   │   │   │   └── ForgotPassword.tsx # Recuperación de contraseña
│   │   │   └── home/
│   │   │       └── Home.tsx          # Página principal
│   │   ├── services/
│   │   │   └── authService.ts        # Servicio de API
│   │   ├── App.tsx                   # Rutas principales
│   │   └── main.tsx
│   └── package.json
```

## 🔧 Configuración

### Backend

1. **Instalar dependencias**:
```bash
cd backend
npm install
```

2. **Descargar serviceAccountKey.json de Firebase**:
   - Ve a Firebase Console
   - Proyecto: intiscorp-a31ad
   - Configuración del Proyecto → Cuentas de Servicio
   - Genera y descarga la clave privada
   - Guárdala como `backend/serviceAccountKey.json`

3. **Configurar variables de entorno** (`.env`):
```
FIREBASE_DATABASE_URL=https://intiscorp-a31ad-default-rtdb.firebaseio.com
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

4. **Iniciar el servidor**:
```bash
npm run dev
```

### Frontend

1. **Instalar dependencias**:
```bash
cd frontend
npm install
```

2. **Configurar variables de entorno** (`.env.local`):
```
VITE_API_URL=http://localhost:5000/api
```

3. **Iniciar el servidor de desarrollo**:
```bash
npm run dev
```

## 📝 Estructura de Datos Firebase

```json
{
  "users": {
    "idUsuario1": {
      "name": "Juan Pérez",
      "email": "juan@intiscorp.com",
      "user": "jperez",
      "password": "$2a$10...", // Hash bcryptjs
      "rol": "admin"
    },
    "idUsuario2": {
      "name": "María García",
      "email": "maria@intiscorp.com",
      "user": "mgarcia",
      "password": "$2a$10...", // Hash bcryptjs
      "rol": "tecnico"
    }
  }
}
```

## 🔐 Endpoints de API

### Login
**POST** `/api/auth/login`

Request:
```json
{
  "user": "jperez",
  "password": "contraseña123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login exitoso",
  "user": {
    "id": "idUsuario1",
    "name": "Juan Pérez",
    "email": "juan@intiscorp.com",
    "user": "jperez",
    "rol": "admin"
  }
}
```

### Obtener Información del Usuario
**GET** `/api/auth/user/:userId`

Response:
```json
{
  "success": true,
  "user": {
    "id": "idUsuario1",
    "name": "Juan Pérez",
    "email": "juan@intiscorp.com",
    "user": "jperez",
    "rol": "admin"
  }
}
```

### Recuperar Contraseña
**POST** `/api/auth/forgot-password`

Request:
```json
{
  "email": "juan@intiscorp.com"
}
```

Response:
```json
{
  "success": true,
  "message": "Se ha enviado un enlace de recuperación a tu email"
}
```

## 🎨 Paleta de Colores

- **Primary**: Indigo (`#4F46E5`)
- **Secondary**: Purple (`#9333EA`)
- **Accent**: Blue (`#3B82F6`)
- **Background**: Gray (`#F9FAFB`)
- **Error**: Red (`#EF4444`)
- **Success**: Green (`#22C55E`)

## 🔄 Flujo de Autenticación

1. Usuario ingresa credenciales en `/login`
2. Frontend envía solicitud a `POST /api/auth/login`
3. Backend valida credenciales contra Firebase
4. Si es correcto, se retorna información del usuario
5. Frontend almacena datos en localStorage
6. Redirige al home y muestra nombre de usuario
7. Las rutas protegidas verifican autenticación

## 🔒 Seguridad

- Contraseñas hasheadas con bcryptjs
- CORS configurado para frontend específico
- Validación de entrada en servidor y cliente
- Tokens almacenados en localStorage
- Rutas protegidas con ProtectedRoute component

## 📱 Rutas Disponibles

| Ruta | Descripción | Protegida |
|------|-------------|-----------|
| `/login` | Página de login | No |
| `/forgot-password` | Recuperación de contraseña | No |
| `/` | Página principal (Home) | Sí |

## 🚀 Pasos Siguientes

1. **Implementar persistencia de sesión**: Agregar tokens JWT
2. **Email de recuperación**: Integrar servicio de email (SendGrid, Nodemailer)
3. **Gestión de usuarios**: Panel de administración
4. **Logs de auditoría**: Registrar acciones de usuarios
5. **2FA**: Autenticación de dos factores

## 📚 Tecnologías Utilizadas

- **Frontend**: React, TypeScript, Tailwind CSS, React Router, Axios
- **Backend**: Express.js, Firebase Admin, bcryptjs, CORS
- **Base de datos**: Firebase Realtime Database
- **Build tool**: Vite

## 📞 Soporte

Para problemas o dudas, contacta al equipo de desarrollo de IntisCorp.

---

**© 2024 IntisCorp - Todos los derechos reservados**
