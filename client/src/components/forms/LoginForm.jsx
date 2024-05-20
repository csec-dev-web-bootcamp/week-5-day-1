'use client'

import { login } from '@/data/auth'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function LoginForm() {
    const route = useRouter()
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    })

    function onChange(e) {
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }


    async function onSubmit(e) {
        e.preventDefault()
        const res = await login(formState)
        console.log({ res });
        if (res?.error) {
            alert(JSON.stringify(res.error))
            return
        }
        alert(`You have successfully`)
        route.push("/")
    }
    return (
        <form onSubmit={onSubmit} className='max-w-md mx-auto my-10 flex flex-col gap-4'>
            <label>Email
            </label>
            <input onChange={onChange} name="email" type='email' />
            <label>
                Password
            </label>
            <input onChange={onChange} name="password" type='password' />
            <button type='submit' className="bg-black text-white">submit</button>
        </form>
    )
}
