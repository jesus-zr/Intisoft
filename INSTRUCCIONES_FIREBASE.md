# Instrucciones - Autenticación con Firebase Real

## Cómo ejecutar la aplicación

### Terminal 1 - Backend (Conectado a Firebase Real)
```bash
cd backend
node server-firebase.js
```

El servidor se ejecutará en `http://localhost:5000` y se conectará directamente a tu base de datos Firebase en tiempo real.

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

El frontend se ejecutará en `http://localhost:5173`

## Cambios Realizados

### 1. **Autenticación Real con Firebase**
   - El backend ahora se conecta directamente a Firebase Realtime Database
   - No necesita Firebase Admin SDK
   - Usa la REST API de Firebase

### 2. **Archivos de Servidor**
   - `server-firebase.js` - **NUEVO** - Conecta a Firebase real
   - `server-dev.js` - Usa usuarios de prueba (conservado para desarrollo)
   - `server.js` - Requería Firebase Admin SDK (mantenido para referencia)

### 3. **Cambios en Backend**
   - Reemplazó Firebase Admin SDK por solicitudes HTTP directas
   - Instaló `axios` para hacer requests HTTP
   - Agregó logs detallados para depuración

## Estructura esperada en Firebase

Tu base de datos Firebase debe tener la siguiente estructura:

```json
{
  "users": {
    "user_id_1": {
      "rol": "admin",
      "nombre": "Nombre Completo",
      "email": "usuario@empresa.com",
      "password": "contraseña_en_texto",
      "user": "nombreusuario"
    },
    "user_id_2": {
      "rol": "user",
      "nombre": "Otro Usuario",
      "email": "otro@empresa.com",
      "password": "contraseña_segura",
      "user": "otrousuario"
    }
  }
}
```

## Flujo de Autenticación

1. **Usuario ingresa credenciales** en la página de login
2. **Frontend envía POST** a `http://localhost:5000/api/auth/login`
3. **Backend consulta** Firebase en `intiscorp-a31ad-default-rtdb.firebaseio.com`
4. **Busca el usuario** por nombre de usuario
5. **Valida la contraseña** (comparación de texto plano actualmente)
6. **Retorna datos del usuario** si es correcto
7. **Frontend guarda** en Zustand store
8. **Redirige a /home** mostrando nombre y datos del usuario

## Scripts NPM Backend

```bash
npm run dev        # Usuarios de prueba (server-dev.js)
npm run firebase   # Firebase real (server-firebase.js)
npm start          # Firebase Admin SDK (server.js)
```

## Logs del Servidor

El servidor ahora muestra logs detallados:
- ✅ `Usuarios obtenidos de Firebase` - Conexión exitosa
- 🔐 `Intento de login - Usuario: X` - Cuando intenta login
- 📊 `Total de usuarios en Firebase: X` - Cantidad de usuarios encontrados
- ✅ `Usuario encontrado: X` - Usuario existe
- ❌ Mensajes de error si falla algo
- ✅ `Login exitoso para: X` - Autenticación completada

## Seguridad - Importante

⚠️ **Para Producción:**
1. **NO almacenes contraseñas en texto plano** - Usa bcryptjs
2. **Implementa JWT** para tokens seguros
3. **Usa HTTPS** siempre
4. **Restringe las reglas de Firebase** para no exponer todos los usuarios
5. **Agrega validación en backend** más rigurosa
6. **Rate limiting** para evitar ataques de fuerza bruta

## Próximas Mejoras

- [ ] Hashear contraseñas con bcryptjs
- [ ] Implementar JWT tokens
- [ ] Validaciones más estrictas
- [ ] Recuperación de contraseña por email
- [ ] Registro de nuevos usuarios
- [ ] Autenticación con OAuth

## Contacto

Desarrollado para IntisCorp - Sistema de Autenticación
