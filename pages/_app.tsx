import "lib/nprogress.css"
import { useState, useEffect } from "react"
import App from "next/app"
import type { AppContext, AppProps } from "next/app"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import Layout from "components/Layout"
import theme from "lib/theme"
import { createShoprClient } from "api"
import { API } from "api/types"
import {
    AppContext as ReactAppContext,
    AppContextAttributes as ReactAppContextAttributes,
    AppContextType as ReactAppContextType,
    fetchContext
} from "lib/context"
import { useRouterProgress } from "lib/utils"

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
        cursor: pointer;
    
        &:hover {
            color: #aaaaaa;
        }
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
    useRouterProgress()

    const [user, setUser] = useState<API.User | null>(props.user)
    const [cart, setCart] = useState<API.CartProduct[] | null>(props.cart)

    const fetchCart = async () => {
        const shopr = createShoprClient(document.cookie)
        setCart(await shopr.getCart())
    }
    
    const appContextValue: ReactAppContextType = {
        user, setUser,
        cart, setCart, fetchCart
    }

    useEffect(() => {
        appContextValue.fetchCart()
    }, [appContextValue.user?.id])

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
