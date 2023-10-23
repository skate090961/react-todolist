import React from 'react';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {toggleModeAC} from "../../store/reducers/mode-reducer/modeReducer";
import {RootReducerType} from "../../store/rootReducer";
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

const Header = () => {
    const dispatch = useDispatch()
    const isDarkMode = useSelector<RootReducerType, boolean>(state => state.mode.isDarkMode)
    const toggleThemeHandler = () => dispatch(toggleModeAC())


    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todos
                    </Typography>
                    <IconButton onClick={toggleThemeHandler}>
                        {
                            isDarkMode
                                ? <BedtimeOutlinedIcon/>
                                : <LightModeOutlinedIcon style={{ color: '#fff' }}/>
                        }
                    </IconButton>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;