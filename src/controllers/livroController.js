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

async function criarLivroController(req, res) {
    try {
        const { titulo, autor, ano } = req.body;

        if (typeof titulo !== "string" || titulo.trim().length <= 0) {
            res.status(400).send("Titulo inválido!");
            return;
        }

        if (typeof autor !== "string" || autor.trim().length <= 0) {
            res.status(400).send("Autor inválido!");
            return;
        }

        if (typeof ano !== "number" || ano < 1000) {
            res.status(400).send("Ano inválido!");
            return;
        }

        const resultado = await livroModel.criarLivro(titulo, autor, ano);

        if (resultado.affectedRows === 1) {
            res.status(201).json(resultado);
            return;
        }

        res.status(500).send("Erro na criação!");
    } catch (error) {
        console.log(error);
        res.status(500).json({
            erro: "Erro ao criar Livro!"
        });
    }
};

module.exports = {
    buscarLivrosController,
    buscarLivroPorIdController,
    criarLivroController,
};