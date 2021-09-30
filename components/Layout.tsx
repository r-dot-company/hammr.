import styled from "styled-components"
import Link from "next/link"
import StyledLink from "./styled/Link"

const Container = styled.div`
    display: flex;
    min-height: 100vh;
`

const Nav = styled.nav`
    width: ${props => props.theme.contentMargin};
    margin-top: ${props => props.theme.contentMargin};
`

const NavItem = styled(StyledLink)`
    display: block;
    font-size: 20px;
`

const ContentContainer = styled.main`
    border-left: 1px solid #fff;
    border-top: 1px solid #fff;
    margin-top: ${props => props.theme.contentMargin};
    flex: 1;
    text-align: center;
`

export default function Layout({ children }: React.PropsWithChildren<{}>) {
    return (
        <Container>
            <Nav>
                <NavItem><Link href="/">Home</Link></NavItem>
                <NavItem><Link href="/login">Login</Link></NavItem>
            </Nav>
            <ContentContainer>
                { children }
            </ContentContainer>
        </Container>
    )
}
