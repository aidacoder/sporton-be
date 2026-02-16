import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth-routes"
import categoryRoutes from "./routes/category.routes"
import ProductRoutes from "./routes/product.routes"
import bankRoutes from "./routes/bank.router"
import transactionRoutes from "./routes/transaction.router"
import { authenticate } from "./midllewares/auth.midllewares";
import path from "path";

const app =express();

app.use(cors());
app .use(express.json({limit:"10mb"}));
app.use(express.urlencoded({limit:"10mb",extended:true}));
app.use("./uploads",express.static(path.join(__dirname,"../uploads")))


app.use("/api/auth",authRoutes)
app.use("/api/categories",categoryRoutes)
app.use("/api/products",ProductRoutes)
app.use("/api/banks",bankRoutes)
app.use("/api/transaction",transactionRoutes)
app.get("/",(req,res)=>{
    res.send("sporton backend Api is running");
});


app.get("/test-middleware", authenticate,(req,res)=>{
    res.send("enpoint ini tidak bisa di akses pulic")
})

export default app;