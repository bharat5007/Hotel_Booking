const connectDB=require("../config/db");

async function getuserbyemail(email) {
    const connection = await connectDB();
    const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    await connection.end();
    return rows[0];
  }
  
  async function adduser(user) {
    const connection = await connectDB();
    const x=await getuserbyemail(user.email);
    if(x){
        await connection.end();
        return -1;
    }
    const result = await connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, user.password]);
    await connection.end();
    return result[0];
  }
  
module.exports={
    getuserbyemail,
    adduser,
}