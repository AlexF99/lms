'use client'

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface loginForm {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<loginForm>();

  const submit = async (data: any) => {
    const signinData = await signIn('credentials', {
      ...data
    })
    if (signinData?.error) console.log(signinData.error)
    else router.push("/")
    console.log(signinData)
  }

  return (
    <div className='flex justify-center'>
      <div>
        <div>
          <Link className='mr-3' href='/'>Back</Link>
          <span>Login</span>
        </div>
        <form className='mt-3' onSubmit={handleSubmit((data) => submit(data))}>
          <input type="text" {...register('email')} placeholder="e-mail" className="input  mb-2 input-bordered w-full" />
          <input type="password" {...register('password')} placeholder="password" className="input  mb-2 input-bordered w-full" />
          <button className='btn btn-primary' type='submit'>log in</button>
        </form>
      </div>
    </div>
  )
}
