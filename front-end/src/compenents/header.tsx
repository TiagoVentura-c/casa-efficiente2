import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ListItemButton, Stack } from '@mui/material';
import Image from 'next/image';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GlobalLoading from './global-loading';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';
import Link from 'next/link';

interface Setting {
  item: string;
  onClick: () => any
}



function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

    const router = useRouter()

    const handleLogout = () => {
        Cookie.remove('access_token')
        router.push('/auth/login')
    }

    const settings: Setting[] = [
      {
        item: 'Profile',
        onClick: () => {}
      },
      {
        item: 'Account',
        onClick: () => {}
      },
      {
        item: 'Dashboard',
        onClick: () => {}
      },
      {
        item: 'Logout',
        onClick: handleLogout
      },
  ]
 
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, maxHeight: 74 }} >
        <Toolbar disableGutters sx={{alignSelf: 'flex-start',backgroundColor: '#3D484C', width: 1}} >
          <Stack direction={'row'} alignItems={'center'} flex={1} spacing={2} ml={4} mt={1}>
            <Typography color={'white'} fontSize={18} fontWeight={500} >Casa Eficiente</Typography>
            <Typography color={'white'} fontSize={10} >Powered by</Typography>
            <Box  mt={2} >
               <Link href={'/dashboard'}> <Image unoptimized={true} objectFit="cover" src="/images/Logo_2.webp" alt="Background image" width={50} height={70.44}/></Link>
            </Box>
            <Typography color={'white'} fontSize={18} fontWeight={500} >ISPTEC</Typography>
          </Stack>

          <Stack direction={'row'} alignItems={'center'} spacing={1} mr={2} sx={{ flexGrow: 0,}}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'white' }}>
                <Tooltip title="Open settings">
                    <Avatar alt="Remy Sharp" src="/images/Avatar.svg" />
                </Tooltip>
                <Typography ml={1} fontWeight={'550'} >Tiago Ventura</Typography>
                <KeyboardArrowDownIcon accentHeight={20} />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.item} onClick={handleCloseUserMenu}>
                  <ListItemButton onClick={setting.onClick} >
                    <Typography textAlign="center">{setting.item}</Typography>
                  </ListItemButton>
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </Toolbar>
        <GlobalLoading />
    </AppBar>
  );
}
export default Header;