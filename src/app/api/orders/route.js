import { getOrderId, insertOrderItems } from "@/models/order";

export async function POST(req){
    const data = await req.json();
    console.log(data);
    if(!data){
        return Response.json({message : "Some fields are missing"},{status : 400})
    }
    console.log(data[data.length-1])
    const { user_id,name,phone,major,current_location,special_request} = data[data.length-1];
    const order_id = await getOrderId(user_id,name,phone,major,current_location,special_request);
    console.log(order_id);
    for(let i=0 ;i < data.length-1 ; i++){
        console.log(data[i])
        console.log("I am food ID",data[i].food.canteen_id)
        const canteen_id = data[i].food.canteen_id;
        const menu_id = data[i].food.id;
        const quantity = data[i].quantity;
        const putOrder = await insertOrderItems(order_id,user_id,canteen_id,menu_id,quantity);
    }
    return Response.json({message : "Successfully Ordered"},{status : 200})
}