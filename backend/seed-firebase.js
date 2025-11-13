const axios = require('axios');

// URL de Firebase
const FIREBASE_DB_URL = "https://intiscorp-a31ad-default-rtdb.firebaseio.com";

// Usuarios de ejemplo para agregar
const usersToCreate = {
  "user_001": {
    "rol": "admin",
    "nombre": "Juan Pérez",
    "email": "juan.perez@intiscorp.com",
    "password": "Admin123!",
    "user": "juanperez"
  },
  "user_002": {
    "rol": "user",
    "nombre": "María García",
    "email": "maria.garcia@intiscorp.com",
    "password": "User123!",
    "user": "mariagarcia"
  },
  "user_003": {
    "rol": "manager",
    "nombre": "Carlos López",
    "email": "carlos.lopez@intiscorp.com",
    "password": "Manager123!",
    "user": "carloslopez"
  }
};

async function addUsersToFirebase() {
  console.log('📝 Agregando usuarios a Firebase...\n');

  try {
    // Primero verificar si existen usuarios
    const getResponse = await axios.get(`${FIREBASE_DB_URL}/users.json`);
    const existingUsers = getResponse.data;

    if (existingUsers && Object.keys(existingUsers).length > 0) {
      console.log('✅ Ya existen usuarios en Firebase:');
      console.log(JSON.stringify(existingUsers, null, 2));
      return;
    }

    // Si no existen, crear la colección de usuarios
    console.log('📤 Creando colección de usuarios...\n');
    const response = await axios.put(`${FIREBASE_DB_URL}/users.json`, usersToCreate);
    
    console.log('✅ Usuarios agregados exitosamente!\n');
    console.log('👥 Usuarios creados:\n');
    
    for (const [id, user] of Object.entries(usersToCreate)) {
      console.log(`ID: ${id}`);
      console.log(`  👤 Usuario: ${user.user}`);
      console.log(`  📧 Email: ${user.email}`);
      console.log(`  👨‍💼 Nombre: ${user.nombre}`);
      console.log(`  🔑 Rol: ${user.rol}`);
      console.log(`  🔒 Contraseña: ${user.password}`);
      console.log('');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Detalles:', error.response.data);
    }
  }
}

addUsersToFirebase();
