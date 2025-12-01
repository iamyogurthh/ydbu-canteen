import pool from "@/database/database";

export async function getAllMenuByCanteenId(id){
    const [canteen] = await pool.query(`
    SELECT * FROM Canteen WHERE id=?`,[id]);
    const [menus] = await pool.query(`
    SELECT * FROM Menu WHERE canteen_id=?`,[id])
    return {canteen : canteen[0],menus}
}

export async function searchMenu(name){
    const [menus] = await pool.query(
        `
        SELECT 
            Menu.*, 
            Canteen.name AS canteen_name,
            Canteen.cover_img,
            Canteen.profile_img,
            Canteen.created_at
        FROM Menu
        INNER JOIN Canteen ON Menu.canteen_id = Canteen.id
        WHERE Menu.status = 'available'
          AND Menu.name LIKE ?
        `,
        [`%${name}%`]
    );

    return menus;
}



export async function getAvailableMenuByCanteenId(id){
    const [canteen] = await pool.query(`
    SELECT * FROM Canteen WHERE id=?`,[id]);
    const [menus] = await pool.query(`
    SELECT * FROM Menu WHERE canteen_id=? AND status='available'`,[id])
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

export async function updateMenuStatus(id,status){
    const isok = await pool.query(
    `   
        UPDATE Menu SET
        status=? WHERE id=?
    `,[status,id]);
    if(isok){
        return true;
    }
    return false;
}




export async function deleteMenuById(id) {
    const [result] = await pool.query(
        `
            DELETE FROM Menu WHERE id = ?
        `,
        [id]
    );

    return result.affectedRows > 0;
}
