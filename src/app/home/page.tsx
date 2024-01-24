import CourseCard from "@/components/courseCard";
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"

export default async function Home() {

  const loggedUser = (await getServerSession(authOptions))?.user;

  const allCourses = await prisma.course.findMany({
    select: {
      categories: true,
      title: true,
      imageUrl: true,
      id: true
    }
  });

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
      imageUrl: true,
      id: true
    }
  })

  return (
    <div>
      <div className="mt-3">
        <h1 className='mr-3 text-xl'>My courses</h1>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
          {myCourses && myCourses.map((course: any) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
      <div className="mt-3">
        <h1 className='mr-3 text-xl'>All courses</h1>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
          {allCourses && allCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  )
}
