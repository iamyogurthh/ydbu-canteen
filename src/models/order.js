import pool from "@/database/database";
import { getCanteenById, getCanteenByName } from "./canteen";
import { getUserById } from "./user";
import { getMenuById } from "./menu";

export async function getOrderId(user_id,name,phone,major,special_request) {
    const user = await getUserById(user_id);
    if(!user){
        return;
    }
    const [order] = await pool.query(
        `
        INSERT INTO Orders (user_id,name,phone,major,special_request) VALUES (?,?,?,?,?)
        `, [user_id,name,phone,major,special_request]
    );
    return order.insertId;
    
}

export async function insertOrderItems(order_id,user_id,canteen_id,menu_id, quantity,current_location) {
    console.log("I am order item");
    console.log(order_id,canteen_id,menu_id,quantity);
    const canteen = await getCanteenById(canteen_id);
    const menu = await getMenuById(menu_id);
    if(!menu || !canteen){
        return false;
    }
    const price = menu.price;
    const totalPrice = price * Number(quantity);
    const [orderItem] = await pool.query(
        `
        INSERT INTO OrderItems (current_location,order_id,user_id,canteen_id,menu_id,quantity,price,total_price)
         VALUES (?,?,?,?,?,?,?,?)
        `, [current_location,order_id,user_id,canteen_id ,menu_id, quantity, price, totalPrice]
    );
    if(!orderItem){
        return false;
    }
    return true;
}