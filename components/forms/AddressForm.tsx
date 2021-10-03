import { SubmitHandler, useForm } from "react-hook-form"
import { createShoprClient } from "api"
import { API } from "api/types"
import Form from "components/styled/Form"
import Input from "components/styled/Input"
import Button from "components/styled/Button"

type Fields = Omit<API.Address, "id">

export default function AddressForm({ address, ...props }: {
    address?: API.Address,
    onSubmit?: (address: API.Address) => void
}) {
    const { register, handleSubmit } = useForm<Fields>({
        defaultValues: address || {}
    })

    const onSubmit: SubmitHandler<Fields> = async (fields) => {
        const shopr = createShoprClient(document.cookie)
        try {
            const res = await shopr.createAddress(fields)
            props.onSubmit?.(res)
        } catch(error) {
            console.error(error)
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("street")} type="text" placeholder="Street"/>
            <Input {...register("zip")} type="text" placeholder="ZIP"/>
            <Input {...register("city")} type="text" placeholder="City"/>
            <Input {...register("country")} type="text" placeholder="Country"/>
            <Button type="submit">Save</Button>
        </Form>
    )
}
