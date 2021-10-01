import Cookies from "js-cookie"

const TOKEN_KEY = "token"

export function setToken(token: string) {
    Cookies.set(TOKEN_KEY, token, {
        expires: 30
    })
}

export function removeToken() {
    Cookies.remove(TOKEN_KEY)
}
