const connection = require("../config/database.js");

async function buscarLivros(ano, autor_id) {
    let sql = "SELECT * FROM livros";
    let valores = [];

    if (ano !== undefined && autor_id !== undefined) {
        sql += " WHERE ano = ? AND autor_id = ?";
        valores.push(ano);
        valores.push(autor_id);
    }else if (ano !== undefined) {
        sql += " WHERE ano = ?";
        valores.push(ano);
    }else if (autor_id !== undefined) {
        sql += " WHERE autor_id = ?";
        valores.push(autor_id);
    }

    const [resultado] = await connection.query(sql, valores);

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