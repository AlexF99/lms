import prisma from "@/lib/db";
import Link from "next/link";

const Category = async () => {

    const categories = await prisma.courseCategory.findMany({
        select: {
            id: true,
            name: true,
        },
    })
    return (
        <div>
            <div className="flex justify-between">

                <h1 className="text-xl">categories</h1>
                <Link href={'/admin/category/create'} className="btn btn-primary">Add new</Link>
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
                        {categories && categories.map((category, i) => (
                            <tr key={i}>
                                <th><Link href={`/admin/category/${category.id}`}>{category.name}</Link></th>
                                <td>{category.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>)
}

export default Category;