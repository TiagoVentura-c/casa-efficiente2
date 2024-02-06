"use client"
import { Item, menus,} from "@/_data/home";
import { Box, Divider, Drawer, List, Toolbar } from "@mui/material";
import DrawerButtonItem from "./drawer-button-item";
import { useState } from "react";
import DrawerButtonDarkMode from "./drawer-button-item-dark-mode";

const drawerWidth = 240;

export default function GlobalNav(){
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    return(
        <Drawer
            variant="permanent"
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto', marginTop: 10}}>
            <List sx={{ marginRight: 4 }}>
                {menus.map((sessions, index) => {
                    return(
                        <>
                            {sessions.items.map((item: Item, index) => (
                                (
                                    item.slug == 'dark-mode' ? <DrawerButtonDarkMode item={item}key={index}  /> : <DrawerButtonItem key={index} close={close} item={item}  />
                                )
                            ))}
                            {!(index+1 == menus.length )?
                            <Divider key={index} sx={{marginX: 3}} />
                            : null
                        }
                        </>
                    )
                })}
            </List>
            </Box>
        </Drawer>
    )
}

