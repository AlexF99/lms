import prisma from "@/lib/db"

export default async function Page({ params }: { params: { id: string } }) {
    try {
        const course = await prisma.course.findUniqueOrThrow({
            where: {
                id: params.id
            }
        })
        return (
            <h1>{course.title}</h1>
        )
    } catch (err) {
        return <h1>Course not found!</h1>
    }

}