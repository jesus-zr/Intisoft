const bcrypt = require('bcryptjs');

// Usuarios de ejemplo para desarrollo. Las contraseñas se hashean al cargar.
const users = {
  "dev_admin": {
    name: "Administrador Dev",
    email: "admin@intiscorp.local",
    user: "admin",
    // password: password123
    password: bcrypt.hashSync('password123', 10),
    rol: "admin"
  },
  "dev_tecnico": {
    name: "Técnico Dev",
    email: "tecnico@intiscorp.local",
    user: "tecnico",
    // password: tecnico123
    password: bcrypt.hashSync('tecnico123', 10),
    rol: "tecnico"
  }
};

module.exports = users;
