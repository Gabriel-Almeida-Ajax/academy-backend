const { acessos, usuarios, historicoIMC, treinos } = require('../../database');
const { acessoUsuario, compareHash, hash, genId } = require('../../utils/strings');

const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat)

class Alunos {

    async createAluno(data, res) {

        if (!data.nome) {
            return res.status(400).json({ message: "Nome é obrigatório" });
        }
        if (!data.sobrenome) {
            return res.status(400).json({ message: "Sobrenome é obrigatório" });
        }
        if (!data.telefone) {
            return res.status(400).json({ message: "Telefone é obrigatório" });
        }
        if (!data.peso) {
            return res.status(400).json({ message: "Peso é obrigatório" });
        }
        if (!data.altura) {
            return res.status(400).json({ message: "Altura é obrigatório" });
        }

        const { idUsuario } = await usuarios.create({
            data: {
                idUsuario: genId(),
                nome: data.nome,
                sobrenome: data.sobrenome,
                telefone: data.telefone,
                createdAt: new Date(),
            },
            select: {
                idUsuario: true,
            }
        });

        if (!idUsuario) {
            return res.status(500).json({ idUsuario, message: "Erro ao criar usuário" })
        };

        const { idIMC } = await this._createHistoricoIMC({
            idUsuario,
            peso: data.peso,
            altura: data.altura,
        });

        const { idAcesso, idPermissao } = await this._createAcesso({
            idUsuario,
            usuario: acessoUsuario(data.nome, data.sobrenome),
            senha: await hash(data.telefone),
            idPermissao: 1,
        });

        return res.status(200).json({ idUsuario, idIMC, idAcesso, idPermissao });
    }

    async _createHistoricoIMC({ peso, altura, idUsuario }) {
        return await historicoIMC.create({
            data: {
                peso: peso,
                altura: altura,
                idUsuarioFk: idUsuario,
                createdAt: new Date(),
            },
            select: {
                idIMC: true,
            }
        });
    }

    async _createAcesso({ idUsuario, usuario, senha, idPermissao }) {
        return await acessos.create({
            data: {
                idUsuarioFk: idUsuario,
                usuario,
                senha,
                idPermissao,
                createdAt: new Date(),
            },
            select: {
                idPermissao: true,
                idAcesso: true,
            }
        })
    }

    async createTreino(data, res) {
        
        if (!data.idUsuario) {
            return res.status(400).json({ message: "Identificar ID do aluno é obrigatório" })
        };
        if (!data.nomeExercicio) {
            return res.status(400).json({ message: "Nome do exercício é obrigatório" })
        };
        if (!data.numeroRepeticao) {
            return res.status(400).json({ message: "Numero de repetição é obrigatório" })
        };
        if (!data.tempoIntervalo) {
            return res.status(400).json({ message: "Tempo de intervalo é obrigatório" })
        };

        const { idTreino } = await treinos.create({
            data: {
                idUsuarioFk: data.idUsuario,
                nomeExercicio: data.nomeExercicio,
                numeroRepeticao: data.numeroRepeticao,
                numeroSerie: data.numeroSerie,
                carga: data.carga,
                tempoIntervalo: dayjs(data.tempoIntervalo, 'HH:mm:ss').toISOString(),
                createdAt: new Date(),
            },
            select: {
                idTreino: true,
            }
        });

        res.status(200).json({ message: "Treino criado com sucesso!" });
    }

    async listAlunos(res) {

        const list = await usuarios.findMany({
            select: {
                idUsuario: true,
                nome: true,
                sobrenome: true,
                telefone: true,
                createdAt: true,
            }
        });

        if (list.length)
            return res.status(200).json({ list, message: "OK" });

        return res.status(200).json({ list, message: "Nenhum aluno encontrado" });
    }

    async deleteAluno(id, res) {
        
        const exist = await acessos.findFirst({
            where: {
                idUsuarioFk: id,
            }
        })

        if (!exist)
            return res.status(400).json({ message: "Aluno não encontrado" })

        await acessos.deleteMany({
            where: {
                idUsuarioFk: id,
            }
        })

        await historicoIMC.deleteMany({
            where: {
                idUsuarioFk: id,
            }
        })

        await treinos.deleteMany({
            where: {
                idUsuarioFk: id,
            }
        })

        await usuarios.deleteMany({
            where: {
                idUsuario: id,
            }
        });

        res.status(200).json({ message: "Usuario deletado com sucesso!" })
    }

    async editAluno(id, data, res) {

        const exist = await acessos.findFirst({
            where: {
                idUsuarioFk: id,
            }
        })

        if (!exist)
            return res.status(400).json({ message: "Aluno não encontrado" })


        if (data.usuario)
            await acessos.updateMany({
                data: {
                    usuario: data.usuario,
                },
                where: {
                    idUsuarioFk: id,
                }
            });

        if (data.nome)
            await usuarios.updateMany({
                data: {
                    sobrenome: data.sobrenome,
                },
                where: {
                    idUsuario: id
                }
            });

        if (data.sobrenome)
            await usuarios.updateMany({
                data: {
                    sobrenome: data.sobrenome,
                },
                where: {
                    idUsuario: id
                }
            });

        res.status(200).json({ message: "Usuario atualizado com sucesso!" });
    }

}



module.exports = new Alunos;