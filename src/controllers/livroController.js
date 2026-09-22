const livroService = require("../services/livroService.js");

async function buscarLivrosController(req, res) {
    const resultado = await livroService.buscaLivrosService();

    res.status(200).json(resultado);
};

async function buscarLivroPorIdController(req, res) {
    const id = req.params.id;
    const resultado = await livroService.buscaLivrosPorIdService(id);

    res.status(200).json(resultado);
};

async function criarLivroController(req, res) {
    const { titulo, autor_id, ano } = req.body;
    const resultado = await livroService.criarlivroService(titulo, autor_id, ano);

    res.status(201).json(resultado);
};

async function atualizarLivroController(req, res) {
    const id = req.params.id;
    const { titulo, autor_id, ano } = req.body;
    const resultado = await livroService.atualizarLivroService(id, titulo, autor_id, ano);

    res.status(200).json(resultado);
};

async function deletarLivroController(req, res) {
    const id = req.params.id;
    await livroService.deletarLivroService(id);

    res.status(200).send("Livro deletado com sucesso!");
};

async function emprestarLivroController(req, res) {
    const id = req.params.id;
    const resultado = await livroService.emprestarLivroService(id);

    res.status(200).json(resultado);
};

module.exports = {
    buscarLivrosController,
    buscarLivroPorIdController,
    criarLivroController,
    atualizarLivroController,
    deletarLivroController,
    emprestarLivroController,
};