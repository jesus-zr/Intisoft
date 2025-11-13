# ⚠️ CONFIGURACIÓN REQUERIDA - LEE ESTO PRIMERO

## 1️⃣ Descargar Firebase Service Account Key

Este paso es OBLIGATORIO para que el backend funcione.

### Pasos:
1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona el proyecto **intiscorp-a31ad**
3. Ve a ⚙️ **Configuración del Proyecto** (esquina superior derecha)
4. Selecciona la pestaña **Cuentas de Servicio**
5. Haz clic en **Generar nueva clave privada**
6. Se descargará un archivo JSON
7. **Renómbralo a `serviceAccountKey.json`**
8. **Colócalo en la carpeta `backend/`**

Debe quedar en: `backend/serviceAccountKey.json`

## 2️⃣ Instalar dependencias

### Backend:
```bash
cd backend
npm install
```

### Frontend:
```bash
cd frontend
npm install
```

## 3️⃣ Variables de Entorno

### Backend `.env` (ya existe):
```
FIREBASE_DATABASE_URL=https://intiscorp-a31ad-default-rtdb.firebaseio.com
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend `.env.local` (ya existe):
```
VITE_API_URL=http://localhost:5000/api
```

## 4️⃣ Iniciar Servidores

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Deberías ver:
```
Servidor ejecutándose en puerto 5000
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Deberías ver algo como:
```
VITE v7.2.2  ready in 123 ms

➜  Local:   http://localhost:5173/
```

## 5️⃣ Usuarios de Prueba

Usa estos credenciales para probar (si están en tu base de datos):

**Admin:**
- Usuario: `admin`
- Contraseña: (la que tengas en Firebase)

**Técnico:**
- Usuario: `tecnico`
- Contraseña: (la que tengas en Firebase)

⚠️ **Nota**: Las contraseñas DEBEN estar hasheadas con bcryptjs en la base de datos.

## 6️⃣ Estructura de Base de Datos

Si no tienes usuarios en Firebase, crea la siguiente estructura en Realtime Database:

```json
{
  "users": {
    "user123": {
      "name": "Administrador",
      "email": "admin@intiscorp.com",
      "user": "admin",
      "password": "$2a$10$...",
      "rol": "admin"
    },
    "user456": {
      "name": "Técnico",
      "email": "tecnico@intiscorp.com",
      "user": "tecnico",
      "password": "$2a$10$...",
      "rol": "tecnico"
    }
  }
}
```

Para hashear contraseñas con bcryptjs en Node.js:
```javascript
const bcrypt = require('bcryptjs');
const password = 'mi_contraseña';
const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword);
```

## ✅ Verificación

1. ✅ `serviceAccountKey.json` en `backend/`
2. ✅ Dependencias instaladas (npm install en ambas carpetas)
3. ✅ Backend corriendo en puerto 5000
4. ✅ Frontend corriendo en puerto 5173
5. ✅ Usuarios en Firebase con contraseñas hasheadas

## 🔗 URLs Locales

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **Firebase Console**: https://console.firebase.google.com/project/intiscorp-a31ad

## 🆘 Solución de Problemas

### Error: "Cannot find module 'firebase-admin'"
```bash
cd backend
npm install
```

### Error: "ECONNREFUSED - Backend no responde"
- Asegúrate que el backend esté corriendo en otra terminal
- Verifica que el puerto 5000 esté disponible

### Error: "Module not found: '@/...'"
- Asegúrate de ejecutar `npm install` en frontend

### Error: "Firebase credentials error"
- Verifica que `serviceAccountKey.json` esté en la carpeta `backend/`
- El archivo debe ser un JSON válido descargado de Firebase

## 📖 Documentación Adicional

Ver `README_AUTH.md` para más detalles sobre:
- Endpoints de API
- Estructura del proyecto
- Flujo de autenticación
- Seguridad

---

**Si todo está correctamente configurado, deberías poder acceder a http://localhost:5173 y ver la página de login** 🎉
