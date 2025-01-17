import * as React from "react";
import {AppBar, Box, Button, Toolbar} from "@mui/material";


export const Header: React.FC = () => {
    return (
        <AppBar>
            <Toolbar>
                <Box sx={{flexGrow: 1, display: {xs: "none", sm: "flex"}}}>
                    <Button color="inherit">Все котики</Button>
                    <Button color="inherit">Любимые котики</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
