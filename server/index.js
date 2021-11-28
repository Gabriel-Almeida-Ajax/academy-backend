//Importando Dependencias
const customExpress = require('./routes/config/custom');
const expressListRoutes = require('express-list-routes');

//Criando instância do express
const app = customExpress();

app.listen(3333, () =>{
    expressListRoutes(app, { prefix: '/' });

    console.log("Servidor on");
});