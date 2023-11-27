import React from 'react';
import TodoLists from "../components/Pages/TodoLists/TodoLists";
import Header from "../components/Layout/Header/Header";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/private-theming/ThemeProvider";
import {darkTheme, lightTheme} from "../assets/styles/themes";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/rootReducer";
import '../assets/styles/global.scss'
import {CustomizedSnackbars} from "../components/Shared/ErrorSnackbar/ErrorSnackbar";

const App = () => {
    const isDarkMode = useSelector<AppRootStateType, boolean>(state => state.app.isDarkMode)
    const theme = isDarkMode ? darkTheme : lightTheme

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header/>
            <Container>
                <TodoLists/>
            </Container>
            <CustomizedSnackbars/>
        </ThemeProvider>
    )
}

export default App