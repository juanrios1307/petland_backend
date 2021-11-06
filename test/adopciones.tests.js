const request = require("supertest");

const app = require("../src/index");

//Test report create
describe("POST api/adopt/ ", ()=>{
    it("respuesta con 200 creado", (done) => {
        const data = {
            imagen:"https://res.cloudinary.com/drn7vichy/image/upload/v1628640716/dog_d93jye.jpg",
            ciudad:"Medellín",
            raza:"Pincher",
            color:"Marrón",
            edad:"10",
            nombre:"Pancho",
            size:"Mediano",
            tipo:"Perro"
        };
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTA1OWU0ZDVjNTgwMDhmZjNjMDJiZDEiLCJpYXQiOjE2MzQ4NDQ0MzksImV4cCI6MTY0MzQ4NDQzOX0.lUKCfTBb5CZAW3UWZ4LpWFTZbWLF3b-xCan7CQRwezI"
        request(app)
            .post("/api/adopt")
            .send(data)
            .set("Accept", "application/json")
            .set("access-token",token)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect({mensaje:"Mascota Guardada"})
            .end((err) => {
                if (err) return done(err);
                done();
            });
    }).timeout(5000);

    it("respuesta con 400 No token", (done) => {
        const data = {
            imagen:"https://res.cloudinary.com/drn7vichy/image/upload/v1628640716/dog_d93jye.jpg",
            ciudad:"Medellín",
            raza:"Pincher",
            color:"Marrón",
            edad:"10",
            nombre:"Pancho",
            size:"Mediano",
            tipo:"Perro"
        };
        request(app)
            .post("/api/adopt")
            .send(data)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .expect({mensaje: 'Token no proveída'})
            .end((err) => {
                if (err) return done(err);
                done();
            });
    }).timeout(5000);
})

//Test adoptarPet
describe("PUT api/adopt/", ()=>{
    it("respuesta con 200 creado", (done) => {
        const pet="617c557f476a6e84ea648112"
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTA1OWU0ZDVjNTgwMDhmZjNjMDJiZDEiLCJpYXQiOjE2MzQ4NDQ0MzksImV4cCI6MTY0MzQ4NDQzOX0.lUKCfTBb5CZAW3UWZ4LpWFTZbWLF3b-xCan7CQRwezI"
        request(app)
            .put("/api/adopt")
            .set("Accept", "application/json")
            .set("access-token",token)
            .set("pet",pet)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect({status: "ok", data: "Mascota Adoptada Satisfactoriamente" })
            .end((err) => {
                if (err) return done(err);
                done();
            });
    }).timeout(5000);

    it("respuesta con 400 No token", (done) => {
        const pet="617c557f476a6e84ea648112"
        request(app)
            .put("/api/adopt")
            .set("Accept", "application/json")

            .set("pet",pet)
            .expect("Content-Type", /json/)
            .expect(400)
            .expect({mensaje: 'Token no proveída'})
            .end((err) => {
                if (err) return done(err);
                done();
            });
    }).timeout(5000);
})

//Test getAdoptPets
describe("GET api/adopt/",()=>{
    it("JSON 200 con mascotas adoptadas",(done)=>{
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTA1OWU0ZDVjNTgwMDhmZjNjMDJiZDEiLCJpYXQiOjE2MzQ4NDQ0MzksImV4cCI6MTY0MzQ4NDQzOX0.lUKCfTBb5CZAW3UWZ4LpWFTZbWLF3b-xCan7CQRwezI"
        request(app)
            .get("/api/adopt")
            .set("Accept", "application/json")
            .set("access-token",token)
            .expect("Content-Type", /json/)
            .expect(200, done);

    }).timeout(5000);

    it("JSON 200 sin mascotas adoptadas existentes",(done)=>{
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTA1OWU0ZDVjNTgwMDhmZjNjMDJiZDEiLCJpYXQiOjE2MzQ4NDQ0MzksImV4cCI6MTY0MzQ4NDQzOX0.lUKCfTBb5CZAW3UWZ4LpWFTZbWLF3b-xCan7CQRwezI"
        request(app)
            .get("/api/adopt")
            .set("Accept", "application/json")
            .set("access-token",token)
            .expect("Content-Type", /json/)
            .expect(200, done);

    }).timeout(5000);
})
