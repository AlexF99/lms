import prisma from "@/lib/db"
import LectureEditor from "../editor"

export default async function Page({ params }: { params: { id: string } }) {
    try {
        const lecture = await prisma.lecture.findUniqueOrThrow({
            where: {
                id: params.id
            }
        })

        if (!lecture) return <h1>Could not find lecture!</h1>

        return (
            <div>
                <LectureEditor></LectureEditor>
            </div>
        )
    } catch (err) {
        return <h1>Could not load lecture</h1>
    }
}