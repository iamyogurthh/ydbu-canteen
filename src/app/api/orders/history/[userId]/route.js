import { getOrdersByUserId } from "@/models/order";

export async function GET(req,{params}){
    const {userId} = await params;
    const orders = await getOrdersByUserId(userId);
    return Response.json(orders)
}