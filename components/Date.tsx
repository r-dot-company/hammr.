import { format } from "date-fns"

export default function DateFormatter({ children, format: dateFormat = "dd.MM.yyyy HH:mm" }: React.PropsWithChildren<{
    format?: string
}>) {
    if (!(typeof children === "string")) {
        throw new Error("Expected a string as a child")
    }
    const formatted = format(new Date(children), dateFormat)
    return <>{ formatted }</>
}
