const express = require("express");
const router = express.Router();
const { buscarLivrosController, buscarLivroPorIdController, criarLivroController, atualizarLivroController, deletarLivroController, emprestarLivroController } = require("../controllers/livroController");
const validarId = require("../middleware/validarId.js");

router.get("/livros", buscarLivrosController);
router.get("/livros/:id", buscarLivroPorIdController);
router.post("/livros", criarLivroController);
router.put("/livros/:id", atualizarLivroController);
router.delete("/livros/:id", deletarLivroController);
router.put("/livros/:id/emprestar", emprestarLivroController);

module.exports = router;