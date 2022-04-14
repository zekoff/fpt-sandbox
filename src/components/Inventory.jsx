import { List, ListItem, ListItemText } from "@mui/material";

function Inventory(props) {
    const inventory_list = props.inventory.map(item =>
        <ListItem>
            <ListItemText>{item}</ListItemText>
        </ListItem>
    );
    return <List>{inventory_list}</List>;
}

export default Inventory;