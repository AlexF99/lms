import prisma from "@/lib/db";
import Link from "next/link";

const Lecture = async () => {

    const lectures = await prisma.lecture.findMany({
        select: {
            id: true,
            title: true
        },
    })
    return (
        <div>
            <div className="flex justify-between">

                <h1 className="text-xl">Lectures</h1>
                <Link href={'/admin/lecture/create'} className="btn btn-primary">Add new</Link>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>title</th>
                            <th>id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lectures && lectures.map((lec, i) => (
                            <tr key={i}>
                                <th><Link href={`/admin/lecture/${lec.id}`}>{lec.title}</Link></th>
                                <td>{lec.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>)
}

export default Lecture;