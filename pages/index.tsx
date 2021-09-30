import { GetServerSideProps, NextPage } from "next"
import styled from "styled-components"
import { API } from "api/types"
import { createShoprClient } from "api"
import ProductHero from "components/ProductHero"

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
    width: 50vw;
`

const BrandName = styled.h1`
    font-size: 96px;
    margin: 64px 0;
    text-align: right;
`

const NavItem = styled.a`
    display: block;
    font-size: 72px;
    font-weight: 800;
    text-align: right;

    &:hover {
        color: #aaaaaa;
    }
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
                            <NavItem href={`#${product.name}`} key={product.id}>
                                {product.name}
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
