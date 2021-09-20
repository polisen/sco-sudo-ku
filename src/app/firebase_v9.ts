import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

// Your web app's Firebase configuration
const fbConfig = {
  apiKey: 'AIzaSyALlD_4cqvwqB-gpAoz4IPJh3VUUM8y0xk',
  authDomain: 'megatech-ltd.firebaseapp.com',
  projectId: 'megatech-ltd',
  storageBucket: 'megatech-ltd.appspot.com',
  messagingSenderId: '825773504495',
  appId: '1:825773504495:web:181e3c76132798e74ca81a',
};

function initializeFirebase() {
  try {
    const app = initializeApp(fbConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const functions = getFunctions(app);

    if (window.location.hostname === 'localhost') {
      console.debug('testing locally -- hitting local functions and firestore emulators');
      connectFunctionsEmulator(functions, 'localhost', 5001);
      connectAuthEmulator(auth, 'http://localhost:9099');
      connectFirestoreEmulator(db, 'localhost', 8080);
    }
    console.debug('Firebase Initialized');

    return {
      app,
      auth,
      db,
      functions,
    };
  } catch (err) {
    console.debug('err', err);
    console.debug('Error Initializing Firebase');
    return null;
  }
}

const firebase = initializeFirebase();

export default firebase;
