
const request = require("supertest");

const app = require("../src/index");

//Test pet create
describe("POST api/pet", () => {
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
            .post("/api/pet")
            .send(data)
            .set("Accept", "application/json")
            .set("access-token",token)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect({mensaje:"Mascota guardada"})
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
            .post("/api/pet")
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

    it("respuesta con 400 faltan datos", (done) => {
        const data = {
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
            .post("/api/pet")
            .send(data)
            .set("Accept", "application/json")
            .set("access-token",token)
            .expect("Content-Type", /json/)
            .expect(400)
            .expect({mensaje: "Por favor llene todos los campos"})
            .end((err) => {
                if (err) return done(err);
                done();
            });
    }).timeout(5000);
});

//test pet search
describe("GET api/pet/search", () => {

    it("json 200 con pets mascotas contienen el string al principio de su nombre, raza o tipo", (done) => {
        var s ="Pan";
        request(app)
            .get("/api/pet/search")
            .set("Accept", "application/json")
            .set("condicion", s)
            .expect("Content-Type", /json/)
            .expect(200, done);
    }).timeout(20000);

    it("json 200 con todas las mascotas desde la busqueda", (done) => {
        var  s=""
        request(app)
            .get("/api/pet/search")
            .set("Accept", "application/json")
            .set("condicion", s)
            .expect("Content-Type", /json/)
            .expect(200,done)
    });


    it("json 400 sin mascostas", (done) => {
        var s="asdfdghgjfktjghbf"
        request(app)
            .get("/api/pet/search")
            .set("Accept", "application/json")
            .set("condicion", s)
            .expect("Content-Type", /json/)
            .expect(400)
            .expect({"status":"error","data":"No se han encontrado mascotas con el criterio de busqueda"})
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});


//test pet detail
/*describe("GET api/pet/detail", () => {

    it("json con pet especifica", (done) => {
        var id = "6171bfa0907c092a76dc87ed";
        request(app)
            .get("/api/pet/detail")
            .set("Accept", "application/json")
            .set("id", id)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect({data: {}})
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});*/
