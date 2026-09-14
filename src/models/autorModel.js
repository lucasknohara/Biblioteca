const connection = require("../config/database.js");

async function buscarAutores() {
    const [resultado] = await connection.query("SELECT * FROM autores");

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