import { useContext, createElement } from "react"
import { useRouter } from "next/router"
import Cookies from "js-cookie"
import { AppContext } from "./context"

const TOKEN_KEY = "token"

export function setToken(token: string) {
    Cookies.set(TOKEN_KEY, token, {
        expires: 30
    })
}

export function removeToken() {
    Cookies.remove(TOKEN_KEY)
}

export function requireAuth(Component: React.ComponentType) {
    return (props: any) => {
        const context = useContext(AppContext)
        const router = useRouter()
        if (!context.user) {
            router.push("/login")
            return
        }
        return createElement(Component, props)
    }
}
