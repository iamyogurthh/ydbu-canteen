import { getOrderUsers } from "@/models/orderItems";

export async function GET(req,{params}){
    const {id : canteen_id} = await params;
    const users = await getOrderUsers(canteen_id);
    return Response.json(users)
}