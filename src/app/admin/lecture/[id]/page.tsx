import prisma from "@/lib/db"
import LectureEditor from "../lectureEditor"

export default async function Page({ params }: { params: { id: string } }) {
    try {
        const lecture = await prisma.lecture.findUniqueOrThrow({
            where: {
                id: params.id
            }
        })

        const modules = await prisma.module.findMany({
            select: { id: true, title: true },
        })

        if (!lecture) return <h1>Could not find lecture!</h1>

        return (
            <div>
                <LectureEditor lectureToEdit={lecture} modules={modules}></LectureEditor>
            </div>
        )
    } catch (err) {
        return <h1>Could not load lecture</h1>
    }
}