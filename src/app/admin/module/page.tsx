import prisma from "@/lib/db";
import Link from "next/link";


export default async function ModuleList({ params }: { params: { id: string } }) {
    const courses = await prisma.course.findMany({
        where: {
            id: params.id
        },
        select: {
            id: true,
            title: true,
            modules: true,
        },
    })

    if (!courses) return <h1 className="text-xl">Cannot find module!</h1>

    return (
        <div>
            {courses && courses.map(course => (
                <div key={course.id}>
                    <h2 className="text-xl">{course.title}</h2>
                    {course?.modules.length > 0 ?
                        <div className="flex flex-col">
                            {course.modules.map(mod => (
                                <Link className="btn mb-2" key={mod.id} href={`/admin/module/${mod.id}`}>{mod.title}</Link>
                            ))}
                        </div>
                        : <p>No modules</p>
                    }
                </div>
            ))}
        </div>
    )
}