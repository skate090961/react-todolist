import React, {useState} from 'react';
import TodoLists from "./components/TodoLists/TodoLists";
import Header from "./components/Header/Header";
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import {darkTheme, lightTheme} from "./assets/styles/themes";
import {useSelector} from "react-redux";
import {RootReducerType} from "./store/rootReducer";

const App = () => {
    const isDarkMode = useSelector<RootReducerType, boolean>(state => state.mode.isDarkMode)
    const theme = isDarkMode ? darkTheme : lightTheme

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div>
                <Header/>
                <Container>
                    <TodoLists/>
                </Container>
            </div>
        </ThemeProvider>
    )
}

export default App