import styled from "styled-components"

type Props = {
    size?: "lg" | "md" | "sm"
}

const sizes = {
    "lg": 1200,
    "md": 800,
    "sm": 500
}

const Container = styled.div<Props>`
    max-width: ${props => sizes[props.size!]}px;
    margin: auto;
`

Container.defaultProps = {
    size: "md"
}

export default Container
