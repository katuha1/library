const chai = require('chai');
const server = require("../index");
const chaiHttp =  require("chai-http");
const should = chai.should();

chai.use(chaiHttp)

describe('/GET book', () => {
    it('should GET all the books', done => {
        chai.request(server)
            .get("/book")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            })
    })
})


describe('/POST book', () => {
    it ('should POST one book', done  => {
        const book = {
			name: "mfasssasgasgasgdg",
			data1: "19.03.04",
			data2: "01.04.05",
			author: "A.A. klsagasgmn",
			year: "2022"
        };
        chai.request(server)
            .post('/book')
            .send(book)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            })
      })
    })

describe("/GET book :id", () => {
    it('should GET book by id', done => {
        chai.request(server)
            .get('/book/3')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();

            })
    })
})

describe("/PUT book :id", () => {
    const book = {
        name: "gsdgsdg",
        data1: "01.06.2020",
        data2: "22.09.2021",
        author: "Пhkghkghk",
        year: "2022"
    }
    it('should update book by id', done => {
        chai.request(server)
            .put('/book/3')
            .send(book)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done()
            })
    })
})

describe("/DELETE book :id", () => {
    console.log('eestadfawdf')
    it('should delete book by id', done => {
        chai.request(server)
            .delete('/book/3')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done()
            })
    })
})
