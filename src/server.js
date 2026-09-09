const express = require("express");
const livroRouters = require("./routers/livroRoutes.js");
const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Olá, Mundo!");
});

app.use(livroRouters);

app.listen(PORT, () => {
    console.log("Rodando!");
});