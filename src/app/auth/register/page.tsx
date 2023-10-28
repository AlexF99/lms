'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface signUpForm {
  email: string;
  name: string;
  password: string;
}

export default function Register() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<signUpForm>();

  const submit = async (data: any) => {
    try {
      const res = await (await fetch("/api/user",
        {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        })).json();
      console.log(res)
      router.push("/auth/login")
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='flex justify-center'>
      <div>
        <div>
          <span className='mr-3 text-xl'>Sign Up</span>
          <span>Already have an account?
            <Link className='ml-2 link' href='/auth/login'>Login</Link>
          </span>
        </div>
        <form className='mt-3' onSubmit={handleSubmit((data) => submit(data))}>
          <input type="text" {...register('email')} placeholder="e-mail" className="input  mb-2 input-bordered w-full" />
          <input type="text" {...register('name')} placeholder="name" className="input  mb-2 input-bordered w-full" />
          <input type="password" {...register('password')} placeholder="password" className="input  mb-2 input-bordered w-full" />
          <button className='btn btn-primary' type='submit'>register</button>
        </form>
      </div>
    </div>
  )
}
