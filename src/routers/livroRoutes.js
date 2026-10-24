const express = require("express");
const router = express.Router();
const { buscarLivrosController, buscarLivroPorIdController, criarLivroController, atualizarLivroController, deletarLivroController, emprestarLivroController, devolverLivroController, buscarHistoricoEmprestimosController } = require("../controllers/livroController");
const validarId = require("../middleware/validarId.js");
const { autenticarUsuario } = require("../middleware/authMiddleware.js");
const { autorizarPerfil } = require("../middleware/autorizarPerfil.js");

router.get("/livros/historico-emprestimos", buscarHistoricoEmprestimosController);
router.get("/livros", buscarLivrosController);
router.get("/livros/:id", validarId, buscarLivroPorIdController);
router.post("/livros", autenticarUsuario, autorizarPerfil("admin"), criarLivroController);
router.put("/livros/:id", autenticarUsuario, autorizarPerfil("admin"), validarId, atualizarLivroController);
router.delete("/livros/:id", autenticarUsuario, autorizarPerfil("admin"), validarId, deletarLivroController);
router.put("/livros/:id/emprestar", autenticarUsuario, validarId, emprestarLivroController);
router.post("/livros/:id/devolver", autenticarUsuario, validarId, devolverLivroController);

module.exports = router;