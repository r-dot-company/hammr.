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
    margin-top: 30px;
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

const HeaderItem = styled(NavItem)`
    margin-left: 0;
    margin-right: 32px;

    &:last-child {
        margin-right: 0;
    }
`

const CartLink = styled.a`
    display: flex;
    align-items: center;
`

const CartSize = styled.span`
    font-size: 18px;
    padding-left: 8px;
`

const ContentContainer = styled.main`
    border-left: 1px solid #fff;
    border-top: 1px solid #fff;
    flex: 1;
    text-align: center;
    padding-top: ${props => props.theme.contentPaddingTop};
`

export default function Layout({ children }: React.PropsWithChildren<{}>) {
    const context = useContext(AppContext)
    
    return (
        <>
            <Header>
                { context.user && (
                    <>
                        <HeaderItem>
                            <Link href="/profile">{ context.user.fullname }</Link>
                        </HeaderItem>
                        <HeaderItem>
                            <Link href="/cart">
                                <CartLink>
                                    Cart <CartSize>({ context.cart?.length })</CartSize>
                                </CartLink>
                            </Link>
                        </HeaderItem>
                        <HeaderItem>
                            <Link href="/orders">Orders</Link>
                        </HeaderItem>
                    </>
                ) }
            </Header>
            <Container>
                <Nav>
                    <NavRotationContainer>
                        <NavItem><Link href="/">Hammr.</Link></NavItem>
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
