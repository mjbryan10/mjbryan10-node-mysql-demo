const express = require ('express');
const mysql = require ('mysql');

const dotenv = require('dotenv');
dotenv.config(); 

const app = express();

const db = mysql.createConnection({
   host: 'localhost',
   user: process.env.USER,
   password: process.env.PASSWORD,
   database: 'acme'
})

db.connect();
app.get('/users', (req, res) => {
   //Fetches full list of users.
   const sql = 'SELECT * FROM users';

   db.query(sql, (err, result) => {
      if(err) throw err;
      res.send(result);
   })
});
app.get('/comments', (req, res) => {
   //Fetches comments joined with the users name and the post it is related to.
   const sql = `SELECT
   comments.body,
   posts.title,
   users.first_name,
   users.last_name
   FROM comments
   INNER JOIN posts on posts.id = comments.post_id
   INNER JOIN users on users.id = comments.user_id
   ORDER BY posts.title`;

   db.query(sql, (err, result) => {
      if(err) throw err;
      res.send(result);
   })
});


const port = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Server is running on port ${port}`));