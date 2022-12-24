const request = require("supertest");
const { server } = require("../index");

describe("/book", () => {
	// 1
	it("наш тест работает", (done) => {
		done();
	});
});

it("ответ 200", (done) => {
	request(server) // 3
		.get("/book")
		.set("Accept", "application/json")
		// .send({ text })
		.expect(200)
		.end((err, res) => {
			if (err) {
				return done(err);
			}
		});

	done();
});

describe("Error", () => {
	it("should return NotFound with status 404", function (done) {
		request(server).get("/error").expect(404).expect("Cannot GET /error").end(done);
	});
});


