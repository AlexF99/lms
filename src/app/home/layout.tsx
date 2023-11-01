import '../globals.css'
import Link from 'next/link'
import Signout from '@/components/signout'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="navbar bg-base-100">
          <div className="flex-none">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-1">
            <Link href="/home" className="btn btn-ghost normal-case text-xl">lms</Link>
          </div>
          <div className="flex-none">
            <Signout></Signout>
          </div>
        </div>
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li>
            <Link href="/home">
              Home
            </Link>
          </li>
          <li>
            <Link href="/home">
              Item 1
            </Link>
          </li>
          <li>
            <Link href="/home">
              Item 3
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
