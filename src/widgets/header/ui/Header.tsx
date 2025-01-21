import * as React from "react";
import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {Link, useLocation} from "react-router-dom";

export const Header: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const location = useLocation();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const getPageTitle = () => {
        switch (location.pathname) {
            case "/":
                return "Все котики";
            case "/favoriteCats":
                return "Любимые котики";
            default:
                return "Страница";
        }
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <AppBar>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box sx={{flexGrow: 1, display: {xs: "none", sm: "flex"}}}>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/"
                            sx={{
                                backgroundColor: isActive("/") ? "#24509C" : "transparent"
                            }}
                        >
                            Все котики
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/favoriteCats"
                            sx={{
                                backgroundColor: isActive("/favoriteCats") ? "#24509C" : "transparent"
                            }}
                        >
                            Любимые котики
                        </Button>
                    </Box>
                    <Box sx={{display: {xs: "flex", sm: "none"}, alignItems: "center"}}>
                        <IconButton
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography sx={{fontSize: "18px", marginLeft: "10px"}}>
                            {getPageTitle()}
                        </Typography>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem onClick={handleMenuClose} component={Link} to="/">Все котики</MenuItem>
                            <MenuItem onClick={handleMenuClose} component={Link} to="/favoriteCats">Любимые
                                котики</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
