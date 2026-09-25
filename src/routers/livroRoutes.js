const express = require("express");
const router = express.Router();
const { buscarLivrosController, buscarLivroPorIdController, criarLivroController, atualizarLivroController, deletarLivroController, emprestarLivroController } = require("../controllers/livroController");
const validarId = require("../middleware/validarId.js");

router.get("/livros", buscarLivrosController);
router.get("/livros/:id", validarId, buscarLivroPorIdController);
router.post("/livros", criarLivroController);
router.put("/livros/:id", validarId, atualizarLivroController);
router.delete("/livros/:id", validarId, deletarLivroController);
router.put("/livros/:id/emprestar", validarId, emprestarLivroController);

module.exports = router;