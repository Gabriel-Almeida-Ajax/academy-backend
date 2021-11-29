const professor = require("../models/professor.js");
const validator = require("validator");
const express = require('express');
const auth = require('../../utils/authentication');

module.exports = (app) => {
    const professorR = express.Router();
    
    professorR.use(auth.withPassAuth);

    // OK: Testes de funcionamento
    // OK: Metodos de funcionamento
    professorR.get("/listAlunos", (req, res) => {
        professor.listAlunos(res);
    });

    // OK: Testes de funcionamento
    professorR.post("/createAluno", (req, res) => {
        const data = req.body;

        professor.createAluno(data, res);
    });

    // OK: Testes de funcionamento
    // OK: Metodos de funcionamento
    professorR.post("/createTreino", (req, res) => {
        const data = req.body;

        professor.createTreino(data, res);
    });

    // OK: Testes de funcionamento
    // OK: Metodos de funcionamento
    professorR.delete("/deleteAluno/:id", (req, res) => {
        const id = req.params.id;
        
        professor.deleteAluno(id, res);
    });

    // OK: Testes de funcionamento
    // OK: Metodos de funcionamento
    professorR.patch("/editAluno/:id", (req, res) => {
        const id = req.params.id;
        const data = req.body;
        
        professor.editAluno(id, data, res);
    });

    app.use('/professor', professorR);

}