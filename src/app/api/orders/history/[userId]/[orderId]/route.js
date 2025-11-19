import {  } from "@/models/order";
import { getOrderItemsByOrderId } from "@/models/orderItems";

export async function GET(req,{params}){
    const {orderId} = await params;
    const orderItems = await getOrderItemsByOrderId(orderId);
    return Response.json(orderItems)
}