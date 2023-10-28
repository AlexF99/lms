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
    try {
      const signinData = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: '/'
      })
      if (signinData?.error) {
        console.log(signinData.error)
      }
      else router.push("/")
    } catch (err) {
      console.error(err)
    }
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
