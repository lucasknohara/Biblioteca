const livroModel = require("../models/livroModel.js");

async function buscarLivrosController(req, res) {
    try {
        const resultado = await livroModel.buscarLivros();

        res.status(200).json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            erro: "Erro ao buscar livros!"
        });
    }
};

async function buscarLivroPorIdController(req, res) {
    try {
        const id = req.params.id;
        const resultado = await livroModel.buscarLivroPorId(id);

        if (resultado.length === 0) {
            res.status(404).send("Livro não encontrado!");
            return;
        }

        res.status(200).json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            erro: "Erro ao buscar livro!"
        });
    }
};

module.exports = {
    buscarLivrosController,
    buscarLivroPorIdController,
};