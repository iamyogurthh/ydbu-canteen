import pool from "@/database/database";

export async function getCanteenById(id){
    const [canteen] = await pool.query( 
        `
            SELECT * FROM Canteen WHERE id=?
        `,[id]
    );
    return canteen[0];
}

export async function getCanteenByName(canteen_name){
    const [canteen] = await pool.query( 
        `
            SELECT * FROM Canteen WHERE name=?
        `,[canteen_name]
    );
    return canteen[0];
}

export async function getCanteens(){
    const [canteens] = await pool.query('SELECT id,name,profile_img FROM Canteen');
    return canteens;
}

//--------------------Create & UPDATE Section------------------------

export async function createCanteen(name,profile_img,cover_img){
    const isok = await pool.query(
        `
        INSERT INTO Canteen (name,profile_img,cover_img) VALUES (?,?,?)
        `,[name,profile_img,cover_img]
    );
    if(isok){
        return true;
    }
    return false;
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