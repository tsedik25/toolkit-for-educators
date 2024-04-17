import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import {
  getDatabase,
  ref,
  set,
  get,
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDCnNGjRf8ao5yK5n3sqacZ9Ajp0e-HVRM',
  authDomain: 'toolkit-for-educators.firebaseapp.com',
  projectId: 'toolkit-for-educators',
  storageBucket: 'toolkit-for-educators.appspot.com',
  messagingSenderId: '895856385495',
  appId: '1:895856385495:web:e98b550a23f950b8503f92',
  measurementId: 'G-PVWGQQ459G',
  databaseURL:
    'https://toolkit-for-educators-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function writeToFirebase(type) {
  const db = getDatabase();

  const dbRef = ref(db, 'downloads/');
  get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      const existingData = snapshot.val();
      const existingAssignments = Object.keys(existingData);
      if (existingAssignments?.includes(type)) {
        set(dbRef, {
          ...existingData,
          [type]: {
            downloads: existingData?.[type]?.downloads + 1,
          },
        });
      } else {
        set(dbRef, {
          ...existingData,
          [type]: {
            downloads: 1,
          },
        });
      }
    } else {
      set(dbRef, {
        [type]: {
          downloads: 1,
        },
      });
    }
  });
}

async function getDbData() {
  const db = getDatabase();

  const dbRef = ref(db, 'downloads/');
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      return {};
    }
  } catch (error) {
    console.error('Error fetching data from database:', error);
    return {};
  }
}


export { writeToFirebase, getDbData };
