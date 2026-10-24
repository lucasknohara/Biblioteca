const express = require("express");
const router = express.Router();
const { criarUsuarioController, loginUsuarioController, meuUsuarioController } = require("../controllers/usuarioController.js");
const { autenticarUsuario } = require("../middleware/authMiddleware.js");

router.post("/", criarUsuarioController);
router.post("/login", loginUsuarioController);
router.get("/me", autenticarUsuario, meuUsuarioController);

module.exports = router;