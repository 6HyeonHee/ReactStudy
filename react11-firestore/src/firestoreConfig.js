// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCPZvgIo5kpe545dBAKcTnmkQs6oN74gjQ',
  authDomain: 'reactapp202408-6b3ab.firebaseapp.com',
  projectId: 'reactapp202408-6b3ab',
  storageBucket: 'reactapp202408-6b3ab.appspot.com',
  messagingSenderId: '258232881716',
  appId: '1:258232881716:web:88acb2acc107b8a1703061',
  measurementId: 'G-7ZEMYBWXTF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };
