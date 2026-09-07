const connection = require("../config/database.js");

async function buscarLivros() {
    const [resultado] = await connection.query("SELECT * FROM livros")

    return resultado;
};

async function buscarLivroPorId(id) {
    const [resultado] = await connection.query("SELECT * FROM livros WHERE id = ?", [id]);

    return resultado;
};

module.exports = {
    buscarLivros,
    buscarLivroPorId,
};