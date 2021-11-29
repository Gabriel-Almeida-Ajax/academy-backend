const database = require('./index')
describe("Database", () => {

    test("It should be return a tables", async () => {
        const tables = Object.keys(database);

        expect(tables).toEqual(expect.arrayContaining(['usuarios', 'acessos', 'treinos', 'historicoIMC', 'descricaoPermissao']));

    });

    test("It should be return a connection", async () => {
        const connection = await database.$executeRawUnsafe('select 1');

        if(!connection)
            process.exit(1);

        expect(connection).toEqual(1);

    });

});
