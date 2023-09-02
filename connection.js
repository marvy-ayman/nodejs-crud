// connect to db
// to read .env file
require('dotenv').config();
//import mysql
const mysql = require('mysql');



const connection = mysql.createConnection({
    port:process.env.DATABASE_PORT,
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USERNAME,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE_NAME
});

//check connection
connection.connect((err)=>{
  if(!err){
      console.log('connected to db successfully!!!')
  }else{
      console.log('error in connect try again!!')
      console.log(err);
  }
});

module.exports=connection;