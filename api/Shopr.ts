import { API } from "./types"

export default class ShoprAPI {
    private url: string
    
    constructor({ url }: { url: string }) {
        this.url = url
    }

    private makeURL(path: string) {
        return `${this.url}/api/v1/${path}`
    }

    private async fetchJSON<T>(path: string) {
        const res = await fetch(this.makeURL(path))
        const json = await res.json()
        return json as T
    }

    fetchProducts() {
        return this.fetchJSON<API.Product[]>("product")
    }

    getAssetURL(asset: API.Asset) {
        return this.makeURL(`storage/${asset.filename}`)
    }
}
