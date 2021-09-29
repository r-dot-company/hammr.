import { shopr } from "api"
import Button from "components/styled/Button"
import { FormEventHandler } from "hoist-non-react-statics/node_modules/@types/react"
import { useState } from "react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()
        const res = await shopr.login({ email, password })
        if ("statusCode" in res && res.statusCode !== 200) {
            return
        }
        console.log({ res })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="E-Mail"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />
            <Button type="submit">Submit</Button>
        </form>
    )
}
