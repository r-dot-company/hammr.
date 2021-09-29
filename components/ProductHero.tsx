import { shopr } from "api"
import styled from "styled-components"
import { Color } from "three"
import { API } from "../api/types"
import ProductScene from "./three/ProductScene"
import Button from "./styled/Button"
import { getProductMeta } from "lib/products"

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

function findModel(product: API.Product) {
    return product.assets.find((asset) => asset.type.key === "model")
}

export default function ProductHero({ product }: {
    product: API.Product
}) {
    const model = findModel(product)
    const meta = getProductMeta(product)

    return (
        <div>
            <Title>{product.name}</Title>

            { model && (
                <CanvasContainer>
                    <ProductScene
                        modelUrl={shopr.getAssetURL(model)}
                        modelColor={meta.modelColor}
                    />
                </CanvasContainer>
            ) }                

            <ActionContainer>
                <Price>{product.price}€</Price>
                <Button disabled>Sold Out</Button>
            </ActionContainer>
        </div>
    )
}
