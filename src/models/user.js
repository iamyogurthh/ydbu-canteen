import pool from "@/database/database";

export async function getUserByPhone(phone){
    const [user] = await pool.query(`
    SELECT * FROM User WHERE ph_no=?
    `,[phone])
    return user[0];
}
