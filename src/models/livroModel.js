const connection = require("../config/database.js");

function montarFiltros(ano, autor_id) {
    let where = "";
    const valores = [];

    if (ano !== undefined && autor_id !== undefined) {
        where = " WHERE ano = ? AND autor_id = ?";
        valores.push(ano, autor_id);
    } else if (ano !== undefined) {
        where = " WHERE ano = ?";
        valores.push(ano);
    } else if (autor_id !== undefined) {
        where = " WHERE autor_id = ?";
        valores.push(autor_id);
    }

    return {
        where,
        valores
    };
};

async function buscarLivros(ano, autor_id, ordem, limit, offset) {
    let sql = "SELECT * FROM livros";
    const filtros = montarFiltros(ano, autor_id);
    const valores = filtros.valores;

    sql += filtros.where;

    if (ordem !== undefined) {
        if (ordem === "asc") {
            sql += " ORDER BY ano ASC, id ASC";
        } else if (ordem === "desc") {
            sql += " ORDER BY ano DESC, id ASC";
        }
    } else {
        sql += " ORDER BY id ASC";
    }

    if (limit !== undefined && offset !== undefined) {
        sql += " LIMIT ? OFFSET ?";
        valores.push(limit, offset);
    } else if (limit !== undefined) {
        sql += " LIMIT ?";
        valores.push(limit);
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

async function contaLivros(ano, autor_id) {
    let sql = "SELECT COUNT(*) AS total FROM livros";
    const filtros = montarFiltros(ano, autor_id);
    const valores = filtros.valores;

    sql += filtros.where;

    const [resultado] = await connection.query(sql, valores);

    return resultado[0].total;
};

module.exports = {
    buscarLivros,
    buscarLivroPorId,
    criarLivro,
    atualizarLivro,
    deletarLivro,
    emprestarLivro,
    contaLivros,
};