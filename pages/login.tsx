import { useState, useContext, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { NextPage } from "next"
import { useRouter } from "next/router"
import Link from "next/link"
import styled from "styled-components"
import { shopr } from "api"
import { setToken } from "lib/auth"
import { AppContext } from "lib/context"
import Button from "components/styled/Button"
import Input from "components/styled/Input"
import Container from "components/styled/Container"
import Form from "components/styled/Form"

const RegisterLink = styled.div`
    margin-top: 24px;
`

type Fields = {
    email: string,
    password: string
}

const LoginPage: NextPage = () => {
    const router = useRouter()

    const context = useContext(AppContext)
    
    const [error, setError] = useState<string>()

    const { register, handleSubmit } = useForm<Fields>()

    useEffect(() => {
        if (context.user) {
            router.push("/")
        }
    }, [context.user])
    
    const onSubmit: SubmitHandler<Fields> = async (fields) => {
        try {
            const res = await shopr.login(fields)
            setToken(res.access_token)
            context.setUser(res.user)
        } catch (error) {
            console.error(error)
            setError("Login failed")
        }
    }

    return (
        <Container size="sm">
            <h1>Login</h1>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register("email")} type="email" placeholder="E-Mail"/>
                <Input {...register("password")} type="password" placeholder="Password"/>
                <Button type="submit">Submit</Button>
                { error && <span>{error}</span> }
            </Form>

            <RegisterLink>
                <Link href="/register">I don't have an account</Link>
            </RegisterLink>
        </Container>
    )
}

export default LoginPage
