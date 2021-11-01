
const request = require("supertest");

const app = require("../src/index");

//Test login
describe("POST /user/login", () => {
    it("Respuesta con token correcto", (done) => {
        const data = {
           correo:"juanesrios@gmail.com",
            pwd:"123456"
        };
        request(app)
            .post("/api/user/login")
            .send(data)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200,done);
    });

    it("Respuesta para usuario o contraseña invalidos", (done) => {
        const data = {
            correo:"cosa@mail.com",
            pwd:"otracosa"
        };
        request(app)
            .post("/api/user/login")
            .send(data)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(203)
            .expect({mensaje:"Usuario o contraseña incorrectos"})
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});
