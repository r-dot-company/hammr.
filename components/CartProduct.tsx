import { useContext } from "react"
import styled from "styled-components"
import { API } from "api/types"
import ProductScene from "./three/ProductScene"
import Button from "./styled/Button"
import { createShoprClient } from "api"
import { AppContext } from "lib/context"

const Container = styled.div`
    margin-bottom: 32px;
    border: 1px solid #fff;
    padding: 12px;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Details = styled.div`
    padding: 12px;
`

const DetailsItem = styled.div`
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 16px;
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

export default function CartProduct({ product }: {
    product: API.CartProduct
}) {
    const context = useContext(AppContext)

    const removeFromCart = async () => {
        const shopr = createShoprClient(document.cookie)
        await shopr.deleteCartProduct(product.product.id)
        await context.fetchCart()
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
                {/* <Button dense onClick={removeFromCart}>Remove</Button> */}
                <a onClick={removeFromCart}>Remove</a>
            </Details>

            <CanvasContainer>
                <ProductScene product={product.product}/>
            </CanvasContainer>
        </Container>
    )
}
