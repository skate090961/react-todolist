import React, {useEffect} from 'react';
import '../assets/styles/global.scss'
import {Layout} from "../components/Layout/Layout";
import {Pages} from "../components/Pages/Pages";
import {useAppDispatch} from "../hooks/useAppDispatch/useAppDispatch";
import {initializeAppTC} from "../store/reducers/app-reducer/appReducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/rootReducer";
import {darkTheme, lightTheme} from "../assets/styles/themes";
import {CircularProgress, ThemeProvider} from "@mui/material";
import Loader from "../components/Shared/Loader/Loader";

const App = () => {
    const isDarkMode = useSelector<AppRootStateType, boolean>(state => state.app.isDarkMode)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const theme = isDarkMode ? darkTheme : lightTheme
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    return (
        <>
            {!isInitialized
                ?
                <Loader/>
                :
                <ThemeProvider theme={theme}>
                    <Layout>
                        <Pages/>
                    </Layout>
                </ThemeProvider>
            }
        </>
    )
}

export default App