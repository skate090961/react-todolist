import React from 'react';
import TodoLists from "../components/Pages/TodoLists/TodoLists";
import Header from "../components/Layout/Header/Header";
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import {darkTheme, lightTheme} from "../assets/styles/themes";
import {useSelector} from "react-redux";
import {RootReducerType} from "../store/rootReducer";
import '../assets/styles/global.scss'

const App = () => {
    const isDarkMode = useSelector<RootReducerType, boolean>(state => state.mode.isDarkMode)
    const theme = isDarkMode ? darkTheme : lightTheme

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header/>
            <Container>
                <TodoLists/>
            </Container>
        </ThemeProvider>
    )
}

export default App