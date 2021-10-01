import { useContext } from "react"
import { NextPage } from "next"
import { AppContext } from "lib/context"
import { requireAuth } from "lib/auth"
import CartProduct from "components/CartProduct"
import Container from "components/styled/Container"

const CartPage: NextPage = () => {
    const context = useContext(AppContext)

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
        </Container>
    )
}

export default requireAuth(CartPage)
