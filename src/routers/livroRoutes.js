const express = require("express");
const router = express.Router();
const { buscarLivrosController, buscarLivroPorIdController, criarLivroController } = require("../controllers/livroController");

router.get("/livros", buscarLivrosController);
router.get("/livros/:id", buscarLivroPorIdController);
router.post("/livros", criarLivroController);

module.exports = router;