import { useContext } from "react"
import styled from "styled-components"
import { API } from "../api/types"
import ProductScene from "./three/ProductScene"
import Button from "./styled/Button"
import { AppContext } from "lib/context"
import { useRouter } from "next/router"
import { createShoprClient } from "api"

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
    const router = useRouter()

    const context = useContext(AppContext)

    const isInCart = context.cart?.some((_product) => _product.product.id === product.id)

    const addToCart = async () => {
        if (!context.user) {
            router.push("/login")
            return
        }
        const shopr = createShoprClient(document.cookie)
        await shopr.catch(shopr.addCartProduct({
            productId: product.id,
            amount: 1
        }))
        await context.fetchCart()
    }

    return (
        <div>
            <Title>{product.name}</Title>

            <CanvasContainer>
                <ProductScene product={product}/>
            </CanvasContainer>

            <ActionContainer>
                <Price>{product.price}€</Price>
                { !isInCart
                    ? <Button onClick={addToCart}>Add to cart</Button>
                    : <Button disabled>In cart</Button>
                }
            </ActionContainer>
        </div>
    )
}
