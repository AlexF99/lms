import prisma from "@/lib/db"
import LectureEditor from "../editor"

export default async function Page() {
    return (
        <div>
            <h1 className="text-xl">Create new lecture</h1>
            <LectureEditor></LectureEditor>
        </div>
    )
}