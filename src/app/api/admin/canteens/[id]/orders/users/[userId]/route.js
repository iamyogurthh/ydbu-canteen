import { getOrdersByUserIdAndCanteenId } from "@/models/orderItems";

export async function GET(req,{params}){
    const {id : canteenId, userId} = await params;
    const users = await getOrdersByUserIdAndCanteenId(userId,canteenId);
    return Response.json(users);
}