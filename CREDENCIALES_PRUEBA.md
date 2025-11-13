# 🔐 Credenciales de Prueba - IntisCorp

## Usuarios disponibles en Firebase

### 1. Admin
- **Usuario:** `juanperez`
- **Contraseña:** `Admin123!`
- **Nombre:** Juan Pérez
- **Email:** juan.perez@intiscorp.com
- **Rol:** admin

### 2. User Regular
- **Usuario:** `mariagarcia`
- **Contraseña:** `User123!`
- **Nombre:** María García
- **Email:** maria.garcia@intiscorp.com
- **Rol:** user

### 3. Manager
- **Usuario:** `carloslopez`
- **Contraseña:** `Manager123!`
- **Nombre:** Carlos López
- **Email:** carlos.lopez@intiscorp.com
- **Rol:** manager

---

## 🚀 Cómo ejecutar la aplicación

### Terminal 1 - Backend
```bash
cd backend
node server-firebase.js
```
- Servidor: `http://localhost:5000`
- Conectado a Firebase real: `intiscorp-a31ad`

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
- Frontend: `http://localhost:5173`

---

## 📝 Endpoints disponibles

### Autenticación
- `POST /api/auth/login` - Login con usuario y contraseña
- `GET /api/auth/user/:id` - Obtener datos del usuario
- `POST /api/auth/forgot-password` - Recuperar contraseña

### Debug (desarrollo)
- `GET /api/debug/users` - Ver todos los usuarios en Firebase
- `GET /api/debug/firebase-structure` - Ver estructura completa de la BD

---

## ✅ Flujo de uso

1. Abrir `http://localhost:5173` en el navegador
2. Verás la página de login con diseño profesional de IntisCorp
3. Ingresar uno de los usuarios anteriores
4. Después de loguear, verás el Home con:
   - Saludo personalizado con tu nombre
   - Información de perfil
   - Dashboard
   - Módulos disponibles

---

## 🛠️ Scripts útiles

```bash
# Agregar más usuarios a Firebase
node seed-firebase.js

# Probar la conexión y login
node test-firebase.js

# Explorar estructura de Firebase
node explore-firebase.js
```

---

## 🎨 Características de la UI

✅ **Login Page**
- Paleta de colores profesional (Azul + Blanco)
- Campos de usuario y contraseña
- Botón "Iniciar Sesión"
- Enlace "¿Olvidé mi contraseña?"
- Manejo de errores con mensajes claros

✅ **Home Page**
- Saludo personalizado con nombre del usuario
- Información de perfil completa
- Dashboard con estadísticas
- Módulos disponibles
- Botón para cerrar sesión

✅ **Seguridad**
- Rutas protegidas (solo usuarios autenticados)
- Redirección automática al login si no está autenticado
- State management con Zustand

---

## 📊 Base de datos Firebase

**URL:** `https://intiscorp-a31ad-default-rtdb.firebaseio.com`

**Estructura:**
```json
{
  "users": {
    "user_001": { ... },
    "user_002": { ... },
    "user_003": { ... }
  }
}
```

---

¡La aplicación está lista para usar! 🚀
