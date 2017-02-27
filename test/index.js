'use strict';

const expect = require('chai').expect;
const request = require('request');
const baseUrl = 'http://localhost:80/';

describe('Users', () => {
  const url = baseUrl + 'users';
  describe('/GET', () => {
    it('Should returns status 200', (done) => {
      request(url, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('Should returns all users', (done) => {
      request(url, (error, response, body) => {
        expect(body).to.be.a('string');
        done();
      });
    });
  });

  describe('/GET/id', () => {
    it('Sending 1 as id should returns status 200', (done) => {
      request(`${url}/1`, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('Sending 2 as id should returns status 404', (done) => {
      request(`${url}/2`, (error, response, body) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('/POST', () => {
    it('Sending correct data should returns status 201', (done) => {
      request.post({
        url: url,
        form: {
          firstName: 'Luis',
          lastName: 'Fregoso',
          email: 'lchavez1@ucol.mx',
          password: '123'
        }
      }, (error, response, body) => {
        expect(response.statusCode).to.equal(201);
        done();
      });
    });

    it('Sending incorrect data should returns status 404', (done) => {
      request.post({
        url: url,
        form: {
          firstName: 'Luis',
          lastName: 'Fregoso'
        }
      }, (error, response, body) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('/PUT/id', () => {
    it('Sending 1 as id and correct data should returns status 200', (done) => {
      request.put({
        url: `${url}/1`,
        form: {
          firstName: 'Adrian',
          lastName: 'Chavez',
          email: 'lacf95@hotmail.com',
          password: '1234'
        }
      }, (error, response, body) => {
        expect(response.statusCode).to.equal(201);
        done();
      });
    });

    it('Sending 3 as id and correct data should returns status 404', (done) => {
      request.put({
        url: `${url}/3`,
        form: {
          firstName: 'Adrian',
          lastName: 'Chavez',
          email: 'lacf95@hotmail.com',
          password: '1234'
        }
      }, (error, response, body) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });
});
