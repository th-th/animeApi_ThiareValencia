const app = require("../app");
const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const servidor = app.listen(3000);

chai.use(chaiHttp);

describe("Validacion de findAll", () => {
  it("Valida que el código de respuesta sea 200", (done) => {
    chai
      .request(servidor)
      .get("/api/v1/anime")
      .end((err, res) => {
        assert.equal(res.status, 200, "Status code no coincide con 200");
        done();
      });
  });
});

describe("Validacion de findById", () => {
  it("Valida que el código de respuesta sea 200", (done) => {
    chai
      .request(servidor)
      .get("/api/v1/anime/1")
      .end((err, res) => {
        assert.equal(res.status, 200, "Status code no coincide con 200");
        done();
      });
  });

  it("Valida que el código de respuesta sea 404 cuando no existe el anime", (done) => {
    chai
      .request(servidor)
      .get("/api/v1/anime/100")
      .end((err, res) => {
        assert.equal(res.status, 404, "Status code no coincide con 404");
        done();
      });
  });
});

describe("Validacion de create", () => {
  it("Valida que el respuesta contenga el anime creado", (done) => {
    const anime = {
      id: 10,
      nombre: "Shingeki no Kyojin",
      genero: "Shonen",
      año: "2013",
      autor: "Hajime Isayama",
    };

    chai
      .request(servidor)
      .post("/api/v1/anime")
      .send(anime)
      .end((err, res) => {
        assert.propertyVal(
          res.body,
          "nombre",
          "Shingeki no Kyojin",
          "Nombre del anime creado no coincide"
        );
        done();
      });
  });
});

describe("Validacion de editById", () => {
  it("Valida que el respuesta contenga el anime actualizado", (done) => {
    chai
      .request(servidor)
      .put("/api/v1/anime/10")
      .send({ nombre: "Editado" })
      .end((err, res) => {
        assert.propertyVal(
          res.body,
          "nombre",
          "Editado",
          "Nombre del anime editado no coincide"
        );
        done();
      });
  });
});

describe("Validacion de deleteById", () => {
  it("Valida que el respuesta sea 200", (done) => {
    chai
      .request(servidor)
      .delete("/api/v1/anime/10")
      .end((err, res) => {
        assert.equal(res.status, 200, "Status code no coincide con 200");
        done();
      });
  });
});
