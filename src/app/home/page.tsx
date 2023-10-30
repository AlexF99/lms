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
          students: {
            some: {
              id: loggedUser?.id
            }
          }
        }
      ]
    }
  })

  console.log(myCourses)

  return (
    <div>
      <h1 className='mr-3 text-xl'>My courses</h1>

    </div>
  )
}
