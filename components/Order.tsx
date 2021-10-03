import styled from "styled-components"
import { API } from "api/types"
import Box from "./styled/Box"
import OrderStatus from "./OrderStatus"
import Date from "./Date"

const Container = styled(Box)`
    margin-bottom: 32px;

    & > div {
        margin-bottom: 16px;

        &:last-child {
            margin-bottom: 0;
        }
    }
`

const ProductsTable = styled.div`
    & > div {
        display: flex;

        & div {
            width: 150px;
        }
    }
`

export default function Order({ order }: {
    order: API.Order
}) {
    return (
        <Container>
            <ProductsTable>
                <div>
                    <div><strong>Product</strong></div>
                    <div><strong>Price</strong></div>
                    <div><strong>Amount</strong></div>
                </div>
                { order.products.map((product) => (
                    <div key={product.product.id}>
                        <div>{ product.product.name }</div>
                        <div>{ product.product.price } €</div>
                        <div>{ product.amount }</div>
                    </div>
                )) }
            </ProductsTable>
            <div><strong>Total: </strong>{ order.total } €</div>
            <div><strong>Submitted: </strong><Date>{ order.createdAt }</Date></div>
            <div><strong>Status: </strong><OrderStatus status={order.status}/></div>
        </Container>
    )
}
