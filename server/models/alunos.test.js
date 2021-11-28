const request = require("supertest");
const app = require("../routes/config/custom")();

describe("Authentication tests", () => {

  test("(/treinosAluno) It should reject if haven't auth", async () => {
    const response = await request(app)
      .get("/treinosAluno/teste-id-aluno");

    expect(response.statusCode).toBe(401);
  });

});

describe("Tests of User", () => {

  test("It should'nt list of training", async () => {

    const response = await request(app)
      .get("/treinosAluno/id-invalido-ou-sem-treino")
      .set('Cookie', ['academy-authenticated=22ed1a08-cfe8-4833-b8a0-945a0264beb6']);

    expect(response.statusCode).toBe(400);
  });

});
