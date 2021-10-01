import ShoprAPI from "api/Shopr"
import { API } from "api/types"
import { createContext } from "react"

export type AppContextAttributes = {
    user: API.User | null,
    cart: API.CartProduct[] | null
}

export type AppContextMethods = {
    setUser: (user: API.User) => void,
    setCart: (cart: API.CartProduct[]) => void,
    fetchCart: () => Promise<void>
}

export type AppContextType = AppContextAttributes & AppContextMethods

export const appContextDefaultValue: AppContextType = {
    user: null,
    setUser: () => {},
    cart: null,
    setCart: () => {},
    fetchCart: async () => {}
}

export const AppContext = createContext(appContextDefaultValue)

export async function fetchContext(shopr: ShoprAPI) {
    const context: AppContextAttributes = {
        user: await shopr.catch(shopr.getProfile()),
        cart: null
    }

    if (context.user) {
        context.cart = await shopr.catch(shopr.getCart())
    }

    return context
}
