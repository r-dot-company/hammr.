import { useContext } from "react"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { AppContext } from "lib/context"
import { requireAuth } from "lib/auth"
import CartProduct from "components/CartProduct"
import ContainerBase from "components/styled/Container"
import Button from "components/styled/Button"
import styled from "styled-components"

const Container = styled(ContainerBase)`
    text-align: right;
`

const CartPage: NextPage = () => {
    const router = useRouter()
    
    const context = useContext(AppContext)

    const goToCheckout = () => {
        router.push("/checkout")
    }

    if (context.cart?.length === 0) {
        return (
            <h1>Your cart is empty</h1>
        )
    }
    
    return (
        <Container>
            { context.cart?.map((product) => (
                <CartProduct product={product} key={product.product.id}/>
            )) }
            <Button onClick={goToCheckout}>Checkout</Button>
        </Container>
    )
}

export default requireAuth(CartPage)
