import { API } from "./types"

export default class ShoprAPI {
    private url: string
    private token?: string
    
    constructor({ url, token }: {
        url: string,
        token?: string
    }) {
        this.url = url
        this.token = token
    }

    private makeURL(path: string) {
        return `${this.url}/api/v1/${path}`
    }

    private async fetchJSON<T>(path: string, options?: RequestInit) {
        const res = await fetch(this.makeURL(path), {
            ...options,
            headers: {
                ...options?.headers,
                "Content-Type": "application/json",
                "Authorization": this.token ? `Bearer ${this.token}` : ""
            }
        })
        if (res.status >= 400) {
            throw res
        }
        const json = await res.json()
        return json as T
    }

    private get<T>(path: string) {
        return this.fetchJSON<T>(path)
    }

    private post<T>(path: string, params?: any) {
        return this.fetchJSON<T>(path, {
            method: "POST",
            body: !params ? undefined : JSON.stringify(params)
        })
    }

    private put<T>(path: string, params?: any) {
        return this.fetchJSON<T>(path, {
            method: "PUT",
            body: !params ? undefined : JSON.stringify(params)
        })
    }

    private delete<T>(path: string) {
        return this.fetchJSON<T>(path, {
            method: "DELETE"
        })
    }

    getProducts() {
        return this.get<API.Product[]>("product")
    }

    getProduct(id: number) {
        return this.get<API.Product>(`product/${id}`)
    }

    getCategories() {
        return this.get<API.Category[]>("category")
    }

    getCategory(key: string) {
        return this.get<API.Category>(`category/${key}`)
    }

    login(params: API.Login) {
        return this.post<API.Auth>("auth/login", params)
    }

    getProfile() {
        return this.get<API.User>("auth/profile")
    }

    createUser(params: API.CreateUser) {
        return this.post<API.User>("user", params)
    }

    updateUser(params: { email: string }) {
        return this.put<API.User>("user", params)
    }

    deleteUser() {
        return this.delete<API.User>("user")
    }

    getAddress() {
        return this.get<API.Address[]>("address")
    }

    createAddress(params: API.CreateAddress) {
        return this.post<API.Address>("address", params)
    }

    updateAddress(id: string, params: API.UpdateAddress) {
        return this.put<API.Address>(`address/${id}`, params)
    }

    deleteAddress(id: string) {
        return this.delete<API.Address>(`address/${id}`)
    }

    getCart() {
        return this.get<API.CartProduct[]>("cart")
    }

    addCartProduct(params: API.AddCartProduct) {
        return this.post<{ count: number }>("cart", params)
    }

    updateCartProduct(id: number, params: API.UpdateCartProduct) {
        return this.put<API.CartProduct>(`cart/${id}`, params)
    }

    deleteCartProduct(id: number) {
        return this.delete<API.CartProduct>(`cart/${id}`)
    }

    getOrders() {
        return this.get<API.Order[]>("order")
    }

    getOrder(id: string) {
        return this.get<API.Order>(`order/${id}`)
    }

    submitOrder() {
        return this.post<API.Order>("order/submit")
    }

    getAssetURL(asset: API.Asset) {
        return this.makeURL(`storage/${asset.filename}`)
    }

    isError(object: any): object is API.Error {
        return "statusCode" in object && object.statusCode !== 200
    }

    async catch<T>(promise: Promise<T>) {
        try {
            return await promise
        } catch {
            return null
        }
    }
}
