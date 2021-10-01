import { useContext } from "react"
import styled from "styled-components"
import Link from "next/link"
import { AppContext } from "lib/context"
import StyledLink from "./styled/Link"

const Container = styled.div`
    display: flex;
    min-height: 100vh;
`

const Header = styled.header`
    height: ${props => props.theme.contentMargin};
    margin-left: ${props => props.theme.contentMargin};
    display: flex;
    align-items: center;
`

const Nav = styled.nav`
    width: ${props => props.theme.contentMargin};
`

const NavRotationContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    transform: rotate(-90deg);
    margin-top: 32px;
    margin-left: -12px;
`

const NavItem = styled(StyledLink)`
    display: block;
    font-size: 24px;
    margin-left: 32px;

    &:last-child {
        margin-left: 0;
    }
`

const ContentContainer = styled.main`
    border-left: 1px solid #fff;
    border-top: 1px solid #fff;
    flex: 1;
    text-align: center;
`

export default function Layout({ children }: React.PropsWithChildren<{}>) {
    const context = useContext(AppContext)
    
    return (
        <>
            <Header>
                { context.user && (
                    <NavItem><Link href="/profile">{ context.user.fullname }</Link></NavItem>
                ) }
            </Header>
            <Container>
                <Nav>
                    <NavRotationContainer>
                        <NavItem><Link href="/">Home</Link></NavItem>
                        { !context.user
                            ? <NavItem><Link href="/login">Login</Link></NavItem>
                            : <NavItem><Link href="/logout">Logout</Link></NavItem>
                        }
                    </NavRotationContainer>
                </Nav>
                <ContentContainer>
                    { children }
                </ContentContainer>
            </Container>
        </>
    )
}
