import styled from "styled-components"

type Props = {
    disabled?: boolean
}

export default styled.button<Props>`
    border: 1px solid #fff;
    color: #fff;
    background: #000;
    padding: 16px 32px;
    cursor: ${props => props.disabled ? "initial" : "pointer"};
`
