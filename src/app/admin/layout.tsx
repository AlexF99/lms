import '../globals.css'
import Link from 'next/link'
import Signout from '@/components/signout'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content overflow-hidden h-[calc(100vh-1rem)]">
        <div className="navbar bg-base-100">
          <div className="flex-none">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-1">
            <Link href="/admin" className="btn btn-ghost normal-case text-xl">lms ADMIN</Link>
          </div>
          <div className="flex-none">
            <Signout></Signout>
          </div>
        </div>
        <div className="overflow-y-auto overflow-x-hidden h-[calc(100%-80px)]">
          {children}
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li>
            <Link href="/admin/lecture">
              Lectures
            </Link>
          </li>
          <li>
            <Link href="/admin/quiz">
              Quizes
            </Link>
          </li>
          <li>
            <Signout></Signout>
          </li>
        </ul>
      </div>
    </div>
  )
}
