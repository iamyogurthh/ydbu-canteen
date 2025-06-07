import { getOrdersByUserIdAndCanteenId } from "@/models/orderItems";

export async function GET(req,{params}){
    const {id : canteenId, userId} = await params;
    const items = await getOrdersByUserIdAndCanteenId(userId,canteenId);
    return Response.json(items);
}