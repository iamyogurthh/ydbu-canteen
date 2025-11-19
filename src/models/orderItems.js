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

export async function getOrderItemsByOrderIdAndCanteenId(orderId, canteenId) {
    const [items] = await pool.query(
        `
        SELECT * FROM orderItems WHERE order_id=? AND canteen_id=?
        `, [orderId, canteenId]
    );
    return items;
}

export async function getOrderItemById(id) {
    const [item] = await pool.query(
        `
        SELECT * FROM orderItems WHERE id=?
        `, [id]
    )
    return item[0];
}

export async function getOrderItemsByOrderId(id) {
    const [item] = await pool.query(
        `
        SELECT oi.id as order_item_id,
        menu.name as menu_name,
        menu.img as menu_img,
        oi.quantity as menu_quantity,
        menu.price as menu_price,
        oi.total_price as menu_total_price,
        oi.status as order_item_status
        FROM orderItems oi INNER JOIN menu
        ON oi.menu_id = menu.id
        WHERE order_id=?
        `, [id]
    )
    return item;
}


async function getDifferentOrderId(canteen_id) {
    const [orderIds] = await pool.query(
        `
            SELECT DISTINCT order_id FROM orderItems WHERE canteen_id=?;
        `, [canteen_id]
    )
    return orderIds;
}

export async function getOrderUsers(canteen_id) {
    const orderIds = await getDifferentOrderId(canteen_id);
    const users = [];

    for (let i = 0; i < orderIds.length; i++) {
        let status = 'delivered';
        const orderDetail = await getOrderById(orderIds[i].order_id);
        const orderItems = await getOrderItemsByOrderIdAndCanteenId(orderIds[i].order_id, canteen_id);
        for (let j = 0; j < orderItems.length; j++) {
            if (orderItems[j].status === 'pending'){
                status = 'pending';
                break;
            }
        }
        users.push({
            customer_id: orderDetail.user_id,
            order_id: orderIds[i].order_id,
            name: orderDetail.name,
            phone: orderDetail.phone,
            location: orderDetail.current_location,
            status
        })
    }
    return users;

}


export async function getOrdersByOrderIdAndCanteenId(order_id, canteen_id) {
    console.log("I am order and canteen", order_id, canteen_id)
    const [orderItems] = await pool.query(
        `
        SELECT * FROM orderItems WHERE order_id=? and canteen_id=?
        `, [order_id, canteen_id]
    );
    const orderDetails = [];
    for (let i = 0; i < orderItems.length; i++) {
        const menu = await getMenuById(orderItems[i].menu_id);
        orderDetails.push(
            {
                order_item_id: orderItems[i].id,
                menu_name: menu.name,
                menu_img: menu.img,
                menu_quantity: orderItems[i].quantity,
                menu_price: orderItems[i].price,
                order_item_status: orderItems[i].status,
                menu_total_price: orderItems[i].total_price
            }
        )
    }
    return orderDetails;
}


export async function updateOrderItemStatus(id, status) {
    const isok = await pool.query(
        `   
        UPDATE orderItems SET
        status=? WHERE id=?
    `, [status, id]);

    if (isok) {
        return true;
    }
    return false;
}

