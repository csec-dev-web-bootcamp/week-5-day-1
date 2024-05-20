'use client'

import { register } from "@/data/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function RegisterForm() {
    const route = useRouter()
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
    })

    function onChange(e) {
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }


    async function onSubmit(e) {
        e.preventDefault()
        const res = await register(formState)
        console.log({ res });
        if (res.error) {
            alert(JSON.stringify(res.error))
            return
        }
        alert(`You have successfully`)
        route.push("/")
    }


    return (
        <form onSubmit={onSubmit} className='max-w-md mx-auto my-10 flex flex-col gap-4'>
            <label>Name
            </label>
            <input onChange={onChange} name="name" type='text' />
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
