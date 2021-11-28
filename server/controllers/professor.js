const professor = require("../models/professor.js");
const validator = require("validator");

module.exports = (app) => {

    // OK: Testes de funcionamento
    // OK: Metodos de funcionamento
    app.get("/listAlunos", (req, res) => {
        professor.listAlunos(req, res);
    });

    // OK: Testes de funcionamento
    app.post("/createAluno", (req, res) => {
        const data = req.body;
        const authenticated = req.cookies['academy-authenticated']
        professor.createAluno(data, authenticated, res);
    });

    // OK: Testes de funcionamento
    // OK: Metodos de funcionamento
    app.post("/createTreino", (req, res) => {
        const data = req.body;

        professor.createTreino(data, req, res);
    });

    // OK: Testes de funcionamento
    // OK: Metodos de funcionamento
    app.delete("/deleteAluno/:id", (req, res) => {
        const id = req.params.id;
        
        professor.deleteAluno(id, req, res);
    });

    // OK: Testes de funcionamento
    // OK: Metodos de funcionamento
    app.patch("/editAluno/:id", (req, res) => {
        const id = req.params.id;
        const data = req.body;
        
        professor.editAluno(id, data, req, res);
    });

}