import { useContext, useState } from "react"
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import { useRouter } from "next/router"
import styled from "styled-components"
import { AppContext } from "lib/context"
import { createShoprClient } from "api"
import { API } from "api/types"
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

    const [address, setAddress] = useState(props.address)

    const handleOrderSubmit = async () => {
        const shopr = createShoprClient(document.cookie)
        try {
            await shopr.submitOrder()
            await context.fetchCart()
            router.push("/orders")
        } catch (error) {
            console.error(error)
        }
    }

    if (!address) {
        return (
            <Container size="sm">
                <AddressForm onSubmit={(newAddress) => setAddress(newAddress)}/>
            </Container>
        )
    }

    return (
        <Container>
            <h2>Cart</h2>
            { context.cart?.map((product) => (
                <CartProduct product={product} dense key={product.product.id}/>
            )) }
            <h3>Total: <CartTotal/> €</h3>

            <h2>Shipping Address</h2>
            { address && <Address address={address}/>}

            <Button onClick={handleOrderSubmit}>Order Now</Button>
        </Container>
    )
}

export default CheckoutPage

export const getServerSideProps: GetServerSideProps<Props> = async (
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
}
