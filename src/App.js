import { Container } from '@mui/material';
// import { initializeApp } from 'firebase/app';
// import { GoogleAuthProvider, EmailAuthProvider, getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState, useRef } from 'react';
import Inventory from './components/Inventory';
import UserList from './components/UserList';

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

// initializeApp(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);

const uiConfig = {
  // signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

function App(props) {
  const inventoryRef = ref(getDatabase(), 'zekoff/inventory');
  const usersRef = ref(getDatabase(), 'users');
  const userAuth = useRef(firebase.auth());

  const [signedIn, setSignedIn] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log('in use effect');
    userAuth.current.onAuthStateChanged(user => setSignedIn(!!user));
    onValue(inventoryRef, (snapshot) => {
      setInventory(snapshot.val());
    });
    onValue(usersRef, (snapshot) => {
      setUsers(snapshot.val());
    });
  }, []);
  console.log('before returning anything');
  if (!signedIn) {
    return <>
      <p>Please sign in.</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={userAuth.current} />
    </>
  }
  return (
    <Container>
      <UserList users={users} />
      <Inventory inventory={inventory} firebaseDb={inventoryRef} />
    </Container>
  )
}

export default App;
