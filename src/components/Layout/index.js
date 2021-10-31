import React from 'react'
import { ThemeProvider } from 'styled-components';

import Header from 'components/Header'

import { GlobalStyles, lightTheme, darkTheme } from 'styles/GlobalStyles'

import { useMetaDataQuery } from "hooks/useMetaDataQuery"

const Layout = ({ children }) => {
    const data = useMetaDataQuery();

    return (
        <ThemeProvider theme={darkTheme}>
            <GlobalStyles />
            <Header siteTitle={data.title} />
            {children}
        </ThemeProvider>
    )
}

export default Layout
