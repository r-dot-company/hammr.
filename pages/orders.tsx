import { createShoprClient } from "api"
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import Head from "next/head"
import { API } from "api/types"
import { requireAuth } from "lib/auth"
import { makeTitle } from "lib/utils"
import Order from "components/Order"
import Container from "components/styled/Container"

type Props = {
    orders: API.Order[] | null
}

const OrdersPage: NextPage<Props> = ({ orders }: Props) => {
    const head = (
        <Head>
            <title>{ makeTitle("Orders") }</title>
        </Head>
    )

    if (orders?.length === 0) {
        return (
            <Container>
                { head }
                <h1>You don't have any orders</h1>
            </Container>
        )
    }

    return (
        <Container>
            { head }
            { orders?.map((order) => <Order order={order} key={order.id}/>)}
        </Container>
    )
}

export default OrdersPage

export const getServerSideProps: GetServerSideProps<Props> = requireAuth<Props>(async (
    context: GetServerSidePropsContext
) => {
    const shopr = createShoprClient(context.req.headers.cookie || "")
    const orders = await shopr.catch(shopr.getOrders())

    return { props: { orders } }
})
