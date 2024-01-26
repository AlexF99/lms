import prisma from "@/lib/db"
import CategoryEditor from "../categoryEditor"

export default async function Page() {

    return (
        <div>
            <h1 className="text-xl">Create new category</h1>
            <CategoryEditor></CategoryEditor>
        </div>
    )
}