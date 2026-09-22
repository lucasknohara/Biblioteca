const livroModel = require("../models/livroModel.js");
const autorModel = require("../models/autorModel.js");
const AppError = require("../errors/AppError.js");

async function buscaLivrosService() {
    const resultado = await livroModel.buscarLivros();

    return resultado;
};

async function buscaLivrosPorIdService(id) {
    const resultado = await livroModel.buscarLivroPorId(id);

    if (resultado.length === 0) {
        throw new AppError("Livro não encontrado!", 404);
    }

    return resultado;
};

async function criarlivroService(titulo, autor_id, ano) {
    const data = new Date();

    if (typeof titulo !== "string" || titulo.trim().length <= 0) {
        throw new AppError("Titulo inválido!", 400);
    }

    if (typeof autor_id !== "number" || !Number.isInteger(autor_id)) {
        throw new AppError("Autor inválido!", 400);
    }

    if (typeof ano !== "number" || ano < 1000 || ano > data.getFullYear() || !Number.isInteger(ano)) {
        throw new AppError("Ano inválido!", 400);
    }

    const busca = await autorModel.buscarAutorPorId(autor_id);

    if (busca.length === 0) {
        throw new AppError("Autor não encontrado!", 404);
    }

    const resultado = await livroModel.criarLivro(titulo, autor_id, ano)

    if (resultado.affectedRows === 1) {
        return resultado;
    }

    throw new AppError("Livro não criado!", 500);
};

async function atualizarLivroService(id, titulo, autor_id, ano) {
    const data = new Date();
    const busca = await livroModel.buscarLivroPorId(id);

    if (busca.length === 0) {
        throw new AppError("Livro não encontrado!", 404);
    }

    const livro = busca[0];

    const novoTitulo = titulo ?? livro.titulo;
    const novoAutor = autor_id ?? livro.autor_id;
    const novoAno = ano ?? livro.ano;

    if (typeof novoTitulo !== "string" || novoTitulo.trim().length <= 0) {
        throw new AppError("Titulo inválido!", 400);
    }

    if (typeof novoAutor !== "number" || !Number.isInteger(novoAutor) || novoAutor <= 0) {
        throw new AppError("Autor inválido!", 400);
    }

    if (typeof novoAno !== "number" || novoAno < 1000 || novoAno > data.getFullYear() || !Number.isInteger(novoAno)) {
        throw new AppError("Ano inválido", 400);
    }

    const verificaAutor = await autorModel.buscarAutorPorId(novoAutor);

    if (verificaAutor.length === 0) {
        throw new AppError("Autor não encontrado!", 404);
    };

    const resultado = await livroModel.atualizarLivro(id, novoTitulo, novoAutor, novoAno);

    if (resultado.affectedRows === 1) {
        return resultado;
    }

    throw new AppError("Livro não atualizado!", 500);
};

async function deletarLivroService(id) {
    const resultado = await livroModel.deletarLivro(id);

    if (resultado.affectedRows === 0) {
        throw new AppError("Livro não encontrado!", 404);
    }

    return resultado;
};

async function emprestarLivroService(id) {
    let busca = await livroModel.buscarLivroPorId(id);

    if (busca.length === 0) {
        throw new AppError("Livro não encontrado!", 404);
    }

    const disponivel = busca[0].disponivel;

    if (disponivel === false) {
        throw new AppError("Livro indisponivel!", 409)
    }

    const resultado = await livroModel.emprestarLivro(id);

    return resultado;
};

module.exports = {
    emprestarLivroService,
    buscaLivrosService,
    buscaLivrosPorIdService,
    criarlivroService,
    atualizarLivroService,
    deletarLivroService,
};