import CanteenCard from '@/components/CanteenCard'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { OPTIONS } from './api/auth/[...nextauth]/route'


export default async function Home() {

  const session = await getServerSession(OPTIONS)

  if (session?.user?.role_id === 2)
    redirect('/canteenOwner')

  if(session?.user?.role_id === 3)
    redirect('/adminn')

  const data = await fetch('http://localhost:3000/api/canteens')
  const canteens = await data.json()

  return (
    <div className="px-0 py-[80px] sm:px-4 md:px-6 lg:px-10 my-10">
      <h1 className="text-2xl font-medium mb-4">Canteens</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {canteens &&
          canteens.map((canteen, index) => (
            <CanteenCard key={index} canteen={canteen} />
          ))}
      </div>
    </div>
  )
}
