import { useContext, useState } from "react"
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import { createShoprClient } from "api"
import { API } from "api/types"
import { AppContext } from "lib/context"
import AddressForm from "components/forms/AddressForm"
import Container from "components/styled/Container"
import { requireAuth } from "lib/auth"

type Props = {
    address: API.Address | null
}

const ProfilePage: NextPage<Props> = (props: Props) => {
    const context = useContext(AppContext)
    
    const [address, setAddress] = useState(props.address)

    return (
        <Container size="sm">
            <h1>{ context.user?.fullname }</h1>
            <AddressForm
                address={address}
                onSubmit={(newAddress) => setAddress(newAddress)}
            />
        </Container>
    )
}

export default ProfilePage

export const getServerSideProps: GetServerSideProps<Props> = requireAuth<Props>(async (
    context: GetServerSidePropsContext
) => {
    const shopr = createShoprClient(context.req.headers.cookie || "")
    const addresses = await shopr.catch(shopr.getAddress())

    return {
        props: {
            address: addresses?.[0] || null
        }
    }
})
