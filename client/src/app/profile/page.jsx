import { geMe } from "@/data/users"

export default async function Page() {
  const user = await geMe()
  return (
    <div className="flex flex-col items-center justify-center">
      Profile Page
      <p>
        Name  {user?.name}
      </p>
      <p>

        Email  {user?.email}
      </p>
    </div>
  )
}
