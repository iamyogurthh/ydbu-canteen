import pool from "@/database/database";

export async function getUserByPhone(phone) {
    const [user] = await pool.query(`
    SELECT * FROM User WHERE ph_no=?
    `, [phone])
    return user[0];
}

export async function getUserById(id){
    const [user] = await pool.query(`
    SELECT * FROM User WHERE id=?
    `, [id])
    return user[0];
}

export async function createUser({
    ph_no,
    name,
    nrc,
    current_address,
    password, }) {
    const [result] = await pool.query(
        `
      INSERT INTO User (ph_no, name, nrc, current_address, password)
      VALUES (?, ?, ?, ?, ?)
      `,
        [ph_no, name, nrc, current_address, password]
    );

    return result.insertId;
}

export async function updateUser(id,ph_no,
    name,
    img,
    nrc,
    current_address,
    password){
        const isok = await pool.query(
            `
            UPDATE User SET
            img = ?,
            ph_no = ?,
            name = ?,
            nrc = ?,
            current_address = ?,
            password = ?
            WHERE id = ?;

            `,[img,ph_no,name,nrc,current_address,password,id]
        )
        if(isok){
            return true;
        }
        return false;
    }