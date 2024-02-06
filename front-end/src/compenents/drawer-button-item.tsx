import { Item } from "@/_data/home";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

type Props = {
    item: Item;
    close: () => false | void;
}

export default function DrawerButtonItem({item, close}: Props){
    const segment = useSelectedLayoutSegment();
    const isActive = item.slug === segment;

    return (
        <ListItem disablePadding sx={{width: '100%', marginBottom: 1, borderTopRightRadius: 30, borderBottomRightRadius: 30, backgroundColor: isActive ? '#E8F0FE': null ,}} >
            <ListItemButton>
                <ListItemIcon>
                    <item.Icon sx={{color: isActive ? '#ffc107': null }} />
                </ListItemIcon>
                <Link onClick={close} href={`/${item.slug}`} 
                    style={{textDecoration: 'none', fontWeight: 'Semi-Bold' }} 
                >
                    <ListItemText primary={item.name} sx={{ marginLeft: -3, color: isActive ? '#ffc107': '#25282C',  }} />
                </Link>
            </ListItemButton>
        </ListItem>
    )
}