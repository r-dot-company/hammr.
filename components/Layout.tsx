import styled from "styled-components"

const Container = styled.div`
    text-align: center;
`

export default function Layout({ children }: React.PropsWithChildren<{}>) {
    return (
        <Container>
            { children }
        </Container>
    )
}
