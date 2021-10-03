import styled from "styled-components"
import LoadingIndicator from "./LoadingIndicator"

type Props = {
    disabled?: boolean,
    dense?: boolean,
    isLoading?: boolean
}

const ButtonBase = styled.button<Props>`
    border: 1px solid #fff;
    color: #fff;
    background: #000;
    padding: ${props => props.dense ? "12px 24px" : "16px 32px"};
    cursor: ${props => props.disabled ? "initial" : "pointer"};
`

ButtonBase.defaultProps = {
    disabled: false,
    dense: false,
    isLoading: false
}

export default function Button(
    props: React.ComponentProps<typeof ButtonBase> & React.PropsWithChildren<Props>
) {
    return (
        <ButtonBase {...props}>
            { props.isLoading ? <LoadingIndicator/> : props.children }
        </ButtonBase>
    )
}
