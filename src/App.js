import { Container } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";
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

function App(props) {
  const [inventory, setInventory] = useState('nothing');
  useEffect(() => {
    const dbRef = ref(getDatabase());
    let firebase_data;
    get(child(dbRef, `zekoff`)).then((snapshot) => {
      if (snapshot.exists()) {
        firebase_data = snapshot.val();
        setInventory(JSON.stringify(firebase_data));
        console.log(firebase_data);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  });
  return <Container>
    <Inventory inventory={inventory} />
  </Container>
}

export default App;
