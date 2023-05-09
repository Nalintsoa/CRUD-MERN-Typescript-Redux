import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { logoutFromBack } from '../state/actions/action-creator/authActions';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


const MenuAppBar = () => {


    // const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     // setAuth(event.target.checked);
    // };

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        logoutFromBack();
        handleClose();
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* <FormGroup> */}
            {/* <FormControlLabel
                    control={
                        <Switch
                            // checked={auth}
                            onChange={handleChange}
                            aria-label="login switch"
                        />
                    }
                    label={auth ? 'Logout' : 'Login'}
                />
            </FormGroup> */}
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        CRUD
                    </Typography>

                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={logout}>
                                {/* <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>Logout</Link> */}
                                Logout
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Etudiant</Link>
                            </MenuItem>
                        </Menu>
                    </div>

                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default MenuAppBar;