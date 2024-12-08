const express = require("express")
const connectDatabase = require("./config/database.js")
const taskRoutes = require('./routes/taskRoutes.js');
const userRoute = require("./routes/userRoutes.js")
const errorHandler = require('./middlewares/errorHandler.js');
require('dotenv').config();


const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(express.json());

//connect to DB
connectDatabase()

//api Endpoints
app.use('/tasks', taskRoutes);
app.use("/users",userRoute)



// Error Handling Middleware
app.use(errorHandler);

app.listen(port,()=>console.log(`http://localhost:${port}`))