const express = require("express");
const router = express.Router();
const { buscarAutoresController, criarAutorController, buscarAutorPorIdController } = require("../controllers/autorController.js");
const validarId = require("../middleware/validarId.js");

router.get("/autores", buscarAutoresController);
router.post("/autores", criarAutorController);
router.get("/autores/:id", validarId, buscarAutorPorIdController);

module.exports = router;