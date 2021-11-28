const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');

class Str {
    acessoUsuario(nome, sobrenome){
        const nomeTratado = nome.split(' ')[0];
        const sobrenomeTratado = sobrenome.split(' ')[0];

        return `${nomeTratado}.${sobrenomeTratado}`;
    }

    async compareHash(senha, hash){
        return await bcrypt.compare(senha, hash);
    }	

    async hash(senha){
        return await bcrypt.hash(String(senha), 10);
    }

    genId(){
        return uuid();
    }

}

module.exports = new Str();