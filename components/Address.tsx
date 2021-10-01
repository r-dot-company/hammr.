import styled from "styled-components"
import { API } from "api/types"

const Container = styled.div`
    margin-bottom: 32px;
    border: 1px solid #fff;
    padding: 12px;
    text-align: left;

    & > div {
        font-weight: 800;
    }
`

export default function Address({ address }: {
    address: API.Address
}) {
    return (
        <Container>
            <div>{ address.street }</div>
            <div>{ address.zip }</div>
            <div>{ address.city }</div>
            <div>{ address.country }</div>
        </Container>
    )
}
