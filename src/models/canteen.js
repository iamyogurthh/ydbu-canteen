import pool from "@/database/database";

export async function getCanteenById(id){
    const [canteen] = await pool.query( 
        `
            SELECT * FROM Canteen WHERE id=?
        `,[id]
    );
    return canteen[0];
}

export async function searchCanteen(name){
    const [canteens] = await pool.query(
        `
        SELECT *
        FROM Canteen
        WHERE name LIKE ?
        `,
        [`%${name}%`]
    );

    return canteens;
}


export async function getAllCanteens(){
    const [canteens] = await pool.query( 
        `
            SELECT * FROM Canteen
        `
    );
    return canteens;
}

export async function getCanteenByName(canteen_name){
    const [canteen] = await pool.query( 
        `
            SELECT * FROM Canteen WHERE name=?
        `,[canteen_name]
    );
    return canteen[0];
}

export async function getCanteensWithOwnerInfo(){
    const [canteens] = await pool.query(`SELECT c.id as canteen_id,
    c.name as canteen_name,
    c.created_at as created_at,
    u.name as owner_name FROM Canteen as c INNER JOIN user u
    on c.id = u.canteen_id`);
    return canteens;
}

export async function searchCanteensWithOwnerInfo(searchName = "") {
    const [canteens] = await pool.query(
        `
        SELECT 
            c.id AS canteen_id,
            c.name AS canteen_name,
            c.created_at AS created_at,
            u.name AS owner_name
        FROM Canteen AS c
        INNER JOIN User AS u
            ON c.id = u.canteen_id
        WHERE c.name LIKE ?
        `,
        [`%${searchName}%`]
    );

    return canteens;
}


//--------------------Create & UPDATE Section------------------------

export async function createCanteen(name,profile_img,cover_img){
    const [result] = await pool.query(
        `
        INSERT INTO Canteen (name,profile_img,cover_img) VALUES (?,?,?)
        `,[name,profile_img,cover_img]
    );
    return result?.insertId ?? null;
}

export async function updateCanteen(id,name,profile_img,cover_img){
    const isok = await pool.query(
        `
        UPDATE Canteen SET 
        name = ?,
        profile_img = ?,
        cover_img = ?
        WHERE id = ?
    `,[name,profile_img,cover_img,id]
    );
    if(isok){
        return true;
    }
    return false;
}

export async function deleteCanteenById(id) {
    const [result] = await pool.query(
        `
            DELETE FROM Canteen WHERE id = ?
        `,
        [id]
    );

    return result.affectedRows > 0;
}
