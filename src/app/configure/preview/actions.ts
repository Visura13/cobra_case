"use server"

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export async function createCheckoutSession({ configId }: { configId: string } ) {

    const configuration = await db.configuration.findUnique({
        where: {id: configId}
    })

    if (!configuration) {
        throw new Error("Could not find configuration")
    }

    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        throw new Error("you must be logged in")
    }

    const { finish, material } = configuration

    let totalPrice = BASE_PRICE + (finish === "textured" ? PRODUCT_PRICES.finish.textured : 0) + (material === "polycarbonate" ? PRODUCT_PRICES.material.polycarbonate : 0)
}