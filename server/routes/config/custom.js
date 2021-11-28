const express = require('express');
const consign = require('consign');
const cookieParser = require('cookie-parser');

module.exports = () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser())

    //constante app tudo que e exportado do diretorio controllers
    consign().include("server/controllers").into(app);
    
    return app;
}