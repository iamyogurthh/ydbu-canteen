import { getCanteenById } from '@/models/canteen'
import { getAllUsers, searchUsers } from '@/models/user'

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");

  let users;

  if (keyword) {
    users = await searchUsers(keyword);
  } else {
    users = await getAllUsers()
  }
  
  for (let i = 0; i < users.length; i++) {
    if (users[i].role_id == 2) {
      const canteen = await getCanteenById(users[i].canteen_id)
      users[i].canteen_name = canteen?.name
    }

  }
  return Response.json(users)
}
