const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Intentar inicializar Firebase Admin con varias opciones, pero no lanzar error
const databaseURL = process.env.FIREBASE_DATABASE_URL || 'https://intiscorp-a31ad-default-rtdb.firebaseio.com';

let useFirebase = false;
let db = null;

try {
  const localKeyPath = path.join(__dirname, 'serviceAccountKey.json');
  if (fs.existsSync(localKeyPath)) {
    const serviceAccount = require(localKeyPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL,
    });
    db = admin.database();
    useFirebase = true;
    console.log('Firebase Admin inicializado desde serviceAccountKey.json');
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS && fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL,
    });
    db = admin.database();
    useFirebase = true;
    console.log('Firebase Admin inicializado usando GOOGLE_APPLICATION_CREDENTIALS');
  } else {
    console.warn('\nAdvertencia: No se encontraron credenciales de Firebase. Se usará modo "mock" para desarrollo.');
    console.warn('Coloca el archivo `serviceAccountKey.json` en `backend/src/config/` o configura la variable de entorno `GOOGLE_APPLICATION_CREDENTIALS` con la ruta al archivo JSON.');
  }
} catch (err) {
  console.error('Fallo al intentar inicializar Firebase Admin:', err.message || err);
  console.warn('Continuando en modo "mock".');
  useFirebase = false;
  db = null;
}

module.exports = { admin: useFirebase ? admin : null, db, useFirebase };
