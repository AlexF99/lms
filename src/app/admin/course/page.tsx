import prisma from "@/lib/db";
import Link from "next/link";

const Course = async () => {

    const courses = await prisma.course.findMany({
        select: {
            id: true,
            title: true,
            categories: true
        },
    })
    return (
        <div>
            <div className="flex justify-between">

                <h1 className="text-xl">courses</h1>
                <Link href={'/admin/course/create'} className="btn btn-primary">Add new</Link>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses && courses.map((course, i) => (
                            <tr key={i}>
                                <th><Link href={`/admin/course/${course.id}`}>{course.title}</Link></th>
                                <td>{course.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>)
}

export default Course;