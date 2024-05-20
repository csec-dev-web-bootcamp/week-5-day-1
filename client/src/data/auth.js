'use server'
import axios from 'axios'
import { cookies } from 'next/headers'
const server_host = 'http://localhost:8000'

export async function login(formData) {
    const cookieStore = cookies()
    try {
        const res = await axios.post(server_host + '/auth/login', formData)
        const data = res.data
        if (data.user && data.jwt) {
            cookieStore.set({
                name: 'accessToken',
                value: data.jwt,
                secure: process.env.NODE_ENV === 'production',
            });
        }
        return { user: data.user }
    } catch (error) {
        console.log({ error });
        const data = error.response?.data
        return { error: data || "Unknow error" };
    }

}

export async function register(formData) {
    const cookieStore = cookies()
    try {
        const res = await axios.post(server_host + '/auth/register', formData)
        console.log({ res });
        const data = res.data
        if (data.user && data.jwt) {
            cookieStore.set({
                name: 'accessToken',
                value: data.jwt,
                secure: process.env.NODE_ENV === 'production',
            });
        }
        return { user: data.user }
    } catch (error) {
        console.log({ error });
        const data = error.response?.data
        return { error: data || "Unknow error" };
    }

}


