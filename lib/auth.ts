import { GetServerSideProps, GetServerSidePropsContext } from "next"
import Cookies from "js-cookie"
import { createShoprClient } from "api"

const TOKEN_KEY = "token"

export function setToken(token: string) {
    Cookies.set(TOKEN_KEY, token, {
        expires: 30
    })
}

export function removeToken() {
    Cookies.remove(TOKEN_KEY)
}

export function requireAuth<Props>(
    getServerSideProps: GetServerSideProps<Props>,
    options: { invert?: boolean } = {}
) {
    options = {
        invert: false,
        ...options
    }

    const verifyUser = (user: any) => {
        return options.invert ? !user : user
    }

    const newGetServerSideProps: GetServerSideProps<Props> = async (
        context: GetServerSidePropsContext
    ) => {
        const shopr = createShoprClient(context.req.headers.cookie || "")
        const user = await shopr.catch(shopr.getProfile())
        if (!verifyUser(user)) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }
        return await getServerSideProps(context)
    }

    return newGetServerSideProps
}
