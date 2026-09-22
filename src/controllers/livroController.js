const livroService = require("../services/livroService.js");

async function buscarLivrosController(req, res) {
    try {
        const resultado = await livroService.buscaLivrosService();

        res.status(200).json(resultado);
    } catch (error) {
        console.log(error.message);
        res.status(error.status ?? 500).json({
            error: error.message
        });
    }
};

async function buscarLivroPorIdController(req, res) {
    try {
        const id = req.params.id;
        const resultado = await livroService.buscaLivrosPorIdService(id);

        res.status(200).json(resultado);
    } catch (error) {
        console.log(error.message);
        res.status(error.status ?? 500).json({
            error: error.message
        });
    }
};

async function criarLivroController(req, res) {
    try {
        const { titulo, autor_id, ano } = req.body;
        const resultado = await livroService.criarlivroService(titulo, autor_id, ano);

        res.status(201).json(resultado);
    } catch (error) {
        console.log(error.message);
        res.status(error.status ?? 500).json({
            error: error.message
        });
    }
};

async function atualizarLivroController(req, res) {
    try {
        const id = req.params.id;
        const { titulo, autor_id, ano } = req.body;
        const resultado = await livroService.atualizarLivroService(id, titulo, autor_id, ano);

        res.status(200).json(resultado);
    } catch (error) {
        console.log(error.message);
        res.status(error.status ?? 500).json({
            error: error.message
        });
    }
};

async function deletarLivroController(req, res) {
    try {
        const id = req.params.id;
        await livroService.deletarLivroService(id);

        res.status(200).send("Livro deletado com sucesso!");
    } catch (error) {
        console.log(error.message);
        res.status(error.status ?? 500).json({
            error: error.message
        });
    }
};

async function emprestarLivroController(req, res) {
    try {
        const id = req.params.id;
        const resultado = await livroService.emprestarLivroService(id);

        res.status(200).json(resultado);
    } catch (error) {
        console.log(error.message);
        res.status(error.status ?? 500).json({
            error: error.message
        });
    }
};

module.exports = {
    buscarLivrosController,
    buscarLivroPorIdController,
    criarLivroController,
    atualizarLivroController,
    deletarLivroController,
    emprestarLivroController,
};