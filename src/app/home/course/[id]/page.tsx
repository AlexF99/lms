import EnrollButton from "@/components/enroll";
import LectureQuizLink from "@/components/lectureQuizLink";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";

export default async function Page({ params }: { params: { id: string } }) {
    try {
        const loggedUser = (await getServerSession(authOptions))?.user;

        const enrollment = await prisma.enrollment.count({
            where: {
                courseId: params.id,
                userId: loggedUser?.id
            }
        })

        if (enrollment < 1) {
            return <EnrollButton userId={loggedUser?.id} courseId={params.id} />
        }

        const course = await prisma.course.findUniqueOrThrow({
            where: {
                id: params.id
            }
        })

        const modules = await prisma.module.findMany({
            where: {
                courseId: params.id
            }
        })

        return (
            <>
                <h1 className="text-xl text-center">{course.title}</h1>
                <div className="mt-3">
                    {modules && modules.map((mod, i: number) => (
                        <div key={i} className="collapse bg-base-200 mb-2">
                            <input type="radio" name="my-accordion-1" defaultChecked={i === 0} />
                            <div className="collapse-title text-l font-medium">
                                {mod.title}
                            </div>
                            <div className="collapse-content">
                                <LectureQuizLink moduleId={mod.id} />
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    } catch (err) {
        return <h1>Course not found!</h1>
    }
}