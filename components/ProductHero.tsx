import { shopr } from "api"
import styled from "styled-components"
import { API } from "../api/types"
import Button from "./styled/Button"

const Title = styled.h1`
    font-size: 96px;
    margin: 0;
`

const PreviewImage = styled.img`
    max-width: 1500px;
    width: 100vw;
    margin: auto;
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

function findPreviewImage(product: API.Product) {
    return product.assets.find((asset) => asset.type.key === "image")
}

export default function ProductHero({ product }: {
    product: API.Product
}) {
    const previewImage = findPreviewImage(product)

    return (
        <div>
            <Title>{product.name}</Title>

            { previewImage && (
                <PreviewImage
                    src={shopr.getAssetURL(previewImage)}
                    alt="Preview"
                />
            ) }

            <ActionContainer>
                <Price>{product.price}€</Price>
                <Button disabled>Sold Out</Button>
            </ActionContainer>
        </div>
    )
}
