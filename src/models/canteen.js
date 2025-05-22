import pool from "@/database/database";

export async function getCanteenById(id){
    
}

export async function getCanteens(){
    const [canteens] = await pool.query('SELECT id,name,profile_img FROM Canteen');
    return canteens;
}