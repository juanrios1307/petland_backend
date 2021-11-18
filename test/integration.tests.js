const request = require("supertest");

const app = require("../src/index");

describe("200 api/products",()=>{
    it("JSON 200 get ",(done)=>{
        request(app)
            .get("/api/products")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    }).timeout(10000);
})

describe("200 api/adopt/available",()=>{
    it("JSON 200 sin mascotas adoptadas existentes",(done)=>{
        request(app)
            .get("/api/adopt/available")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    }).timeout(10000);
})
