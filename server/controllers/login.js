const login = require("../models/login.js");

module.exports = (app) => {

    // TODO: Testes de funcionamento
    // FIXME: Metodos de funcionamento
    app.get("/getAuth/:usuario/:senha", (req, res) => {
        const { usuario, senha } = req.params;
        login.getAuth({ usuario, senha }, res);
    });

    // TODO: Testes de funcionamento
    // FIXME: Metodos de funcionamento
    app.put("/setNewPassword/:usuario/:senha", (req, res) => {
        const { usuario, senha } = req.params;
        login.setNewPassword({ usuario, senha }, res);
    });

}