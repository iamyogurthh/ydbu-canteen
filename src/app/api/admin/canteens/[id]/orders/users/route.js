import { getOrderUsers } from "@/models/orderItems";

export async function GET(req,{params}){
    const {id} = await params;
    const users = await getOrderUsers(id);
    return Response.json(users)
}