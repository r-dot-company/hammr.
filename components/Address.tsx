import { useContext } from "react"
import styled from "styled-components"
import { API } from "api/types"
import { AppContext } from "lib/context"
import Box from "./styled/Box"

const Container = styled(Box)`
    margin-bottom: 32px;

    & > div {
        font-weight: 800;
    }
`

export default function Address({ address }: {
    address: API.Address
}) {
    const context = useContext(AppContext)

    return (
        <Container>
            <div>{ context.user?.fullname }</div>
            <div>{ address.street }</div>
            <div>{ address.zip }</div>
            <div>{ address.city }</div>
            <div>{ address.country }</div>
        </Container>
    )
}
