const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Base de datos simulada (en desarrollo)
const users = {
  "1": {
    id: "1",
    rol: "admin",
    nombre: "Juan Pérez",
    email: "juan@intiscorp.com",
    password: "123456",
    user: "juanperez"
  },
  "2": {
    id: "2",
    rol: "user",
    nombre: "María García",
    email: "maria@intiscorp.com",
    password: "password123",
    user: "mariagarcia"
  }
};

// Rutas

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Usuario y contraseña son requeridos' 
      });
    }

    // Buscar usuario
    let foundUser = null;
    let userId = null;

    for (const key in users) {
      if (users[key].user === user) {
        foundUser = users[key];
        userId = key;
        break;
      }
    }

    if (!foundUser) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuario o contraseña incorrectos' 
      });
    }

    // Comparar contraseña
    if (foundUser.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuario o contraseña incorrectos' 
      });
    }

    // Login exitoso
    res.json({
      success: true,
      message: 'Login exitoso',
      user: {
        id: userId,
        nombre: foundUser.nombre,
        email: foundUser.email,
        rol: foundUser.rol,
        user: foundUser.user
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor' 
    });
  }
});

// Obtener usuario por ID
app.get('/api/auth/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = users[id];

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Usuario no encontrado' 
      });
    }

    res.json({
      success: true,
      user: {
        id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        user: user.user
      }
    });

  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor' 
    });
  }
});

// Recuperar contraseña
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email es requerido' 
      });
    }

    // Buscar usuario por email
    let foundUser = false;
    for (const key in users) {
      if (users[key].email === email) {
        foundUser = true;
        break;
      }
    }

    if (!foundUser) {
      return res.status(404).json({ 
        success: false, 
        message: 'Email no encontrado' 
      });
    }

    res.json({
      success: true,
      message: 'Se ha enviado un enlace de recuperación a tu email'
    });

  } catch (error) {
    console.error('Error en recuperar contraseña:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor' 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Servidor IntisCorp ejecutándose      ║
║   Puerto: ${PORT}                           ║
║   Usuarios de prueba:                  ║
║   - Usuario: juanperez (admin)         ║
║   - Contraseña: 123456                 ║
║   - Usuario: mariagarcia (user)        ║
║   - Contraseña: password123            ║
╚════════════════════════════════════════╝
  `);
});
