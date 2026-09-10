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
        const data = new Date();

        if (typeof titulo !== "string" || titulo.trim().length <= 0) {
            res.status(400).send("Titulo inválido!");
            return;
        }

        if (typeof autor !== "string" || autor.trim().length <= 0) {
            res.status(400).send("Autor inválido!");
            return;
        }

        if (typeof ano !== "number" || ano < 1000 || ano > data.getFullYear() || !Number.isInteger(ano)) {
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

async function atualizarLivroController(req, res) {
    try {
        const id = req.params.id;
        const { titulo, autor, ano } = req.body;
        const data = new Date();

        const busca = await livroModel.buscarLivroPorId(id);

        if (busca.length === 0) {
            res.status(404).send("Livro não encontrado!");
            return;
        }

        const livro = busca[0];

        const novoTitulo = titulo ?? livro.titulo;
        const novoAutor = autor ?? livro.autor;
        const novoAno = ano ?? livro.ano;

        if (typeof novoTitulo !== "string" || novoTitulo.trim().length <= 0) {
            res.status(400).send("Titulo inválido!");
            return;
        }

        if (typeof novoAutor !== "string" || novoAutor.trim().length <= 0) {
            res.status(400).send("autor inválido!");
            return;
        }

        if (typeof novoAno !== "number" || novoAno < 1000 || novoAno > data.getFullYear() || !Number.isInteger(novoAno)) {
            res.status(400).send("Ano inválido!");
            return;
        }

        const resultado = await livroModel.atualizarLivro(id, novoTitulo, novoAutor, novoAno);

        res.status(200).json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            erro: "Erro ao atualizar livro!"
        });
    }
};

async function deletarLivroController(req, res) {
    try {
        const id = req.params.id;
        const resultado = await livroModel.deletarLivro(id);

        if (resultado.affectedRows === 0) {
            res.status(404).send("Livro não encontrado!");
            return;
        }
        
        res.status(200).send("Livro deletado com sucesso!");
    } catch (error) {
        console.log(error);
        res.status(500).json({
            erro: "Erro ao deletar livro!"
        });
    }
};

module.exports = {
    buscarLivrosController,
    buscarLivroPorIdController,
    criarLivroController,
    atualizarLivroController,
    deletarLivroController,
};