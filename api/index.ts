import cookie from "cookie"
import ShoprAPI from "./Shopr"

const url =  "http://localhost:8080"

export function createShoprClient(cookies: string) {
    const parsed = cookie.parse(cookies)
    const token = parsed.token || ""
    return new ShoprAPI({ url, token })
}

export const shopr = createShoprClient("")
