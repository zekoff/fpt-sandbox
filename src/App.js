import { Button, Container } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from 'react';
import Inventory from './components/Inventory';
import UserList from './components/UserList';
import Layout from './components/Layout';
import { signInWithGoogle } from './util/AuthHelper.js';
import { Routes, Route } from 'react-router-dom';

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
const authorizedUsersRef = ref(getDatabase(), 'authorized_users');

function App(props) {
  const [inventory, setInventory] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(getAuth().currentUser);
  const [authorizedUserList, setAuthorizedUserList] = useState([]);
  useEffect(() => {
    getAuth().onAuthStateChanged(user => setCurrentUser(getAuth().currentUser));
    onValue(inventoryRef, (snapshot) => {
      setInventory(snapshot.val());
    });
    onValue(usersRef, (snapshot) => {
      setUsers(snapshot.val());
    });
    onValue(authorizedUsersRef, (snapshot) => {
      setAuthorizedUserList(snapshot.val());
    });
  }, []);
  if (!currentUser) {
    return <Button onClick={signInWithGoogle}>Sign In</Button>
  }
  if (!authorizedUserList.includes(currentUser.uid)) return <p>Not authorized.</p>
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="users" element={<UserList users={users} />} />
          <Route path="inventory" element={<Inventory inventory={inventory} firebaseDb={inventoryRef} />} />
        </Route>
      </Routes>
    </Container>
  )
}

export default App;
