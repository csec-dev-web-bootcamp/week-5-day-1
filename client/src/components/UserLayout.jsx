
export default function UserLayout({ children }) {
    return (
        <>

            <nav className="flex gap-4">
                <Link href={'/auth/login'} >Login</Link>
                <Link href={'/auth/register'}>Register</Link>
                <Link href={'/profile'}>Profile</Link>
                <Link href={'/admin'}>Admin</Link>
            </nav>
            {children}


        </>
    );
}
