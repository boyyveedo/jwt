const express = require('express')
const connectDB = require('./db/connect')
const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')
const users = require('./routes/users')
const authLogin = require('./middleware/auth')
require('dotenv').config()
require('express-async-errors')

const app = express()



app.use(express.json())
app.use(express.static('./public'))




app.use('/api/v1/user/dashboard', authLogin, users);
app.use('/api/v1/user', users)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 9000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`server is running on PORT:${PORT}`);
            console.log("connected successfully");
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();