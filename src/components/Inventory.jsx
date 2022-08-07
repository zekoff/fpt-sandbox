import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete"
import { useState } from "react";
import { set, ref } from "firebase/database";
import ImageMapping from "../util/ImageMapping"
import { useDatabase } from "reactfire";

function addInventoryItem(newItemText, setNewItemText, inventory, dbRef) {
    set(dbRef, [
        ...inventory,
        newItemText
    ])
    setNewItemText("");
}

function removeInventoryItem(item, inventory, inventoryRef) {
    const trimmedInventory = inventory.filter(element => element !== item);
    set(inventoryRef, trimmedInventory);
}

function Inventory(props) {
    const [newItemText, setNewItemText] = useState("");
    const inventoryRef = ref(useDatabase(), 'zekoff/inventory');
    const inventory_list = props.inventory.map(item =>
        <ListItem key={item} disablePadding secondaryAction={
            <IconButton onClick={() => removeInventoryItem(item, props.inventory, inventoryRef)}>
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
                addInventoryItem(newItemText, setNewItemText, props.inventory, inventoryRef);
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