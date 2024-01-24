import prisma from "@/lib/db";
import Link from "next/link";

export default async function LectureQuizLink(props: any) {

    const { moduleId } = props;

    const lectures = await prisma.lecture.findMany({
        select: {
            id: true,
            title: true
        },
        where: {
            moduleId: moduleId
        }
    })
    const quizes = await prisma.quiz.findMany({
        select: {
            id: true,
            title: true
        },
        where: {
            moduleId: moduleId
        }
    })

    return (
        <div>
            {lectures && lectures.map((lec, i) => (
                <div key={i}>
                    <Link href={`/home/lecture/${lec.id}`}>{lec.title}</Link>
                </div>
            ))}
            {quizes && quizes.map((q, i) => (
                <div key={i}>
                    <Link href={`/home/quiz/${q.id}`}>{q.title}</Link>
                </div>
            ))}
        </div>
    )
}
