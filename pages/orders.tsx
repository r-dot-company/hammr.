import { createShoprClient } from "api"
import { API } from "api/types"
import Order from "components/Order"
import Container from "components/styled/Container"
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"

type Props = {
    orders: API.Order[] | null
}

const OrdersPage: NextPage<Props> = ({ orders }: Props) => {
    if (orders?.length === 0) {
        return (
            <Container>
                <h1>You don't have any orders</h1>
            </Container>
        )
    }

    return (
        <Container>
            { orders?.map((order) => <Order order={order} key={order.id}/>)}
        </Container>
    )
}

export default OrdersPage

export const getServerSideProps: GetServerSideProps<Props> = async (
    context: GetServerSidePropsContext
) => {
    const shopr = createShoprClient(context.req.headers.cookie || "")
    const orders = await shopr.catch(shopr.getOrders())

    return { props: { orders } }
}
