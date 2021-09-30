import { useState } from "react"
import { useForm } from "react-hook-form"
import { shopr } from "api"
import Button from "components/styled/Button"
import { setToken } from "lib/auth"

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email")} type="email" placeholder="E-Mail"/>
            <input {...register("password")} type="password" placeholder="Password"/>
            { error && <span>{error}</span> }
            <Button type="submit">Submit</Button>
        </form>
    )
}
