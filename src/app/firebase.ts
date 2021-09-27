import firebase from 'firebase/compat/app';
import 'firebase/compat/functions';
import { firebaseConfig } from './firebaseConfig';
// Initialize Firebase
try {
  firebase.initializeApp(firebaseConfig);
  firebase.functions();

  if (window.location.hostname === 'localhost') {
    console.debug(
      'testing locally -- hitting local functions and firestore emulators',
    );
    firebase.functions().useEmulator('localhost', 5001);
  }
  console.debug('Firebase Initialized');
} catch (err) {
  console.debug('err', err);
  console.debug('Error Initializing Firebase');
}

export default firebase;
