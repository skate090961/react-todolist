import React, { useEffect } from "react"
import "../assets/styles/global.scss"
import { Layout } from "components/Layout/Layout"
import { Pages } from "components/Pages/Pages"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { darkTheme, lightTheme } from "assets/styles/themes"
import { ThemeProvider } from "@mui/material"
import Loader from "../common/components/Loader/Loader"
import { initializeAppTC } from "./appThunk"
import { selectIsDarkMode, selectIsInitialized } from "./appSelectors"

const App = () => {
  const isDarkMode = useSelector(selectIsDarkMode)
  const isInitialized = useSelector(selectIsInitialized)
  const theme = isDarkMode ? darkTheme : lightTheme
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  return (
    <>
      {!isInitialized ? (
        <Loader />
      ) : (
        <ThemeProvider theme={theme}>
          <Layout>
            <Pages />
          </Layout>
        </ThemeProvider>
      )}
    </>
  )
}

export default App
