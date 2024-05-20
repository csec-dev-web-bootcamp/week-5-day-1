'use server'
import fetcher from './fetcher'

export async function geMe() {
    try {
        const res = await fetcher.get('/users/me')
        console.log(res.data);
        return res.data
    } catch (error) {
        console.log({ error });
        const data = error.response?.data
        return { error: data || "Unknow error" };
    }

}
