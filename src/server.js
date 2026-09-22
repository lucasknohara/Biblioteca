const express = require("express");
const livroRouters = require("./routers/livroRoutes.js");
const autorRouters = require("./routers/autorRoutes.js");
const app = express();
const PORT = 3001;
const errorHandler = require("./middleware/errorHandler.js");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Olá, Mundo!");
});

app.use(livroRouters);
app.use(autorRouters);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Rodando!");
});