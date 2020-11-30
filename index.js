const express = require('express')
const connectDB = require('./config/db')

const app = express()
connectDB()

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use('/', require('./routes/index'))
app.use('/api/url', require('./routes/url'))

const PORT = 5000

app.listen(PORT, () => console.log(`SERVER RUNNING ON ${PORT}`))