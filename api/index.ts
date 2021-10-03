import cookie from "cookie"
import config from "lib/config"
import ShoprAPI from "./Shopr"

export function createShoprClient(cookies: string) {
    const parsed = cookie.parse(cookies)
    const token = parsed.token || ""
    return new ShoprAPI({
        url: config.api.url,
        token
    })
}

export const shopr = createShoprClient("")
