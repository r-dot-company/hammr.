import { GetServerSideProps, NextPage } from "next"
import styled from "styled-components"
import { API } from "api/types"
import { createShoprClient } from "api"
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
`

const BrandName = styled.h1`
    font-size: 96px;
    margin: 64px 0;
    text-align: right;
`

const NavItem = styled(Link)`
    display: block;
    font-size: 72px;
    text-align: right;
`

type Props = {
    products: API.Product[],
    user: API.User | null
}

const IndexPage: NextPage<Props> = ({ products, user }) => {
    console.log({ user })

    return (
        <>
            <HeroContainer>
                <Logo
                    src="assets/logo-white.svg"
                    alt="Logo"
                />
                <HeroInnerNavContainer>
                    <BrandName>r. Company</BrandName>
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

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const shopr = createShoprClient(context.req.headers.cookie || "")
    return {
        props: {
            products: await shopr.getProducts(),
            user: await shopr.catch(shopr.getProfile())
        }
    }
}
