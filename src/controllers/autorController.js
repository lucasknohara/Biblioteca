const autorService = require("../services/autorService.js");

async function buscarAutoresController(req, res) {
    const resultado = await autorService.buscarAutoresService();

    res.status(200).json(resultado);
};

async function criarAutorController(req, res) {
    const { nome } = req.body;
    const resultado = await autorService.criarAutorService(nome);

    res.status(201).send(resultado);
};

async function buscarAutorPorIdController(req, res) {
    const id = req.params.id;
    const resultado = await autorService.buscaAutorPorIdService(id);

    res.status(200).json(resultado);
};

module.exports = {
    buscarAutoresController,
    criarAutorController,
    buscarAutorPorIdController,
};