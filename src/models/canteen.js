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