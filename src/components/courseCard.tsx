import Link from "next/link";

interface Course {
    title: string,
    id: string,
    imageUrl: string,
    categories: [{
        id: string,
        name: string
    }]
}

export default async function CourseCard(props: any) {

    const course: Course = props.course;

    return (
        <Link href={`/home/course/${course.id}`} className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={course.imageUrl && course.imageUrl.length ? course.imageUrl : "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"} alt="courseLogo" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {course.title}
                </h2>
                <div className="card-actions justify-end">
                    {course.categories && course.categories.map((cat: any) => (
                        <div key={cat.id} className="badge badge-outline">{cat.name}</div>
                    ))}
                </div>
            </div>
        </Link>
    )
}
