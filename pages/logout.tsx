import { useContext } from "react"
import { NextPage } from "next"
import { AppContext } from "lib/context"
import { removeToken } from "lib/auth"

const LogoutPage: NextPage = () => {
    const context = useContext(AppContext)
    if (context.user) {
        removeToken()
    }
    window.location.href = "/"
    return null
}

export default LogoutPage
