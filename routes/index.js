import express from "express";
import controller from "../controllers/index.js";

const app = express.Router();

app.use(controller);
app.get('/', (req, res)=>{
    res.render('index', { pretty: true });
});

export default app;