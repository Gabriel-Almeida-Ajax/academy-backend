const user = require("../models/alunos.js");
const express = require('express');
const auth = require('../../utils/authentication');

module.exports = (app) => {
    const aluno = express.Router();
    
    aluno.use(auth.withPassAuth);


    // OK: Testes de funcionamento
    // OK: Metodos de funcionamento
    aluno.get("/treinosAluno/:id", (req, res) => {
        const id = req.params.id;

        user.treinosAluno(id, res);
    });


    app.use('/alunos', aluno);
}