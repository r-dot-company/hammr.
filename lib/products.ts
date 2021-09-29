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
