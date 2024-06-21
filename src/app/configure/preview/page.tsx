import { db } from "@/db"
import { notFound } from "next/navigation"
import { PageProps } from "../design/page"
import DesignPreview from "./DesignPreview"

const Page = async ({searchParams}: PageProps) => {
  const { id } = searchParams

  if (!id || typeof id !== "string") {
    return notFound()
  }

  const configuration = await db.configuration.findUnique({
    where: {id}
  })

  if (!configuration) {
    return notFound()
  }

  return <DesignPreview configuration={configuration}/>
}

export default Page