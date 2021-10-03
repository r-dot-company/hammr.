import styled from "styled-components"

const Container = styled.div`
    margin-bottom: 20px;
`

const ErrorMessage = styled.div`
    margin-bottom: 8px;

    &:last-child {
        margin-bottom: 0;
    }
`

function FormErrorMessage({ error }: {
    error: any
}) {
    if (typeof error === "string") {
        return <ErrorMessage>{ error }</ErrorMessage>
    }

    if (typeof error === "object" && "message" in error) {
        if (typeof error.message === "string") {
            return <ErrorMessage>{ error.message }</ErrorMessage>
        }
        if (Array.isArray(error.message)) {
            return error.message.map((message: string, i: number) => (
                <ErrorMessage key={i}>{ message }</ErrorMessage>
            ))
        }
    }

    return <ErrorMessage>Error</ErrorMessage>
}

export default function FormError({ error }: {
    error: any
}) {
    if (!error) {
        return null
    }

    return (
        <Container>
            <FormErrorMessage error={error}/>
        </Container>
    )
}
