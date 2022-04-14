import { Container } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from 'react';
import Inventory from './components/Inventory';

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

function App(props) {
  const [inventory, setInventory] = useState(['nothing']);
  useEffect(() => {
    onValue(inventoryRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      setInventory(data);
    });
  });
  return (
    <Container>
      <Inventory inventory={inventory} />
    </Container>
  )
}

export default App;
