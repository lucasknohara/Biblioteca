const livroService = require("../services/livroService.js");

async function buscarLivrosController(req, res) {
    try {
        const resultado = await livroService.buscaLivrosService();

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
        const resultado = await livroService.buscaLivrosPorIdService(id);

        if (resultado === "Livro não encontrado!") {
            res.status(404).send("Livro não encontrado!");
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
        const { titulo, autor_id, ano } = req.body;
        const resultado = await livroService.criarlivroService(titulo, autor_id, ano);

        if (resultado === "Titulo inválido!" || resultado === "Autor inválido!" || resultado === "Ano inválido!") {
            res.status(400).send("Informações inválidas!");
        }

        if (resultado === "Autor não encontrado!") {
            res.status(404).send("Autor não encontrado!");
        }

        res.status(201).json(resultado);
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
        const { titulo, autor_id, ano } = req.body;
        const resultado = await livroService.atualizarLivroService(id, titulo, autor_id, ano);

        if (resultado === "Livro não encontrado!") {
            res.status(404).send("Livro não encontrado!");
        }

        if (resultado === "Titulo inválido!" || resultado === "Autor inválido!" || resultado === "Ano inválido!" || resultado === "Autor não encontrado!") {
            res.status(400).send("Informações inválidas!");
        }

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

        if (resultado === "Livro não encontrado!") {
            res.status(404).send("Livro não encontrado!");
        }

        res.status(200).send("Livro deletado com sucesso!");
    } catch (error) {
        console.log(error);
        res.status(500).json({
            erro: "Erro ao deletar livro!"
        });
    }
};

async function emprestarLivroController(req, res) {
    try {
        const id = req.params.id;
        const resultado = await livroService.emprestarLivroService(id);

        if (resultado === "Livro não existe!") {
            res.status(404).send("Livro não existe!");
            return;
        }

        if (resultado === "Livro não disponivel!") {
            res.status(409).send("Livro não disponivel!");
            return;
        }

        res.status(200).json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Erro ao adquirir o livro!"
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