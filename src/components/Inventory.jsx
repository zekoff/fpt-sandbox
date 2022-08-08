import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete"
import { useState } from "react";
import { ref, push, remove, child } from "firebase/database";
import ImageMapping from "../util/ImageMapping"
import { useDatabase } from "reactfire";

function addInventoryItem(newItemText, setNewItemText, dbRef) {
    push(dbRef, newItemText);
    setNewItemText("");
}

function removeInventoryItem(itemKey, inventoryRef) {
    remove(child(inventoryRef, itemKey))
}

function Inventory(props) {
    const [newItemText, setNewItemText] = useState("");
    const inventoryRef = ref(useDatabase(), 'zekoff/inventory');
    const inventoryList = Object.entries(props.inventory || {}).map(([key, value]) =>
        <ListItem key={key} disablePadding secondaryAction={
            <IconButton onClick={() => removeInventoryItem(key, inventoryRef)}>
                <DeleteIcon />
            </IconButton>
        }>
            <ListItemButton>
                <ListItemIcon>
                    {/* <CategoryIcon /> */}
                    {ImageMapping['Health Kit']}
                </ListItemIcon>
                <ListItemText primary={value} />
            </ListItemButton>
        </ListItem>
    );
    return <>
        <Typography variant="h4">Inventory</Typography>
        <List>
            {inventoryList}
        </List>
        <form
            onSubmit={(event) => {
                event.preventDefault();
                if (newItemText) addInventoryItem(newItemText, setNewItemText, inventoryRef);
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