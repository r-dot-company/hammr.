import { useContext, useState } from "react"
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
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
    const context = useContext(AppContext)

    const [address, setAddress] = useState(props.address)

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

            <Button>Order Now</Button>
        </Container>
    )
}

export default CheckoutPage

export const getServerSideProps: GetServerSideProps<
    Props
> = async (context: GetServerSidePropsContext) => {
    const shopr = createShoprClient(context.req.headers.cookie || "")
    const addresses = await shopr.catch(shopr.getAddress())

    return {
        props: {
            address: addresses?.[0] || null
        }
    }
}
