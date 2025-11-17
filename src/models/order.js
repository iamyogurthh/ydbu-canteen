import pool from "@/database/database";
import { getCanteenById, getCanteenByName } from "./canteen";
import { getUserById } from "./user";
import { getMenuById } from "./menu";

export async function getAllOrders(){
    const [orders] = await pool.query(`SELECT * FROM orders`)
    return orders;
}

export async function getOrderId(user_id,name,phone,current_location) {
    const user = await getUserById(user_id);
    if(!user){
        return;
    }
    const [order] = await pool.query(
        `
        INSERT INTO Orders (current_location,user_id,name,phone) VALUES (?,?,?,?)
        `, [current_location,user_id,name,phone]
    );
    return order.insertId;
    
}

export async function insertOrderItems(order_id,user_id,canteen_id,menu_id, quantity) {
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
        INSERT INTO OrderItems (order_id,user_id,canteen_id,menu_id,quantity,price,total_price)
         VALUES (?,?,?,?,?,?,?)
        `, [order_id,user_id,canteen_id ,menu_id, quantity, price, totalPrice]
    );
    if(!orderItem){
        return false;
    }
    return true;
}

export async function getOrderById(id){
    const [order] = await pool.query(
        `
            SELECT * FROM orders WHERE id=?
        `,[id]
    )
    return order[0];
}

export async function deleteOrderById(id){
    const [result] = await pool.query(
        `
            DELETE FROM orders WHERE id=?
        `,[id]
    )
    return result.affectedRows > 0;
}