const express = require("express");
const router = express.Router();
const { buscarLivrosController, buscarLivroPorIdController } = require("../controllers/livroController");

router.get("/livros", buscarLivrosController);
router.get("/livros/:id", buscarLivroPorIdController);

module.exports = router;