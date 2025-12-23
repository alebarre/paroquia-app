import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCg80sSlGIJi0Nki0iBh_INfYjghPyQTAw',
  authDomain: 'paroquia-app-80d22.firebaseapp.com',
  projectId: 'paroquia-app-80d22',
  storageBucket: 'paroquia-app-80d22.firebasestorage.app',
  messagingSenderId: '1285184543',
  appId: '1:1285184543:web:1c6a8438cbace440a7492a',
  measurementId: 'G-MWXYQXC4Q5',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);