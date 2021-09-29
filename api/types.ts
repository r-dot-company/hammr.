export namespace API {
    export type User = {
        id: string,
        email: string,
        firstname: string,
        lastname: string,
        fullname: string,
        admin: boolean
    }

    export type CreateUser = {
        email: string,
        password: string
    }

    export type UpdateUser = {
        email: string
    }

    export type Admin = {
        id: string,
        user: User,
        protected: boolean,
        createdAt: string,
        updateAt: string
    }

    export type Address = {
        id: string,
        country: string,
        city: string,
        street: string,
        zip: string
    }

    export type CreateAddress = Omit<Address, "id">

    export type UpdateAddress = Partial<CreateAddress>

    export type AssetType = {
        key: string,
        mimeType: string
    }

    export type Asset = {
        id: string,
        filename: string,
        type: AssetType,
        typeKey: string,
        product: Product
    }

    export type Category = {
        id: number,
        key: string,
        name: string,
        children: Category[],
        parents: Category[]
    }

    export type Order = {
        id: string,
        status: OrderStatus,
        total: number,
        user: User,
        prooducts: CartProduct[],
        createdAt: string,
        updatedAt: string
    }

    export type Product = {
        id: number,
        name: string,
        price: number,
        access: Access,
        assets: Asset[],
        categories: Category[],
        createdAt: string,
        updatedAt: string
    }

    export type CartProduct = {
        amount: number,
        product: Product
    }

    export type AddCartProduct = {
        amount: number,
        productId: number
    }

    export type UpdateCartProduct = {
        amount: number
    }

    export type Auth = {
        access_token: string,
        user: User
    }

    export type Login = {
        email: string,
        password: string
    }

    export type Error = {
        message: string,
        statusCode: number
    }

    export enum Access {
        PUBLIC = "PUBLIC",
        PRIVATE = "PRIVATE"
    }

    export enum OrderStatus {
        RECEIVED = "RECEIVED",
        PROCESSING = "PROCESSING",
        DELIVERY = "DELIVERY",
        DONE = "DONE"
    }
}
