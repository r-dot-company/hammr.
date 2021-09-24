import styled from "styled-components"

const ProductContainer = styled.div`
    margin-bottom: 128px;
    text-align: center;
`

export default function Product({ product }: {
    product: {
        name: string,
        price: number
    }
}) {
    return (
        <ProductContainer>
            <h1>{product.name}</h1>
        </ProductContainer>
    )
}
