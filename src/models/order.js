import pool from "@/database/database";
import { getCanteenByName } from "./canteen";
import { getUserById } from "./user";
import { getMenuById } from "./menu";

export async function getOrderId(user_id,name,phone,major,current_location,special_request) {
    const user = await getUserById(user_id);
    if(!user){
        return;
    }
    const [order] = await pool.query(
        `
        INSERT INTO Orders (user_id,name,phone,major,current_location,special_request) VALUES (?,?,?,?,?,?)
        `, [user_id,name,phone,major,current_location,special_request]
    );
    return order.insertId;
    
}

export async function insertOrderItems(order_id,canteen_name,menu_id, quantity) {
    const canteen = await getCanteenByName(canteen_name);
    const menu = await getMenuById(menu_id);
    if(!menu || !canteen){
        return false;
    }
    const price = menu.price;
    const totalPrice = price * Number(quantity);
    const [orderItem] = await pool.query(
        `
        INSERT INTO OrderItems (order_id,canteen_name,menu_id,quantity,price,total_price)
         VALUES (?,?,?,?,?,?)
        `, [order_id,canteen_name ,menu_id, quantity, price, totalPrice]
    );
    if(!orderItem){
        return false;
    }
    return true;
}