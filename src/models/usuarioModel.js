const connection = require("../config/database.js");

async function criarUsuario(nome, email, senhaHash) {
    const [resultado] = await connection.query("INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)", [nome, email, senhaHash]);

    return resultado;
};

module.exports = {
    criarUsuario,
};