import express from "express";
import router from "./router.js";
import env from "dotenv"
import connection from "./connection.js";

env.config()
const app=express()

app.use(express.static("front-end"))
app.use("/api",router)


connection().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server started at http://localhost:${process.env.PORT}`);
    })
}).catch((error)=>{
    console.log(error);
})
