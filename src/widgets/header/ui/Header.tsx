import * as React from "react";
import {AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {Link} from "react-router-dom";

export const Header: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar>
            <Toolbar>
                <Box sx={{flexGrow: 1, display: {xs: "none", sm: "flex"}}}>
                    <Button color="inherit" component={Link} to="/">Все котики</Button>
                    <Button color="inherit" component={Link} to="/favoriteCats">Любимые котики</Button>
                </Box>
                <Box sx={{display: {xs: "flex", sm: "none"}}}>
                    <IconButton
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenuOpen}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleMenuClose} component={Link} to="/">Все котики</MenuItem>
                        <MenuItem onClick={handleMenuClose} component={Link} to="/favoriteCats">Любимые котики</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
