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

export async function createMenu(canteen_id, name,quantity, img, price){
    const isok = await pool.query(
        `
            INSERT INTO Menu (canteen_id,name,quantity,img,price) VALUES (?,?,?,?,?)
        `,[canteen_id,name,quantity,img,price]
    )
    if(isok){
        return true;
    }
    return false;
}

export async function updateMenu(id,name,quantity,img,price){
    const isok = await pool.query(
    `   
        UPDATE Menu SET
        name = ?,
        quantity = ?,
        img = ?,
        price = ?
        WHERE id = ?;
    `,[name,quantity,img,price,id]
    );
    if(isok){
        return true;
    }
    return false;
}

export async function checkMenuAvailability(menu_id,quantity){
    const [menu] = await pool.query(
        `
        SELECT * FROM MENU WHERE id=?
        `,[menu_id]
    );
    if(!menu){
        return false;
    }
    if(menu[0].quantity < quantity){
        return false;
    }
    return true;
}