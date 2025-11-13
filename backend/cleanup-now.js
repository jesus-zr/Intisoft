const axios = require('axios');
const FIREBASE_DB_URL = 'https://intiscorp-a31ad-default-rtdb.firebaseio.com';

(async function(){
  const keys = ['user_001','user_002','user_003'];
  for(const k of keys){
    try{
      const resp = await axios.delete(`${FIREBASE_DB_URL}/users/${k}.json`);
      console.log(`Deleted ${k}:`, resp.status);
    }catch(e){
      console.error(`Error deleting ${k}:`, e.response?.statusText || e.message);
    }
  }
})();
