import styled from "styled-components"

type Props = {
    disabled?: boolean
}

export default styled.button<Props>`
    color: #fff;
    border: 1px solid #fff;
    background: ${props => props.disabled ? "#000" : "#fff"};
    padding: 16px 32px;
`
