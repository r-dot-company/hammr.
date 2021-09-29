import styled from "styled-components"
import { API } from "../api/types"
import ProductScene from "./three/ProductScene"
import Button from "./styled/Button"

const Title = styled.h1`
    font-size: 96px;
    margin: 0;
`

const CanvasContainer = styled.div`
    height: 500px;
`

const ActionContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Price = styled.p`
    margin: 0 64px 0 0;
    font-size: 18px;
`

export default function ProductHero({ product }: {
    product: API.Product
}) {
    return (
        <div>
            <Title>{product.name}</Title>

            <CanvasContainer>
                <ProductScene product={product}/>
            </CanvasContainer>

            <ActionContainer>
                <Price>{product.price}€</Price>
                <Button disabled>Sold Out</Button>
            </ActionContainer>
        </div>
    )
}
