import styled from "styled-components"

type Props = {
    disabled?: boolean
}

export default styled.button<Props>`
    border: 1px solid #fff;
    color: ${props => props.disabled ? "#fff" : "#000"};
    background: ${props => props.disabled ? "#000" : "#fff"};
    padding: 16px 32px;
    cursor: ${props => props.disabled ? "initial" : "pointer"};
`
