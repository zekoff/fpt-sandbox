import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, FirebaseAppProvider, useFirebaseApp, FirestoreProvider } from 'reactfire';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBjYabqy9_P67Ka8Fzwj3ZsXn3CN4HhVkE",
  authDomain: "fpt-sandbox.firebaseapp.com",
  databaseURL: "https://fpt-sandbox-default-rtdb.firebaseio.com",
  projectId: "fpt-sandbox",
  storageBucket: "fpt-sandbox.appspot.com",
  messagingSenderId: "620589844068",
  appId: "1:620589844068:web:2d576ae7d28cbb723fc171",
  measurementId: "G-CQ2P0875MP"
};

function FirebaseWrapper(props) {
  return (
    <AuthProvider sdk={getAuth(useFirebaseApp())}>
      <FirestoreProvider sdk={getFirestore(useFirebaseApp())}>
        <App />
      </FirestoreProvider>
    </AuthProvider>
  )
}

const container = document.getElementById('root');
createRoot(container).render(
  <React.StrictMode>
    <CssBaseline />
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <BrowserRouter>
        <FirebaseWrapper />
      </BrowserRouter>
    </FirebaseAppProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
