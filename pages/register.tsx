import { useState, useContext, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { NextPage } from "next"
import { useRouter } from "next/router"
import Link from "next/link"
import styled from "styled-components"
import { shopr } from "api"
import { API } from "api/types"
import { setToken } from "lib/auth"
import { AppContext } from "lib/context"
import Button from "components/styled/Button"
import Input from "components/styled/Input"
import Container from "components/styled/Container"
import Form from "components/styled/Form"
import FormError from "components/FormError"

const RegisterLink = styled.div`
    margin-top: 24px;
`

type Fields = API.CreateUser & {
    password_confirmation: string
}

const RegisterPage: NextPage = () => {
    const router = useRouter()

    const context = useContext(AppContext)
    
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<any>()

    const { register, handleSubmit } = useForm<Fields>()

    useEffect(() => {
        if (context.user) {
            router.push("/")
        }
    }, [context.user])
    
    const onSubmit: SubmitHandler<Fields> = async ({
        password_confirmation,
        ...fields
    }) => {
        if (fields.password !== password_confirmation) {
            setError("Passwords don't match")
            return
        }
        setIsLoading(true)
        try {
            await shopr.createUser(fields)
            const res = await shopr.login({
                email: fields.email,
                password: fields.password
            })
            setError(null)
            setToken(res.access_token)
            context.setUser(res.user)
        } catch (error) {
            console.error(error)
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Container size="sm">
            <h1>Register</h1>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormError error={error}/>
                <Input {...register("firstname")} type="text" placeholder="First name"/>
                <Input {...register("lastname")} type="text" placeholder="Last name"/>
                <Input {...register("email")} type="email" placeholder="E-Mail"/>
                <Input {...register("password")} type="password" placeholder="Password"/>
                <Input {...register("password_confirmation")} type="password" placeholder="Confirm Password"/>
                <Button type="submit" isLoading={isLoading}>Submit</Button>
            </Form>

            <RegisterLink>
                <Link href="/login">I already have an account</Link>
            </RegisterLink>
        </Container>
    )
}

export default RegisterPage
