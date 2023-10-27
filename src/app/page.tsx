import Link from "next/link";

export default async function Home() {

  return (
    <div>
      <div className="flex justify-end">
        <Link className="mr-3" href={'/auth/login'}>Login</Link>
        <Link href={'/auth/register'}>Sign Up</Link>
      </div>
      <div className="container">
        yello
      </div>
    </div>
  )
}
