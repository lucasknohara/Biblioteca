const connection = require("../config/database.js");

async function buscarLivros() {
    const [resultado] = await connection.query(
        "SELECT livros.id, livros.titulo, autores.nome AS autor, livros.ano, livros.disponivel FROM livros JOIN autores ON livros.autor_id = autores.id"
    );

    return resultado;
};

async function buscarLivroPorId(id) {
    const [resultado] = await connection.query(
        "SELECT livros.id, livros.titulo, autores.nome AS autor, livros.ano, livros.autor_id, livros.disponivel FROM livros JOIN autores ON livros.autor_id = autores.id WHERE livros.id = ?", [id]
    );

    return resultado;
};

async function criarLivro(titulo, autor, ano) {
    const [resultado] = await connection.query("INSERT INTO livros (titulo, autor_id, ano) VALUES (?, ?, ?)", [titulo, autor, ano]);

    return resultado;
};

async function atualizarLivro(id, titulo, autor_id, ano) {
    const [resultado] = await connection.query("UPDATE livros SET titulo = ?, autor_id = ?, ano = ? WHERE id = ?", [titulo, autor_id, ano, id]);

    return resultado;
};

async function deletarLivro(id) {
    const [resultado] = await connection.query("DELETE FROM livros WHERE id = ?", [id]);

    return resultado;
};

async function emprestarLivro(id) {
    const [resultado] = await connection.query("UPDATE livros SET disponivel = false WHERE id = ?", [id]);

    return resultado;
};

module.exports = {
    buscarLivros,
    buscarLivroPorId,
    criarLivro,
    atualizarLivro,
    deletarLivro,
    emprestarLivro,
};