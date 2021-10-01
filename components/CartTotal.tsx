import { AppContext } from "lib/context"
import { useContext } from "react"

export default function CartTotal() {
    const context = useContext(AppContext)
    const total = context.cart?.reduce(
        (total, product) => total + product.product.price,
        0
    )
    return <>{ total }</>
}
