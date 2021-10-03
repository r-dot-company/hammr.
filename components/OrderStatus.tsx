import { API } from "api/types"

const mapping: Record<API.OrderStatus, string> = {
    [API.OrderStatus.RECEIVED]: "Received",
    [API.OrderStatus.PROCESSING]: "Processing",
    [API.OrderStatus.DELIVERY]: "Delivery",
    [API.OrderStatus.DONE]: "Done",
}

export default function OrderStatus({ status }: {
    status: API.OrderStatus
}) {
    return <>{ mapping[status] }</>
}
