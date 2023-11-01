import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"

export default async function Home() {

  const loggedUser = (await getServerSession(authOptions))?.user;

  const myCourses = await prisma.course.findMany({
    where: {
      OR: [
        { ownerId: loggedUser?.id },
        {
          enrollment: {
            some: {
              userId: loggedUser?.id
            }
          }
        }
      ]
    },
    select: {
      categories: true,
      title: true,
      id: true
    }
  })

  console.log(myCourses);



  return (
    <div>
      <h1 className='mr-3 text-xl'>My courses</h1>
      {myCourses && myCourses.map(course => (
        <div key={course.id} className="card w-96 bg-base-100 shadow-xl">
          <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="courseLogo" /></figure>
          <div className="card-body">
            <h2 className="card-title">
              {course.title}
            </h2>
            <div className="card-actions justify-end">
              {course.categories && course.categories.map(cat => (
                <div className="badge badge-outline">{cat.name}</div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
