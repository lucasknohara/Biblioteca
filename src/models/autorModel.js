const connection = require("../config/database.js");

async function buscarAutores(nome) {
    let sql = "SELECT * FROM autores";
    const valores = [];

    if (nome !== undefined) {
        sql += " WHERE nome = ?";
        valores.push(nome);
    }

    const [resultado] = await connection.query(sql, [valores]);

    return resultado;
};

async function criarAutor(nome) {
    const [resultado] = await connection.query("INSERT INTO autores (nome) VALUES (?)", [nome]);

    return resultado;
};

async function buscarAutorPorId(id) {
    const [resultado] = await connection.query("SELECT * FROM autores WHERE autores.id = ?", [id]);

    return resultado;
};

module.exports = {
    buscarAutores,
    criarAutor,
    buscarAutorPorId,
};