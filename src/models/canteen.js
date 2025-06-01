import pool from "@/database/database";

export async function getCanteenById(id){
    
}

export async function getCanteenByName(canteen_name){
    const [canteen] = await pool.query( 
        `
            SELECT * FROM Canteen WHERE name=?
        `,[canteen_name]
    );
    return canteen;
}

export async function getCanteens(){
    const [canteens] = await pool.query('SELECT id,name,profile_img FROM Canteen');
    return canteens;
}