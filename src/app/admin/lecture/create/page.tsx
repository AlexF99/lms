import prisma from "@/lib/db"
import LectureEditor from "../lectureEditor"

export default async function Page() {

    const modules = await prisma.module.findMany({
        select: { id: true, title: true },
    })

    return (
        <div>
            <h1 className="text-xl">Create new lecture</h1>
            <LectureEditor modules={modules}></LectureEditor>
        </div>
    )
}