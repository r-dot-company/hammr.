import { useState, useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { NextPage } from "next"
import { useRouter } from "next/router"
import styled from "styled-components"
import { shopr } from "api"
import { setToken } from "lib/auth"
import { AppContext } from "lib/context"
import Button from "components/styled/Button"
import Input from "components/styled/Input"
import Container from "components/styled/Container"

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

type Fields = {
    email: string,
    password: string
}

const LoginPage: NextPage = () => {
    const router = useRouter()

    const context = useContext(AppContext)
    
    const [error, setError] = useState<string>()

    const { register, handleSubmit, getValues } = useForm<Fields>()

    useEffect(() => {
        if (context.user) {
            router.push("/")
        }
    }, [context.user])
    
    const onSubmit = async () => {
        const { email, password } = getValues()
        try {
            const res = await shopr.login({ email, password })
            setToken(res.access_token)
            context.setUser(res.user)
        } catch (error) {
            console.error(error)
            setError("Login failed")
        }
    }

    return (
        <Container size="sm">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>
                <Input {...register("email")} type="email" placeholder="E-Mail"/>
                <Input {...register("password")} type="password" placeholder="Password"/>
                { error && <span>{error}</span> }
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default LoginPage
