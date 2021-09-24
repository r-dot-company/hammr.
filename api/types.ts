export namespace API {
    export type User = {
        id: string,
        email: string,
        firstname: string,
        lastname: string,
        fullname: string,
        admin: boolean
    }

    export type Admin = {
        id: string,
        user: User,
        protected: boolean,
        createdAt: string,
        updateAt: string
    }

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

    export type Auth = {
        access_token: string,
        user: User
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
