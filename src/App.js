import { Container } from '@mui/material';
import { ref } from "firebase/database";
import Inventory from './components/Inventory';
import UserList from './components/UserList';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import { useDatabase, useDatabaseListData, useDatabaseObjectData, useFirestore, useFirestoreCollectionData, useUser } from 'reactfire';
import { SignInButton } from './components/Authentication';
import { collection, orderBy, query } from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';

function App(props) {
  const { data: currentUser } = useUser();
  // const inventoryRef = ref(useDatabase(), 'zekoff/inventory');
  // const { data:inventory } = useDatabaseObjectData(inventoryRef);
  // if (inventory) delete inventory['NO_ID_FIELD'];
  const firestore = useFirestore();
  const usersCollection = collection(firestore, 'users');
  const usersQuery = query(usersCollection, orderBy('name', 'asc'));
  const { data: users } = useFirestoreCollectionData(usersQuery, {
    idField: 'id'
  });
  // const usersRef = ref(useDatabase(), 'users');
  // const { data: users } = useDatabaseListData(usersRef);
  // const authorizedUsersRef = ref(useDatabase(), 'authorized_users')
  // const { data: authorizedUsers } = useDatabaseListData(authorizedUsersRef);
  if (!currentUser) {
    return <SignInButton />
  }
  // if (!authorizedUsers?.includes(currentUser.uid)) return <p>Not authorized.</p>
  console.log(users);
  const inventory = users?.filter(user=>user.name=='Michael').at(0).inventory;
  console.log(inventory);
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="users" element={<UserList users={users} />} />
          <Route path="inventory" element={<Inventory inventory={inventory} />} />
        </Route>
      </Routes>
    </Container>
  )
}

export default App;
