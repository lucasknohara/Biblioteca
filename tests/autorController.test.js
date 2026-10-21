const test = require("node:test");
const assert = require("node:assert/strict");

const autorController = require("../src/controllers/autorController.js");
const autorService = require("../src/services/autorService.js");

test("deve buscar um autor pelo ID validado", async (t) => {
    const autorFicticio = [
        { id: 12, nome: "Machado de Assis" }
    ];

    let idRecebido;

    t.mock.method(
        autorService,
        "buscaAutorPorIdService",
        async (id) => {
            idRecebido = id;
            return autorFicticio;
        }
    );

    const res = {
        statusCode: null,
        dados: null,

        status(codigo) {
            this.statusCode = codigo;
            return this;
        },

        json(dados) {
            this.dados = dados;
            return this;
        }
    };

    await autorController.buscarAutorPorIdController(
        { idValidado: 12 },
        res
    );

    assert.equal(idRecebido, 12);
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.dados, autorFicticio);
});