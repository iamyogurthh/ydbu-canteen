import { getCanteenById } from "@/models/canteen";
import { checkMenuAvailability } from "@/models/menu";
import { putOrder } from "@/models/order";
import { getOrderUsers, getOrdersByUserIdAndCanteenId } from "@/models/orderItems";

export async function GET(req){
    // const order = await putOrder(1,"Delecious Kitchen",1,4,"Much Onion");
    // if(order){
    //     return Response.json({message : "Successfully put order"})
    // }
    checkMenuAvailability(1,3);
    // console.log(canteen)
    // const ids = await getOrderUsers(1);
    // console.log(ids)
    // return Response.json({message : "Hello TESTER"})
    // const itemms = await getOrdersByUserIdAndCanteenId(5,1);
    // console.log(itemms)
}