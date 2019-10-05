import request from "supertest";
import app from "../src/app";

describe("GET /probe", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/")
      .expect(200, done);
  });
});
