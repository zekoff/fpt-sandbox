import { Button, Container } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from 'react';
import Inventory from './components/Inventory';
import UserList from './components/UserList';
import { signInWithGoogle } from './util/AuthHelper.js';

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

initializeApp(firebaseConfig);
const inventoryRef = ref(getDatabase(), 'zekoff/inventory');
const usersRef = ref(getDatabase(), 'users');

function App(props) {
  const [inventory, setInventory] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(getAuth().currentUser);
  useEffect(() => {
    getAuth().onAuthStateChanged(user => setCurrentUser(getAuth().currentUser));
    onValue(inventoryRef, (snapshot) => {
      setInventory(snapshot.val());
    });
    onValue(usersRef, (snapshot) => {
      setUsers(snapshot.val());
    });
  }, []);
  if (!currentUser) {
    return <Button onClick={signInWithGoogle}>Sign In</Button>
  }
  return (
    <Container>
      <UserList users={users} />
      <Inventory inventory={inventory} firebaseDb={inventoryRef} />
    </Container>
  )
}

export default App;
