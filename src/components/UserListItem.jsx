import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import ImageMapping from "../util/ImageMapping.jsx";

function UserListItem(props) {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    {ImageMapping[props.image]}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={props.name}
                secondary={`Level: ${props.level}, Coins: ${props.coins}`}
            />
        </ListItem>
    )
}

export default UserListItem;