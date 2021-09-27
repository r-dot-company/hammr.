import { GetStaticProps, NextPage } from "next"
import styled from "styled-components"
import { API } from "api/types"
import { shopr } from "api"
import ProductHero from "components/ProductHero"

const HeroContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 350px;
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
`

type Props = {
    products: API.Product[]
}

const IndexPage: NextPage<Props> = ({ products }) => {
    return (
        <>
            <HeroContainer>
                <Logo
                    src="assets/logo-white.svg"
                    alt="Logo"
                />
                <BrandName>r. Company</BrandName>
            </HeroContainer>

            {products.map((product) => (
                <ProductContainer key={product.id}>
                    <ProductHero product={product}/>
                </ProductContainer>
            ))}
        </>
    )
}

export default IndexPage

export const getStaticProps: GetStaticProps<Props> = async () => {
    return {
        props: {
            products: await shopr.fetchProducts()
        }
    }
}
