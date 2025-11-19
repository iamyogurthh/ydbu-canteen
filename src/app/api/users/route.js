import { getCanteenById } from '@/models/canteen'
import { getAllUsers } from '@/models/user'

export async function GET() {
  let users = await getAllUsers()
  for (let i = 0; i < users.length; i++) {
    if (users[i].role_id == 2) {
      const canteen = await getCanteenById(users[i].canteen_id)
      users[i].canteen_name = canteen?.name
    }
  }
  return Response.json(users)
}
