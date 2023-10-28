import Signout from "@/components/signout";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {

  const session = await getServerSession(authOptions)
  const user = session?.user;

  return (
    <div>
      <div className="flex justify-end">
        {!user ?
          (<div>
            <Link className="mr-3" href={'/auth/login'}>Login</Link>
            <Link href={'/auth/register'}>Sign Up</Link>
          </div>) :
          <Signout></Signout>
        }
      </div>
      {user && <div className="container">
        Welcome, {user?.email}
      </div>}
    </div>
  )
}
