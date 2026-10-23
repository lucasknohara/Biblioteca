const express = require("express");
const livroRouters = require("./routers/livroRoutes.js");
const autorRouters = require("./routers/autorRoutes.js");
const usuarioRouters = require("./routers/usuarioRoutes.js");
const app = express();
const PORT = 3001;
const errorHandler = require("./middleware/errorHandler.js");
const logMiddleware = require("./middleware/logMiddleware.js");

app.use(express.json());

app.use(logMiddleware);
app.use(livroRouters);
app.use(autorRouters);
app.use("/usuarios", usuarioRouters);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Rodando!");
});