const request = require("supertest");
const app = require("../routes/config/custom")();

const state = {};

describe("Mandatory field validation tests", () => {

  const camposObrigatoriosAluno = {
    nome: "Nome Composto",
    sobrenome: "Sobrenome Composto",
    telefone: 123456789,
    peso: 70,
    altura: 1.70,
  };

  Object.keys(camposObrigatoriosAluno).forEach((key) => {
    let data = { ...camposObrigatoriosAluno };
    delete data[key];

    test(`(/createAluno) It should return error 400 if the field is missing key: ${key}`, async () => {

      const response = await request(app)
        .post("/professor/createAluno")
        .set('Cookie', ['academy-authenticated=22ed1a08-cfe8-4833-b8a0-945a0264beb6'])
        .send(data);


      expect(response.statusCode).toBe(400);
    });

  })

  const camposObrigatoriosTreinos = {
    idUsuario: 'qualquer-coisa',
    nomeExercicio: 'Supino',
    numeroRepeticao: 50,
    tempoIntervalo: '00:05:00.000'
  };

  Object.keys(camposObrigatoriosTreinos).forEach((key) => {
    let data = { ...camposObrigatoriosTreinos };
    delete data[key];

    test(`(/createTreino) It should return error 400 if the field is missing key: ${key}`, async () => {

      const response = await request(app)
        .post("/professor/createTreino")
        .set('Cookie', ['academy-authenticated=22ed1a08-cfe8-4833-b8a0-945a0264beb6'])
        .send(data);

      expect(response.statusCode).toBe(400);
    });

  })

});

describe("Authentication tests", () => {

  test("(/createAluno) It should reject if haven't auth", async () => {
    const aluno = {
      nome: "Nome Composto",
      sobrenome: "Sobrenome Composto",
      telefone: "123456789",
      peso: "70",
      altura: "1.70",
    };

    const response = await request(app).post("/professor/createAluno").send(aluno);

    expect(response.statusCode).toBe(401);
  });

  test("(/createTreino) It should reject if haven't auth", async () => {
    const aluno = {
      idUsuario: 'state.idUsuario',
      nomeExercicio: 'Supino',
      numeroRepeticao: 50,
      numeroSerie: 3,
      carga: 5,
      tempoIntervalo: '00:30:00.000'
    };

    const response = await request(app).post("/professor/createTreino").send(aluno);

    expect(response.statusCode).toBe(401);
  });

  test("(/listAlunos) It should reject if haven't auth", async () => {
    const response = await request(app).get("/professor/listAlunos");

    expect(response.statusCode).toBe(401);
  });

  test("(/editAluno/:id) It should reject if haven't auth", async () => {

    const response = await request(app)
      .patch('/professor/editAluno/state-idUsuario');

    expect(response.statusCode).toBe(401);
  });

  test("(/deleteAluno/:id) It should reject if haven't auth", async () => {

    const response = await request(app)
      .delete('/professor/deleteAluno/state-idUsuario');

    expect(response.statusCode).toBe(401);
  });

})

describe("Tests of Professor", () => {

  test("It should create a student", async () => {
    const aluno = {
      nome: "@Nome Composto",
      sobrenome: "@Sobrenome Composto",
      telefone: 123456789,
      peso: 70,
      altura: 1.70,
    };

    const response = await request(app)
      .post("/professor/createAluno")
      .set('Cookie', ['academy-authenticated=22ed1a08-cfe8-4833-b8a0-945a0264beb6'])
      .send(aluno);

    if (response.body.idUsuario)
      state.idUsuario = response.body.idUsuario;

    expect(response.statusCode).toBe(200);
  });

  test("It should create a training", async () => {
    const aluno = {
      idUsuario: state.idUsuario,
      nomeExercicio: '@Supino',
      numeroRepeticao: 50,
      numeroSerie: 3,
      carga: 5,
      tempoIntervalo: '00:30:00.000'
    };

    const response = await request(app)
      .post("/professor/createTreino")
      .set('Cookie', ['academy-authenticated=22ed1a08-cfe8-4833-b8a0-945a0264beb6'])
      .send(aluno);

    expect(response.statusCode).toBe(200);
  });

  test("It should edit a students", async () => {
    const response = await request(app)
      .patch(`/professor/editAluno/${state.idUsuario}`)
      .set('Cookie', ['academy-authenticated=22ed1a08-cfe8-4833-b8a0-945a0264beb6'])
      .send({
        nome: "@Nome Composto Editado",
        sobrenome: "@Sobrenome Composto Editado",
        usuario: "@usuario.editado",
      });

    expect(response.statusCode).toBe(200);

  });

  test("It should list of students", async () => {

    const response = await request(app)
      .get("/professor/listAlunos")
      .set('Cookie', ['academy-authenticated=22ed1a08-cfe8-4833-b8a0-945a0264beb6']);

    expect(response.statusCode).toBe(200);
  });

  test("It should delete a students", async () => {
    jest.setTimeout(10000);

    const response = await request(app)
      .delete(`/professor/deleteAluno/${state.idUsuario}`)
      .set('Cookie', ['academy-authenticated=22ed1a08-cfe8-4833-b8a0-945a0264beb6']);

    expect(response.statusCode).toBe(200);
  });

});
