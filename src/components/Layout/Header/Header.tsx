import React from "react"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import MenuIcon from "@mui/icons-material/Menu"
import { useSelector } from "react-redux"
import { AppRootStateType } from "app/rootReducer"
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import LinearProgress from "@mui/material/LinearProgress"
import s from "./Header.module.css"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { logOutTC } from "features/Login/model/authThunk"
import { toggleAppModeAC } from "app/appSlice"
import { selectStatus } from "app/appSelectors"
import { selectIsAuth } from "features/Login/model/authSelectors"
import logo from "assets/icons/logo-no-background.png"

const Header = () => {
  const dispatch = useAppDispatch()
  const isAuth = useSelector(selectIsAuth)
  const isDarkMode = useSelector<AppRootStateType, boolean>((state) => state.app.isDarkMode)
  const status = useSelector(selectStatus)
  const toggleThemeHandler = () => dispatch(toggleAppModeAC())

  const logOutHandler = () => dispatch(logOutTC())

  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, alignItems: "center", display: "flex" }}>
              <img src={logo} alt="logo" className={s.logo} />
            </Typography>
            <IconButton onClick={toggleThemeHandler}>
              {isDarkMode ? <BedtimeOutlinedIcon /> : <LightModeOutlinedIcon style={{ color: "#fff" }} />}
            </IconButton>
            {isAuth && (
              <Button color="inherit" onClick={logOutHandler}>
                Log Out
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {status === "loading" && <LinearProgress className={s.linear_loader} />}
    </>
  )
}

export default React.memo(Header)
