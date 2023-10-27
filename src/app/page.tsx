import Comp from "@/components/comp"
import prisma from "@/db"

async function test() {
  // try {
  //   await prisma.user.create({ data: { name: "alexandre", email: "alexandreopf@gmail.com", role: "ADMIN" } })
  //   const res = await fetch(process.env.SERVERURL + "/api/user", { method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ hi: "hi" }) })
  //   const res = await fetch(process.env.SERVERURL + "/api/user")
  //   console.log(res)
  // } catch (err) {
  //   console.log(err)
  // }
  // console.log(res)
  return await prisma.user.count()
}

export default async function Home() {

  const usercount = await test()
  console.log(usercount)
  return (
    <div>
      <h1>{usercount}</h1>
      <div>
        <Comp></Comp>
      </div>
    </div>
  )
}
