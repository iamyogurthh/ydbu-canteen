import { getCanteenById } from "@/models/canteen";
import { putOrder } from "@/models/order";

export async function GET(req){
    const order = await putOrder(1,"Delecious Kitchen",1,4,"Much Onion");
    if(order){
        return Response.json({message : "Successfully put order"})
    }

    console.log(canteen)
}