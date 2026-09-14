const express = require("express");
const router = express.Router();
const { buscarAutoresController, criarAutorController } = require("../controllers/autorController.js");

router.get("/autores", buscarAutoresController);
router.post("/autores", criarAutorController);

module.exports = router;