const express = require("express");
const router = express.Router();
const { buscarAutoresController, criarAutorController, buscarAutorPorIdController } = require("../controllers/autorController.js");

router.get("/autores", buscarAutoresController);
router.post("/autores", criarAutorController);
router.get("/autores/:id", buscarAutorPorIdController);

module.exports = router;