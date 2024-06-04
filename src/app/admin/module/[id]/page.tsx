import prisma from "@/lib/db";
import Link from "next/link";

export default async function Module({ params }: { params: { id: string } }) {
    const mod = await prisma.module.findUniqueOrThrow({
        where: {
            id: params.id
        },
        select: {
            id: true,
            title: true,
            lectures: true,
            quizes: true,
        },
    })

    if (!mod) return <h1 className="text-xl">Cannot find module!</h1>

    return (
        <div>
            <h1 className="text-xl">{mod.title}</h1>
            <div>
                <h1>Lectures</h1>
                <Link href={{ pathname: '/admin/lecture/create', query: { moduleId: mod.id } }} className="btn btn-primary">create new</Link>
                {mod.lectures && mod.lectures.length > 0 &&
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>id</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mod.lectures.map((lec, i) => (
                                    <tr key={i}>
                                        <th><Link href={`/admin/lecture/${lec.id}`}>{lec.title}</Link></th>
                                        <td>{lec.id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            <div>
                <h1>Quizes</h1>
                <Link href={"/admin/quiz/create"} className="btn btn-primary">create new</Link>
                {mod.quizes && mod.quizes.length > 0 &&
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>id</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mod.quizes.map((q, i) => (
                                    <tr key={i}>
                                        <th><Link href={`/admin/quiz/${q.id}`}>{q.title}</Link></th>
                                        <td>{q.id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div >
    )
}