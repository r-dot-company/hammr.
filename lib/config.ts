import Joi from "joi"

const schema = Joi.object({
    NEXT_PUBLIC_SHOPR_URL: Joi.string().uri()
})

schema.validate(process.env, { presence: "required" })

const config = {
    api: {
        url: process.env.NEXT_PUBLIC_SHOPR_URL!
    }
} as const

export default config
