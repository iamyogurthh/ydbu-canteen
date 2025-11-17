import { getAllUsers } from "@/models/user";

export async function GET() {
    const canteens = await getAllUsers();
    return Response.json(canteens);
}
