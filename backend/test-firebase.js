const axios = require('axios');

// URL de Firebase
const FIREBASE_DB_URL = "https://intiscorp-a31ad-default-rtdb.firebaseio.com";

// Función para probar la conexión a Firebase
async function testFirebaseConnection() {
  console.log('🧪 Probando conexión a Firebase...\n');

  try {
    const response = await axios.get(`${FIREBASE_DB_URL}/users.json`);
    const users = response.data;

    if (!users) {
      console.log('❌ No hay usuarios en Firebase');
      return;
    }

    console.log('✅ Conexión exitosa a Firebase\n');
    console.log(`📊 Total de usuarios: ${Object.keys(users).length}\n`);
    console.log('👥 Usuarios en la base de datos:\n');

    for (const [id, user] of Object.entries(users)) {
      console.log(`ID: ${id}`);
      console.log(`  👤 Usuario: ${user.user}`);
      console.log(`  📧 Email: ${user.email}`);
      console.log(`  👨‍💼 Nombre: ${user.nombre}`);
      console.log(`  🔑 Rol: ${user.rol}`);
      console.log(`  🔒 Contraseña: ${user.password}`);
      console.log('');
    }

    // Probar login
    console.log('\n🔐 Prueba de login...\n');
    const firstUser = Object.values(users)[0];
    
    if (firstUser && firstUser.user && firstUser.password) {
      const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
        user: firstUser.user,
        password: firstUser.password
      });

      if (loginResponse.data.success) {
        console.log('✅ Login exitoso!');
        console.log('Usuario autenticado:', loginResponse.data.user);
      } else {
        console.log('❌ Error en login:', loginResponse.data.message);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Detalles:', error.response.data);
    }
  }
}

testFirebaseConnection();
