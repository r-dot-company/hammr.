import { useState } from "react"
import { useForm } from "react-hook-form"
import { shopr } from "api"
import { setToken } from "lib/auth"
import Button from "components/styled/Button"
import Input from "components/styled/Input"
import styled from "styled-components"

const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: 64px auto 0;
`

type Fields = {
    email: string,
    password: string
}

export default function LoginPage() {
    const [error, setError] = useState<string>()
    const { register, handleSubmit, getValues } = useForm<Fields>()
    
    const onSubmit = async () => {
        const { email, password } = getValues()
        try {
            const res = await shopr.login({ email, password })
            setToken(res.access_token)
        } catch (error) {
            console.error(error)
            setError("Login failed")
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
            <Input {...register("email")} type="email" placeholder="E-Mail"/>
            <Input {...register("password")} type="password" placeholder="Password"/>
            { error && <span>{error}</span> }
            <Button type="submit">Submit</Button>
        </Form>
    )
}
