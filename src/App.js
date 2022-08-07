import { Button, Container } from '@mui/material';
import { ref } from "firebase/database";
import Inventory from './components/Inventory';
import UserList from './components/UserList';
import Layout from './components/Layout';
import { signInWithGoogle } from './util/AuthHelper.js';
import { Routes, Route } from 'react-router-dom';
import { useDatabase, useDatabaseListData, useUser } from 'reactfire';

function App(props) {
  const { data: currentUser } = useUser();
  const inventoryRef = ref(useDatabase(), 'zekoff/inventory');
  const { data:inventory} = useDatabaseListData(inventoryRef);
  const usersRef = ref(useDatabase(), 'users');
  const { data: users} = useDatabaseListData(usersRef);
  const authorizedUsersRef = ref(useDatabase(), 'authorized_users')
  const { data: authorizedUsers} = useDatabaseListData(authorizedUsersRef);
  if (!currentUser) {
    return <Button onClick={signInWithGoogle}>Sign In</Button>
  }
  if (!authorizedUsers?.includes(currentUser.uid)) return <p>Not authorized.</p>
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
