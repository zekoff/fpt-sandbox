import { Typography, Button, List, ListItem, ListItemText } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { useAuth } from "reactfire";

function Layout(props) {
    const auth = useAuth();
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
        <Button onClick={() => { signOut(auth) }}>Log Out</Button>
    </>
}

export default Layout;