import prisma from "@/lib/db"
import Link from "next/link"
import AddModule from "./addModule"

export default async function Modules({ params }: { params: { id: string } }) {

    const modules = await prisma.module.findMany({ where: { courseId: params.id } })

    return (
        <div>
            <AddModule courseId={params.id} />
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modules && modules.map((module, i) => (
                            <tr key={i}>
                                <th><Link href={`/admin/module/${module.id}`}>{module.title}</Link></th>
                                <td>{module.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}