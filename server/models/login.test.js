const request = require("supertest");
const app = require("../routes/config/custom")();

describe("Tests of Login", () => {

  test("It should reject if haven't user auth invalid", async () => {
    const response = await request(app)
      .get("/treinosAluno/teste-usuario-aluno-invalid/teste-senha-aluno-valid");

    expect(response.statusCode).toBe(401);
  });

  test("It should reject if haven't password auth invalid", async () => {
    const response = await request(app)
      .get("/treinosAluno/teste-usuario-aluno-valid/teste-senha-aluno-invalid");

    expect(response.statusCode).toBe(401);
  });

  test("It should resolve with cookie, and code 200", async () => {

    const response = await request(app)
      .get("/getAuth/gabriel.lima/252525");

    expect(response.statusCode).toBe(200);
  });

});