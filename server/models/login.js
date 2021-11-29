const bcrypt = require('bcrypt');
const uuid = require('uuid');
const validator = require('validator');

const { acessos } = require('../../database');

class Login {

    async getAuth({ usuario, senha }, res) {
        const access = await acessos.findFirst({
            where: {
                usuario: {
                    equals: usuario
                },
            },

        })

        const { idUsuarioFk, idPermissao } = access;

        if (!idUsuarioFk || !idPermissao) {
            return res.status(401).json({
                message: 'Não autorizado'
            })
        }


        const auth = await bcrypt.compare(senha, access.senha)

        if (auth) {
            res.cookie('academy-authenticated', idUsuarioFk);

            return res.status(200).json({
                message: 'Autorizado',
                id: idUsuarioFk,
                isAdm: idPermissao === 2
            });
        }

        res.status(401).json({
            message: 'Não autorizado'
        })
    }

    setNewPassword({ usuario, senha }, res) {
        const authenticated = req.cookies['academy-authenticated'];

        if (!authenticated) {
            res.status(401).send("Não autorizado")
        }


        res.status(200).send("OK")
    }

}



module.exports = new Login;