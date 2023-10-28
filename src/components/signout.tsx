'use client';

import { signOut } from "next-auth/react";

export default async function Signout() {

  return (
    <button className="btn btn-ghost" onClick={() => signOut({
      redirect: true,
      callbackUrl: '/auth/login'
    })}>
      Sign out
    </button>
  )
}
