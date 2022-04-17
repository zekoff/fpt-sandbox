import { List, Typography } from "@mui/material";
import UserListItem from "./UserListItem.jsx";

function UserList(props) {
    const user_list = props.users.map(user => <UserListItem key={user.name} {...user} />)
    return <>
        <Typography variant="h4">Users</Typography>
        <List>
            {user_list}
        </List>
    </>
}

export default UserList;