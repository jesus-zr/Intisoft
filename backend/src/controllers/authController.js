const bcrypt = require('bcryptjs');
const dbAdapter = require('../config/dbAdapter');

// Login de usuario
exports.loginUser = async (req, res) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Usuario y contraseña son requeridos' 
      });
    }

    // Buscar usuario en la base de datos (usa adapter: Firebase o mock)
    const found = await dbAdapter.findUserByUsername(user);
    if (!found) {
      return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
    let foundUser = found;
    let userId = found.id;

    if (!foundUser) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuario o contraseña incorrectos' 
      });
    }

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuario o contraseña incorrectos' 
      });
    }

    // Respuesta exitosa
    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
      user: {
        id: userId,
        name: foundUser.name,
        email: foundUser.email,
        user: foundUser.user,
        rol: foundUser.rol
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
};

// Obtener información del usuario
exports.getUserInfo = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID de usuario es requerido' 
      });
    }

    const userData = await dbAdapter.getUserById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    return res.status(200).json({ success: true, user: userData });

  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
};

// Recuperar contraseña (enviar email)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email es requerido' 
      });
    }

    const foundByEmail = await dbAdapter.findUserByEmail(email);
    if (!foundByEmail) {
      return res.status(404).json({ success: false, message: 'No se encontró el email' });
    }

    return res.status(200).json({ success: true, message: 'Se ha enviado un enlace de recuperación a tu email' });

  } catch (error) {
    console.error('Error en recuperar contraseña:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
};
