import styled from "styled-components"

type Props = {
    disabled?: boolean,
    dense?: boolean
}

const Button = styled.button<Props>`
    border: 1px solid #fff;
    color: #fff;
    background: #000;
    padding: ${props => props.dense ? "12px 24px" : "16px 32px"};
    cursor: ${props => props.disabled ? "initial" : "pointer"};
`

Button.defaultProps = {
    disabled: false,
    dense: false
}

export default Button
