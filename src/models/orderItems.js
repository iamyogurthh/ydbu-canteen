import pool from "@/database/database";
import { getUserById } from "./user";
import { getMenuById } from "./menu";

export async function getOrderItemsByCanteenId(id) {
    const [items] = await pool.query(
        `
        SELECT * FROM orderItems WHERE canteen_id=?
        `, [id]
    )
    return items;
}

export async function getOrderUsers(canteen_id) {
    const orderItems = await getOrderItemsByCanteenId(canteen_id);
    const users = [];
    for (let i = 0; i < orderItems.length; i++) {
        const user = await getUserById(orderItems[i].user_id);
        users.push({
            customer_id: user.id,
            name : user.name,
            phone: user.ph_no,
            major: user.major,
            location: orderItems[i].current_location,
            status : orderItems[i].status,
        })
    }
    return users;

}


export async function getOrdersByUserIdAndCanteenId(user_id,canteen_id){
    console.log("I am user and canteen",canteen_id,user_id)
    const [orders] = await pool.query(
        `
        SELECT * FROM orderItems WHERE user_id=? and canteen_id=?
        `,[user_id,canteen_id]
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