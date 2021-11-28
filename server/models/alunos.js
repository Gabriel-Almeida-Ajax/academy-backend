const { treinos } = require('../../database');

class Alunos {

    async treinosAluno(id, req, res) {
        const authenticated = req.cookies['academy-authenticated'];

        if (!authenticated)
            return res.status(401).json({ message: "Não autorizado" })

        const list = await treinos.findMany({
            where: {
                idUsuarioFk: id
            }
        });

        if (!list.length)
            return res.status(400).json({ message: "Não foi encontrado treinos para este aluno" });

        res.status(200).json({ list, message: "Treinos encontrados com sucesso" });
    }

}



module.exports = new Alunos;