import React, {ReactNode} from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header/Header";
import Container from "@mui/material/Container";
import {CustomizedSnackbars} from "../Shared/ErrorSnackbar/ErrorSnackbar";

export const Layout = ({children}: { children: ReactNode }) => {
    return (
        <>
            <CssBaseline/>
            <Header/>
            <Container>
                {children}
            </Container>
            <CustomizedSnackbars/>
        </>
    )
}