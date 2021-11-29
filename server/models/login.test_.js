const request = require("supertest");
const app = require("../routes/config/custom")();

describe("Tests of Login", () => {

  // OK: Testes de funcionamento
  // OK: Metodos de funcionamento 
  test("It should reject if haven't user auth invalid", async () => {
    const response = await request(app)
      .get("/alunos/treinosAluno/teste-usuario-aluno-invalid/teste-senha-aluno-valid");

    expect(response.statusCode).toBe(401);
  });

  // TODO: Testes de funcionamento
  // FIXME: Metodos de funcionamento 
  test("It should reject if haven't password auth invalid", async () => {
    const response = await request(app)
      .get("/alunos/treinosAluno/teste-usuario-aluno-valid/teste-senha-aluno-invalid");

    expect(response.statusCode).toBe(401);
  });

  // TODO: Testes de funcionamento
  // FIXME: Metodos de funcionamento
  test("It should resolve with cookie, and code 200", async () => {

    const response = await request(app)
      .get("/getAuth/teste-usuario-aluno-valid/teste-senha-aluno-valid");

    expect(response.statusCode).toBe(200);
  });

});