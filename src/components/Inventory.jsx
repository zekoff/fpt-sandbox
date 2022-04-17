import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete"
import { useState } from "react";
import { set } from "firebase/database";
import ImageMapping from "../util/ImageMapping"

function addInventoryItem(newItemText, setNewItemText, inventory, dbRef) {
    console.log(newItemText);
    set(dbRef, [
        ...inventory,
        newItemText
    ])
    setNewItemText("");
}

function Inventory(props) {
    const [newItemText, setNewItemText] = useState("");
    const inventory_list = props.inventory.map(item =>
        <ListItem key={item} disablePadding secondaryAction={
            <IconButton onClick={() => {
                const trimmedInventory = props.inventory.filter(element => element !== item);
                set(props.firebaseDb, trimmedInventory);
            }}>
                <DeleteIcon />
            </IconButton>
        }>
            <ListItemButton>
                <ListItemIcon>
                    {/* <CategoryIcon /> */}
                    {ImageMapping['Health Kit']}
                </ListItemIcon>
                <ListItemText primary={item} />
            </ListItemButton>
        </ListItem>
    );
    return <>
        <Typography variant="h4">Inventory</Typography>
        <List>
            {inventory_list}
        </List>
        <form
            onSubmit={(event) => {
                event.preventDefault();
                addInventoryItem(newItemText, setNewItemText, props.inventory, props.firebaseDb);
            }}
        >
            <TextField
                variant="outlined"
                label="New item"
                value={newItemText}
                onChange={(event) => { setNewItemText(event.target.value); }}
            />
        </form>
    </>;
}

export default Inventory;