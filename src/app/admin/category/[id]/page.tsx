import prisma from "@/lib/db"
import CategoryEditor from "../categoryEditor"

export default async function Page({ params }: { params: { id: string } }) {
    try {
        const category = await prisma.courseCategory.findUniqueOrThrow({
            where: {
                id: params.id
            },
        })

        if (!category) return <h1>Could not find category!</h1>

        return (
            <div>
                <CategoryEditor categoryToEdit={category}></CategoryEditor>
            </div>
        )
    } catch (err) {
        return <h1>Could not load category!</h1>
    }
}