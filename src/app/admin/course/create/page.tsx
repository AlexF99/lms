import prisma from "@/lib/db"
import CourseEditor from "../courseEditor"

export default async function Page() {

    const categories = await prisma.courseCategory.findMany({
        select: { id: true, name: true },
    })

    return (
        <div>
            <h1 className="text-xl">Create new course</h1>
            <CourseEditor categories={categories}></CourseEditor>
        </div>
    )
}