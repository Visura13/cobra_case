import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products"
import { CaseFinish, CaseMaterial } from "@prisma/client"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  return formatter.format(price / 100)
}

export const totalPrice = (finish?: CaseFinish, material?: CaseMaterial) => {
  let totalPrice = BASE_PRICE + (
    finish === "textured" ? PRODUCT_PRICES.finish.textured 
    : 0
  ) + (
    material === "polycarbonate" ? PRODUCT_PRICES.material.polycarbonate 
    : 0
  )

  return totalPrice
}