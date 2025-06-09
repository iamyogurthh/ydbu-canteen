import { getOrdersByOrderIdAndCanteenId } from "@/models/orderItems";

export async function GET(req,{params}){
    const {id : canteenId, orderId} = await params;
    const items = await getOrdersByOrderIdAndCanteenId(orderId,canteenId)
    return Response.json(items);
}