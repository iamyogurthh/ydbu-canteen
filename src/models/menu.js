import pool from "@/database/database";

export async function getMenuByCanteenId(id){
    const [canteen] = await pool.query(`
    SELECT * FROM Canteen WHERE id=?`,[id]);
    const [menus] = await pool.query(`
    SELECT * FROM Menu WHERE canteen_id=?`,[id])
    return {canteen : canteen[0],menus}
}

export async function getMenuById(id){
    const [menu] = await pool.query(
        `
        SELECT * FROM Menu WHERE id=?
        `,[id]
    );
    return menu[0];
}