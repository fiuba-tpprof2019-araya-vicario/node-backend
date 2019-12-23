import { describe, it, after } from 'mocha'
import { assert } from 'chai'
import app from '../app'
import request from 'supertest'

// vicario.sebastian@gmail.com
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ2aWNhcmlvLnNlYmFzdGlhbkBnbWFpbC5jb20iLCJjcmVkZW50aWFscyI6WyJDUkVBVEVfUFJPSkVDVFMiLCJFRElUX1BST0pFQ1RTIiwiR0VUX1BST0pFQ1RTIiwiRURJVF9VU0VSUyIsIkdFVF9VU0VSUyIsIkVESVRfUFJPRklMRVMiLCJHRVRfUFJPRklMRVMiLCJFRElUX1RVVE9SX1JFUVVFU1RTIiwiQVBQUk9WRV9QUk9KRUNUUyIsIkVESVRfUkVRVUlSRU1FTlRTIiwiR0VUX1JFUVVJUkVNRU5UUyIsIkdFVF9EQVNIQk9BUkQiXSwiaWF0IjoxNTc3MTI2MDQ0LCJleHAiOjE1Nzk3MTgwNDR9.5kk266gAqns5bQkYI3oHqyDChItylDxOCzKQc0l7y-4'

describe('GET /v0/api/users/', () => {
  it('Obtain all users by filter', (done) => {
    request(app)
      .get('/v0/api/users?name=Sebasti vic&email=svicario@fi.uba.ar&type=student')
      .set({ 'Authorization': token, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data[0].id, 1)
        assert.equal(response.body.data[0].email, 'svicario@fi.uba.ar')
        assert.equal(response.body.data[0].name, 'Sebastian')
        assert.equal(response.body.data[0].surname, 'Vicario')
        assert.equal(response.body.data[0].padron, 92223)
        done()
      }).catch(done)
  })

  it('Obtain specific user by id', (done) => {
    request(app)
      .get('/v0/api/users/1')
      .set({ 'Authorization': token, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data.id, 1)
        assert.equal(response.body.data.email, 'svicario@fi.uba.ar')
        assert.equal(response.body.data.name, 'Sebastian')
        assert.equal(response.body.data.surname, 'Vicario')
        assert.equal(response.body.data.padron, 92223)
        assert.equal(response.body.data.Profiles.length, 1)
        assert.equal(response.body.data.Profiles[0].id, 2)
        assert.equal(response.body.data.Profiles[0].name, 'Estudiante')
        assert.equal(response.body.data.Profiles[0].description, 'Estudiante FIUBA')
        assert.equal(response.body.data.Careers[0].id, 1)
        assert.equal(response.body.data.Careers[0].name, 'Ingeniería en Informática')
        done()
      }).catch(done)
  })

  it('Edit profiles / careers specific user by id', (done) => {
    request(app)
      .put('/v0/api/users/1')
      .set({ 'Authorization': token, Accept: 'application/json' })
      .send({ profiles: [2, 3], careers: [2] })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data, '1')
        request(app)
          .get('/v0/api/users/1')
          .set({ 'Authorization': token, Accept: 'application/json' })
          .expect(200)
          .then(response => {
            assert.equal(response.body.data.id, 1)
            assert.equal(response.body.data.email, 'svicario@fi.uba.ar')
            assert.equal(response.body.data.name, 'Sebastian')
            assert.equal(response.body.data.surname, 'Vicario')
            assert.equal(response.body.data.padron, 92223)
            assert.equal(response.body.data.Profiles[0].id, 2)
            assert.equal(response.body.data.Profiles[0].name, 'Estudiante')
            assert.equal(response.body.data.Profiles[0].description, 'Estudiante FIUBA')
            assert.equal(response.body.data.Profiles[1].id, 3)
            assert.equal(response.body.data.Profiles[1].name, 'Tutor')
            assert.equal(response.body.data.Profiles[1].description, 'Docente Tutor FIUBA')
            assert.equal(response.body.data.Careers[0].id, 2)
            assert.equal(response.body.data.Careers[0].name, 'Ingeniería Civil')
            done()
          })
          .catch(done)
      })
      .catch(done)
  })

  after((done) => {
    request(app)
      .put('/v0/api/users/1')
      .send({ profiles: [2], careers: [1] })
      .set({ 'Authorization': token, Accept: 'application/json' })
      .then(() => done())
  })
})
