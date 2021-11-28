const user = require("../models/alunos.js");

module.exports = (app) => {

    // OK: Testes de funcionamento
    // OK: Metodos de funcionamento
    app.get("/treinosAluno/:id", (req, res) => {
        const id = req.params.id;

        user.treinosAluno(id, req, res);
    });

}