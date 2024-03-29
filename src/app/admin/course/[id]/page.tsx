import prisma from "@/lib/db"
import CourseEditor from "../courseEditor"
import Link from "next/link"

export default async function Page({ params }: { params: { id: string } }) {
    try {
        const course = await prisma.course.findUniqueOrThrow({
            where: {
                id: params.id
            },
            select: {
                id: true,
                title: true,
                imageUrl: true,
                categories: true
            },
        })

        const categories = await prisma.courseCategory.findMany({
            select: { id: true, name: true },
        })

        if (!course) return <h1>Could not find course!</h1>

        return (
            <div>
                <CourseEditor courseToEdit={course} categories={categories} ></CourseEditor>
                <Link href={`/admin/course/${params.id}/modules`}>modules</Link>
            </div>
        )
    } catch (err) {
        return <h1>Could not load course!</h1>
    }
}