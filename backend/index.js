import express from "express";
import authRoutes from "./routes/auth.routes.js"
import connection from "./db/connection.js";
import cookieParser from "cookie-parser";
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth",authRoutes);

app.listen(3000,()=>{
    console.log("server listening on port 3000");
    connection();
})