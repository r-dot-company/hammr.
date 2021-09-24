import Image from "next/image"
import LogoWhite from "public/assets/logo-white.svg"
import styled from "styled-components"

const StyledNav = styled.nav`
    margin: 32px 0;
`

export default function Header() {
    return (
        <StyledNav>
            <Image
                src={LogoWhite}
                width={64}
                height={64}
            />
        </StyledNav>
    )
}
