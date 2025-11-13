const axios = require('axios');

// URL de Firebase
const FIREBASE_DB_URL = "https://intiscorp-a31ad-default-rtdb.firebaseio.com";

// Función para explorar Firebase
async function exploreStar() {
  console.log('🔍 Explorando estructura de Firebase...\n');

  try {
    // Obtener toda la raíz
    const response = await axios.get(`${FIREBASE_DB_URL}/.json`);
    const data = response.data;

    console.log('✅ Conexión exitosa a Firebase\n');
    console.log('📂 Estructura completa de la BD:\n');
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Detalles:', error.response.data);
    }
  }
}

exploreStar();
