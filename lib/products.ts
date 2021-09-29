import { API } from "api/types"
import { ColorRepresentation } from "three"

type ProductMeta = {
    modelColor: ColorRepresentation
}

const products: Record<number, ProductMeta> = {
    1: {
        modelColor: 0xeeeeee
    },
    2: {
        modelColor: 0x0f0f0f
    }
}

export function getProductMeta(product: API.Product) {
    return products[product.id]
}

export function findProductModel(product: API.Product) {
    return product.assets.find((asset) => asset.type.key === "model")
}

export function findProductPreviewImage(product: API.Product) {
    return product.assets.find((asset) => asset.type.key === "image")
}
