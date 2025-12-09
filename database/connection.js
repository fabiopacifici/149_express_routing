const mysql2 = require('mysql2')

const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: '149_pizzeria_db'
})



connection.connect((err)=>{
  if(err) throw err.message
  console.log('DB Connection successful!');
})


module.exports = connection