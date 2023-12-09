import React from 'react'
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import MenuIcon from '@mui/icons-material/Menu'
import {useSelector} from "react-redux"
import {RequestStatusType, toggleAppModeAC} from "../../../store/reducers/app-reducer/appReducer"
import {AppRootStateType} from "../../../store/rootReducer"
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import LinearProgress from "@mui/material/LinearProgress"
import s from './Header.module.css'
import {useAppDispatch} from "../../../hooks/useAppDispatch/useAppDispatch"
import {logOutTC} from "../../../store/reducers/auth-reducer/auth-thunk"

const Header = () => {
    const dispatch = useAppDispatch()
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    const isDarkMode = useSelector<AppRootStateType, boolean>(state => state.app.isDarkMode)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const toggleThemeHandler = () => dispatch(toggleAppModeAC())

    const logOutHandler = () => dispatch(logOutTC())

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
                                : <LightModeOutlinedIcon style={{color: '#fff'}}/>
                        }
                    </IconButton>
                    {isAuth && <Button color="inherit" onClick={logOutHandler}>Log Out</Button>}
                </Toolbar>
            </Container>
            {status === 'loading' && <LinearProgress className={s.linear_loader}/>}
        </AppBar>
    );
};

export default React.memo(Header)