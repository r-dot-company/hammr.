import type { AppProps } from "next/app"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import Layout from "components/Layout"
import theme from "lib/theme"

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

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <GlobalStyles/>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
