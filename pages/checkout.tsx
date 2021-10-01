import { useContext, useEffect } from "react"
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import { useRouter } from "next/router"
import styled from "styled-components"
import ContainerBase from "components/styled/Container"
import { AppContext } from "lib/context"
import { createShoprClient } from "api"
import { API } from "api/types"
import CartProduct from "components/CartProduct"
import Address from "components/Address"
import CartTotal from "components/CartTotal"
import Button from "components/styled/Button"

const Container = styled(ContainerBase)`
    text-align: left;
`

type Props = {
    address: API.Address | null
}

const CheckoutPage: NextPage<Props> = (props: Props) => {
    const router = useRouter()
    
    const context = useContext(AppContext)

    useEffect(() => {
        if (!props.address) {
            router.push("/")
        }
    }, [props.address])

    return (
        <Container>
            <h2>Cart</h2>
            { context.cart?.map((product) => (
                <CartProduct product={product} dense key={product.product.id}/>
            )) }
            <h3>Total: <CartTotal/> €</h3>

            <h2>Shipping Address</h2>
            { props.address && <Address address={props.address}/>}

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
    const address = addresses?.[0]

    if (!address) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return { props: { address } }
}
