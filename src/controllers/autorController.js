const autorModel = require("../models/autorModel.js");

async function buscarAutoresController(req, res) {
    try {
        const resultado = await autorModel.buscarAutores();


        res.status(200).json(resultado);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Erro ao buscar autores!"
        });
    }
};

async function criarAutorController(req, res) {
    try {
        const { nome } = req.body;

        if (typeof nome !== "string" || nome.trim().length <= 0) {
            res.status(400).send("Nome inválido!");
            return;
        }

        const resultado = await autorModel.criarAutor(nome);

        if (resultado.affectedRows === 1) {
            res.status(201).json(resultado);
            return;
        }

        res.status(500).send("Erro na criação!");
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Erro na criação!"
        });
    }
};

async function buscarAutorPorIdController(req, res) {
    try {
        const id = req.params.id;
        const resultado = await autorModel.buscarAutorPorId(id);

        if (resultado.length === 0) {
            res.status(404).send("Autor não encontrado!");
            return;
        }

        res.status(200).json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Erro ao buscar autor!"
        });
    }
};

module.exports = {
    buscarAutoresController,
    criarAutorController,
    buscarAutorPorIdController,
};