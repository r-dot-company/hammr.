import type { AppProps } from "next/app"
import Layout from "components/Layout"
import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #000;
    color: #fff;
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
    <Layout>
      <GlobalStyles/>
      <Component {...pageProps} />
    </Layout>
  )
}
