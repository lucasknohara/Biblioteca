const connection = require("../config/database.js");

async function buscarLivros() {
    const [resultado] = await connection.query("SELECT * FROM livros")

    return resultado;
};

async function buscarLivroPorId(id) {
    const [resultado] = await connection.query("SELECT * FROM livros WHERE id = ?", [id]);

    return resultado;
};

async function criarLivro(titulo, autor, ano) {
    const [resultado] = await connection.query("INSERT INTO livros (titulo, autor, ano) VALUES (?, ?, ?)", [titulo, autor, ano]);

    return resultado;
};

async function atualizarLivro(id, titulo, autor, ano) {
    const [resultado] = await connection.query("UPDATE livros SET titulo = ?, autor = ?, ano = ? WHERE id = ?", [titulo, autor, ano, id]);

    return resultado;
};

async function deletarLivro(id) {
    const [resultado] = await connection.query("DELETE FROM livros WHERE id = ?", [id]);

    return resultado;
};

module.exports = {
    buscarLivros,
    buscarLivroPorId,
    criarLivro,
    atualizarLivro,
    deletarLivro,
};