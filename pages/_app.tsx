import { useState } from "react"
import App from "next/app"
import type { AppContext, AppProps } from "next/app"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import Layout from "components/Layout"
import theme from "lib/theme"
import { API } from "api/types"
import { createShoprClient } from "api"
import {
    AppContext as ReactAppContext,
    AppContextAttributes as ReactAppContextAttributes,
    AppContextType as ReactAppContextType,
    fetchContext
} from "lib/context"

const GlobalStyles = createGlobalStyle`
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: 'Poppins', sans-serif;
        background-color: #000;
        color: #fff;
        scroll-behavior: smooth;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
    }
`

export default function MyApp({
    Component,
    pageProps,
    ...props
}: AppProps & ReactAppContextAttributes) {
    const [user, setUser] = useState<API.User | null>(props.user)
    const [cart, setCart] = useState<API.CartProduct[] | null>(props.cart)
    
    const appContextValue: ReactAppContextType = {
        user, setUser,
        cart, setCart
    }
    
    return (
        <ReactAppContext.Provider value={appContextValue}>
            <ThemeProvider theme={theme}>
                <Layout>
                    <GlobalStyles/>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </ReactAppContext.Provider>
    )
}

MyApp.getInitialProps = async (appContext: AppContext): Promise<
    ReactAppContextAttributes
> => {
    const appProps = await App.getInitialProps(appContext)
    const shopr = createShoprClient(appContext.ctx.req?.headers.cookie || "")
    const context = await fetchContext(shopr)
    return {
        ...appProps,
        ...context
    }
}
