const express = require('express');
const dotenv = require('dotenv').config();
const connDB = require("./db/db");
const app = express();
const port = 5000;

connDB();

app.use(express.json())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/',(req, res) => {
  res.status(200).json({message: "hellow from the server"})
})

app.use('/users', require('./routes/userRoutes'))
app.use('/students', require('./routes/booksRoutes'))



app.listen(port, () => console.log(`server stated on port ${port}`)); 