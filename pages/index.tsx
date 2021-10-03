import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import styled from "styled-components"
import { API } from "api/types"
import { shopr } from "api"
import { makeTitle } from "lib/utils"
import ProductHero from "components/ProductHero"
import Link from "components/styled/Link"

const HeroContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 400px;
`

const HeroInnerNavContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const ProductContainer = styled.div`
    margin-bottom: 350px;
`

const Logo = styled.img`
    height: calc(100vh - ${props => props.theme.contentMargin});
    margin-top: -${props => props.theme.contentPaddingTop};
`

const BrandName = styled.h1`
    font-size: 96px;
    text-align: right;
    margin: 0;
    margin-bottom: 64px;
`

const NavItem = styled(Link)`
    display: block;
    font-size: 72px;
    text-align: right;
`

type Props = {
    products: API.Product[]
}

const IndexPage: NextPage<Props> = ({ products }) => {
    return (
        <>
            <Head>
                <title>{ makeTitle("Hammr.") }</title>
            </Head>

            <HeroContainer>
                <Logo
                    src="assets/logo-white.svg"
                    alt="Logo"
                />
                <HeroInnerNavContainer>
                    <nav>
                        {products.map((product) => (
                            <NavItem key={product.id}>
                                <a href={`#${product.name}`}>
                                    {product.name}
                                </a>
                            </NavItem>
                        ))}
                    </nav>
                </HeroInnerNavContainer>
            </HeroContainer>

            {products.map((product) => (
                <ProductContainer key={product.id} id={product.name}>
                    <ProductHero product={product}/>
                </ProductContainer>
            ))}
        </>
    )
}

export default IndexPage

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    return {
        props: {
            products: await shopr.getProducts()
        }
    }
}
