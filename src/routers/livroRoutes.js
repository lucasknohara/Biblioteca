const express = require("express");
const router = express.Router();
const { buscarLivrosController, buscarLivroPorIdController, criarLivroController, atualizarLivroController, deletarLivroController, emprestarLivroController, devolverLivroController, buscarHistoricoEmprestimosController } = require("../controllers/livroController");
const validarId = require("../middleware/validarId.js");

router.get("/livros/historico-emprestimos", buscarHistoricoEmprestimosController);
router.get("/livros", buscarLivrosController);
router.get("/livros/:id", validarId, buscarLivroPorIdController);
router.post("/livros", criarLivroController);
router.put("/livros/:id", validarId, atualizarLivroController);
router.delete("/livros/:id", validarId, deletarLivroController);
router.put("/livros/:id/emprestar", validarId, emprestarLivroController);
router.post("/livros/:id/devolver", validarId, devolverLivroController);

module.exports = router;