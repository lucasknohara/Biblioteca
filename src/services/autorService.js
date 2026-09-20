const autorModel = require("../models/autorModel.js");

async function buscarAutoresService() {
    const resultado = await autorModel.buscarAutores();

    return resultado;
};

async function criarAutorService(nome) {
    if (typeof nome !== "string" || nome.trim().length === 0) {
        return "Nome inválido!";
    };

    const resultado = await autorModel.criarAutor(nome);

    if (resultado.affectedRows === 1) {
        return resultado;
    };

    return "Autor não criado!";
};
async function buscaAutorPorIdService(id) {
    const resultado = await autorModel.buscarAutorPorId(id);

    if (resultado.length === 0) {
        return "Autor não encontrado!";
    }

    return resultado;
};

module.exports = {
    buscarAutoresService,
    criarAutorService,
    buscaAutorPorIdService,
};