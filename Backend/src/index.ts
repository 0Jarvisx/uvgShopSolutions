require("dotenv").config({
    path: "./.ENV",
});

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
/* IMPORT DE TODAS LAS RUTAS */

import brandRoutes from './routes/brand.routes';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.routes';
import statusRoutes from './routes/status.routes';
import contactRoutes from './routes/contact.routes'
import orderRoutes from './routes/order.routes';

import { authMiddleware } from "./adapters/middlewares/autentication.middleware";
/*  --------------------------------Esto no debe ir aqui - TEMPORAL----------------------------------------------  */
const mongoose = require("mongoose");
let db = null;
const urlDB =
    process.env.URLDATABASE || "mongodb://127.0.0.1:27017/DB_Ecommerce";
async function conectDB() {
    try {
        db = await mongoose.connect(urlDB);
        console.log(
            "conectado a la base de datos ",
            db.connection.db.databaseName
        );
    } catch (error) {
        console.error(error);
    }
}
conectDB();
/* ---------------------------------------------------------------------------------------------------------------- */

app.use(express.json());
/* Middlewares */
app.use(authMiddleware);

/* ROUTES */

app.use('/user', userRoutes);
app.use('/products', productRoutes);
app.use('/brand', brandRoutes);
app.use('/categories', categoryRoutes);
app.use('/status', statusRoutes);
app.use('/contact', contactRoutes)
app.use('/order', orderRoutes)


app.get('/', (_:any, res: any) => {

    res.status(200).json({
        ok: true,
        message: "HOLA DESDE DE EL BACKEND",
    });
});

/* Listen in port */
app.listen(port, () => {
    console.log(`Listening in port: http://localhost: ${port}`);
});
