import { useContext, useState } from "react"
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import styled from "styled-components"
import { createShoprClient } from "api"
import { API } from "api/types"
import { AppContext } from "lib/context"
import { requireAuth } from "lib/auth"
import { makeTitle } from "lib/utils"
import ContainerBase from "components/styled/Container"
import CartProduct from "components/CartProduct"
import Address from "components/Address"
import CartTotal from "components/CartTotal"
import Button from "components/styled/Button"
import AddressForm from "components/forms/AddressForm"

const Container = styled(ContainerBase)`
    text-align: left;
`

type Props = {
    address: API.Address | null
}

const CheckoutPage: NextPage<Props> = (props: Props) => {
    const router = useRouter()

    const context = useContext(AppContext)

    const [isLoading, setIsLoading] = useState(false)
    const [address, setAddress] = useState(props.address)

    const handleOrderSubmit = async () => {
        const shopr = createShoprClient(document.cookie)
        setIsLoading(true)
        try {
            await shopr.submitOrder()
            await context.fetchCart()
            router.push("/orders")
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const head = (
        <Head>
            <title>{ makeTitle("Checkout") }</title>
        </Head>
    )

    if (!address) {
        return (
            <Container size="sm">
                { head }
                <AddressForm onSubmit={(newAddress) => setAddress(newAddress)}/>
            </Container>
        )
    }

    return (
        <Container>
            { head }

            <h2>Cart</h2>
            { context.cart?.map((product) => (
                <CartProduct product={product} dense key={product.product.id}/>
            )) }

            <h3>Total: <CartTotal/> €</h3>

            <h2>Shipping Address</h2>
            { address && <Address address={address}/>}

            <Button onClick={handleOrderSubmit} isLoading={isLoading}>Order Now</Button>
        </Container>
    )
}

export default CheckoutPage

export const getServerSideProps: GetServerSideProps<Props> = requireAuth<Props>(async (
    context: GetServerSidePropsContext
) => {
    const shopr = createShoprClient(context.req.headers.cookie || "")
    const cart = await shopr.catch(shopr.getCart())
    const addresses = await shopr.catch(shopr.getAddress())

    if (cart?.length === 0) {
        return {
            redirect: {
                destination: "/cart",
                permanent: false
            }
        }
    }

    return {
        props: {
            address: addresses?.[0] || null
        }
    }
})
