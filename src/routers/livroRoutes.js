const express = require("express");
const router = express.Router();
const { buscarLivrosController, buscarLivroPorIdController, criarLivroController, atualizarLivroController, deletarLivroController } = require("../controllers/livroController");

router.get("/livros", buscarLivrosController);
router.get("/livros/:id", buscarLivroPorIdController);
router.post("/livros", criarLivroController);
router.put("/livros/:id", atualizarLivroController);
router.delete("/livros/:id", deletarLivroController);

module.exports = router;