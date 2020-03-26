const express = require ('express');
const mysql = require ('mysql');

const app = express();

const db = mysql.createConnection({
   host: 'localhost',
})

const port = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Server is running on port ${port}`));