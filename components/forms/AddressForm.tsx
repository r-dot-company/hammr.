import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { createShoprClient } from "api"
import { API } from "api/types"
import Form from "components/styled/Form"
import Input from "components/styled/Input"
import Button from "components/styled/Button"

type Fields = Omit<API.Address, "id">

export default function AddressForm({ address, ...props }: {
    address?: API.Address | null,
    onSubmit?: (address: API.Address) => void
}) {
    const { register, handleSubmit } = useForm<Fields>({
        defaultValues: address || {}
    })

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit: SubmitHandler<Fields> = async (fields) => {
        const shopr = createShoprClient(document.cookie)
        setIsLoading(true)
        try {
            const res = address
                ? await shopr.updateAddress(address.id, fields)
                : await shopr.createAddress(fields)
            props.onSubmit?.(res)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("street")} type="text" placeholder="Street"/>
            <Input {...register("zip")} type="text" placeholder="ZIP"/>
            <Input {...register("city")} type="text" placeholder="City"/>
            <Input {...register("country")} type="text" placeholder="Country"/>
            <Button type="submit" isLoading={isLoading}>Save</Button>
        </Form>
    )
}
