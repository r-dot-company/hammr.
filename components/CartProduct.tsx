import { useContext } from "react"
import styled from "styled-components"
import { createShoprClient } from "api"
import { API } from "api/types"
import { AppContext } from "lib/context"
import ProductScene from "./three/ProductScene"
import Box from "./styled/Box"

const Container = styled(Box)`
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Details = styled.div`
    padding: 12px;
`

const DetailsItem = styled.div<{
    dense?: boolean
}>`
    font-size: 20px;
    font-weight: 800;
    margin-bottom: ${props => !props.dense ? "16px" : "0"};
    margin-right: ${props => !props.dense ? "0" : "16px"};
`

const ProductName = styled(DetailsItem)`
    font-size: 24px;
`

const DetailsHelper = styled.div`
    font-size: 16px;
    font-weight: 400;
`

const CanvasContainer = styled.div`
    width: 200px;
    height: 200px;
`

export default function CartProduct({ product, dense = false }: {
    product: API.CartProduct,
    dense?: boolean
}) {
    const context = useContext(AppContext)

    const removeFromCart = async () => {
        const shopr = createShoprClient(document.cookie)
        await shopr.deleteCartProduct(product.product.id)
        await context.fetchCart()
    }

    if (dense) {
        return (
            <Container>
                <div>
                    <DetailsItem dense>{ product.product.name }</DetailsItem>
                    <DetailsItem dense>Amount: { product.amount }</DetailsItem>
                </div>
                <DetailsItem dense>{ product.product.price } €</DetailsItem>
            </Container>
        )
    }

    return (
        <Container>
            <Details>
                <ProductName>{ product.product.name }</ProductName>
                <DetailsItem>
                    Amount: { product.amount }
                    <DetailsHelper>(Only one per customer)</DetailsHelper>
                </DetailsItem>
                <DetailsItem>{ product.product.price } €</DetailsItem>
                <a onClick={removeFromCart}>Remove</a>
            </Details>

            <CanvasContainer>
                <ProductScene product={product.product}/>
            </CanvasContainer>
        </Container>
    )
}
