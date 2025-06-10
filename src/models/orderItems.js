import pool from "@/database/database";
import { getUserById } from "./user";
import { getMenuById } from "./menu";
import { getOrderById } from "./order";

export async function getOrderItemsByCanteenId(id) {
    const [items] = await pool.query(
        `
        SELECT * FROM orderItems WHERE canteen_id=?
        `, [id]
    )
    return items;
}

async function getDifferentOrderId(canteen_id){
    const [orderIds] = await pool.query(
        `
            SELECT DISTINCT order_id FROM orderItems WHERE canteen_id=?;
        `,[canteen_id]
    )
    return orderIds;
}

export async function getOrderUsers(canteen_id) {
    const orderItems = await getDifferentOrderId(canteen_id);
    const users = [];
    for (let i = 0; i < orderItems.length; i++) {
        const orderDetail = await getOrderById(orderItems[i].order_id);
        users.push({
            customer_id : orderItems[i].order_id,
            name : orderDetail.name,
            phone: orderDetail.phone,
            major: orderDetail.major,
            location: orderDetail.current_location,
            status : orderDetail.status,
        }) 
    }
    return users;

}


export async function getOrdersByOrderIdAndCanteenId(order_id,canteen_id){
    console.log("I am order and canteen",order_id,canteen_id)
    const [orders] = await pool.query(
        `
        SELECT * FROM orderItems WHERE order_id=? and canteen_id=?
        `,[order_id,canteen_id]
    );
    const orderDetails = [];
    for(let i=0; i < orders.length ; i++){
        const menu = await getMenuById(orders[i].menu_id);
        orderDetails.push(
            {
                name : menu.name,
                img : menu.img,
                quantity : orders[i].quantity,
                price : orders[i].total_price
            }
        )
    }
    return orderDetails;
}