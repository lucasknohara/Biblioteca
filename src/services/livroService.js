const livroModel = require("../models/livroModel.js");
const autorModel = require("../models/autorModel.js");

async function buscaLivrosService() {
    const resultado = await livroModel.buscarLivros();

    return resultado;
};

async function buscaLivrosPorIdService(id) {
    const resultado = await livroModel.buscarLivroPorId(id);

    if (resultado.length === 0) {
        return "Livro não encontrado!";
    }

    return resultado;
};

async function criarlivroService(titulo, autor_id, ano) {
    const data = new Date();

    if (typeof titulo !== "string" || titulo.trim().length <= 0) {
        return "Titulo inválido!";
    }

    if (typeof autor_id !== "number" || !Number.isInteger(autor_id)) {
        return "Autor inválido!";
    }

    if (typeof ano !== "number" || ano < 1000 || ano > data.getFullYear() || !Number.isInteger(ano)) {
        return "Ano inválido!";
    }

    const busca = await autorModel.buscarAutorPorId(autor_id);

    if (busca.length === 0) {
        return "Autor não encontrado!";
    }

    const resultado = await livroModel.criarLivro(titulo, autor_id, ano)

    if (resultado.affectedRows === 1) {
        return resultado;
    }

    return "Livro não criado!";
};

async function atualizarLivroService(id, titulo, autor_id, ano) {
    const data = new Date();
    const busca = await livroModel.buscarLivroPorId(id);

    if (busca.length === 0) {
        return "Livro não encontrado!"
    }

    const livro = busca[0];

    const novoTitulo = titulo ?? livro.titulo;
    const novoAutor = autor_id ?? livro.autor_id;
    const novoAno = ano ?? livro.ano;

    if (typeof novoTitulo !== "string" || novoTitulo.trim().length <= 0) {
        return "Titulo inválido!";
    }

    if (typeof novoAutor !== "number" || !Number.isInteger(novoAutor) || novoAutor <= 0) {
        return "Autor inválido!";
    }

    if (typeof novoAno !== "number" || novoAno < 1000 || novoAno > data.getFullYear() || !Number.isInteger(novoAno)) {
        return "Ano inválido!";
    }

    if (verificaAutor.length === 0) {
        return "Autor não encontrado!";
    };

    const verificaAutor = await autorModel.buscarAutorPorId(novoAutor);

    const resultado = await livroModel.atualizarLivro(id, novoTitulo, novoAutor, novoAno);

    return resultado;
};

async function deletarLivroService(id) {
    const resultado = await livroModel.deletarLivro(id);

    if (resultado.affectedRows === 0) {
        return "Livro não encontrado!";
    }

    return resultado;
};

async function emprestarLivroService(id) {
    let busca = await livroModel.buscarLivroPorId(id);

    if (busca.length === 0) {
        return "Livro não existe!";
    }

    const disponivel = busca[0].disponivel;

    if (disponivel === false) {
        return "Livro não disponivel!";
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