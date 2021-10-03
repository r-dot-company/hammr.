import { useContext } from "react"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import styled from "styled-components"
import { AppContext } from "lib/context"
import { requireAuth } from "lib/auth"
import { makeTitle } from "lib/utils"
import CartProduct from "components/CartProduct"
import ContainerBase from "components/styled/Container"
import Button from "components/styled/Button"

const Container = styled(ContainerBase)`
    text-align: left;
`

const CartPage: NextPage = () => {
    const router = useRouter()
    
    const context = useContext(AppContext)

    const goToCheckout = () => {
        router.push("/checkout")
    }
    
    const head = (
        <Head>
            <title>{ makeTitle("Cart") }</title>
        </Head>
    )

    if (context.cart?.length === 0) {
        return (
            <>
                { head }
                <h1>Your cart is empty</h1>
            </>
        )
    }
    
    return (
        <Container>
            { head }
            { context.cart?.map((product) => (
                <CartProduct product={product} key={product.product.id}/>
            )) }
            <Button onClick={goToCheckout}>Checkout</Button>
        </Container>
    )
}

export default CartPage

export const getServerSideProps = requireAuth(async () => ({ props: {} }))
