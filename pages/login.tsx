import { useState, useContext, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import Link from "next/link"
import Head from "next/head"
import styled from "styled-components"
import { shopr } from "api"
import { requireAuth, setToken } from "lib/auth"
import { AppContext } from "lib/context"
import { makeTitle } from "lib/utils"
import Button from "components/styled/Button"
import Input from "components/styled/Input"
import Container from "components/styled/Container"
import Form from "components/styled/Form"
import FormError from "components/FormError"

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
    
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<any>()

    const { register, handleSubmit } = useForm<Fields>()
    
    const onSubmit: SubmitHandler<Fields> = async (fields) => {
        setIsLoading(true)
        try {
            const res = await shopr.login(fields)
            setError(null)
            setToken(res.access_token)
            context.setUser(res.user)
            await context.fetchCart()
        } catch (error) {
            console.error(error)
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (context.user) {
            router.push("/")
        }
    }, [context.user])

    return (
        <Container size="sm">
            <Head>
                <title>{ makeTitle("Login") }</title>
            </Head>

            <h1>Login</h1>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormError error={error}/>
                <Input {...register("email")} type="email" placeholder="E-Mail"/>
                <Input {...register("password")} type="password" placeholder="Password"/>
                <Button type="submit" isLoading={isLoading}>Submit</Button>
            </Form>

            <RegisterLink>
                <Link href="/register">I don't have an account</Link>
            </RegisterLink>
        </Container>
    )
}

export default LoginPage

export const getServerSideProps: GetServerSideProps = requireAuth(
    async () => ({ props: {} }),
    { invert: true }
)
