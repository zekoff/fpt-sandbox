import { Typography, Button, List, ListItem, ListItemText } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';

function Layout(props) {
    return <>
        <Typography variant="h3">Family Point Tracker</Typography>
        <List>
            <ListItem>
                <ListItemText>
                    <Link to="/users">Users</Link>
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>
                    <Link to="/inventory">Inventory</Link>
                </ListItemText>
            </ListItem>
        </List>
        <Outlet />
        <Button onClick={() => { signOut(getAuth()) }}>Log Out</Button>
    </>
}

export default Layout;