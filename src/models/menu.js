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

//--------------------Create Section------------------------

export async function createMenu(canteen_id, name, img, price){
    const isok = await pool.query(
        `
            INSERT INTO Menu (canteen_id,name,img,price) VALUES (?,?,?,?)
        `,[canteen_id,name,img,price]
    )
    if(isok){
        return true;
    }
    return false;
}

export async function updateMenu(id,name,img,price){
    const isok = await pool.query(
    `   
        UPDATE Menu SET
        name = ?,
        img = ?,
        price = ?
        WHERE id = ?;
    `,[name,img,price,id]
    );
    if(isok){
        return true;
    }
    return false;
}
