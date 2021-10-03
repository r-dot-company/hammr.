import { useContext } from "react"
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import { createShoprClient } from "api"
import { API } from "api/types"
import { AppContext } from "lib/context"
import AddressForm from "components/forms/AddressForm"
import Container from "components/styled/Container"

type Props = {
    address: API.Address | null
}

const ProfilePage: NextPage<Props> = ({ address }: Props) => {
    const context = useContext(AppContext)

    return (
        <Container size="sm">
            <h1>{ context.user?.fullname }</h1>
            <AddressForm address={address}/>
        </Container>
    )
}

export default ProfilePage

export const getServerSideProps: GetServerSideProps<Props> = async (
    context: GetServerSidePropsContext
) => {
    const shopr = createShoprClient(context.req.headers.cookie || "")
    const addresses = await shopr.catch(shopr.getAddress())

    return {
        props: {
            address: addresses?.[0] || null
        }
    }
}
