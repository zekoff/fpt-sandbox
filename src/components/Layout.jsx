import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import { SignOutButton } from "./Authentication";

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
        <SignOutButton />
    </>
}

export default Layout;