import Link from "next/link";
import adminRoutes from "./adminRoutes";

export default async function Admin() {

  return (
    <div>
      <ul className="menu p-4 w-80 min-h-full text-base-content">
        {adminRoutes && Object.keys(adminRoutes).map((r:string, i) => <li key={i}>
          <Link href={adminRoutes[r]}>
            {r.toUpperCase()}
          </Link>
        </li>)}
      </ul>
    </div>
  )
}
