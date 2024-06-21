"use server"

import { db } from "@/db"
import { CaseColor, CaseFinish, CaseMaterial, PhoneModel } from "@prisma/client"

export type SaveConfigArgs = {
    color: CaseColor
    model: PhoneModel
    finish: CaseFinish
    material: CaseMaterial
    configId: string
}

export async function saveConfig({
    color,
    model,
    finish,
    material,
    configId,
}: SaveConfigArgs ) {

    await db.configuration.update({
        where: {id: configId},
        data: {color, model, finish, material},
    })
}