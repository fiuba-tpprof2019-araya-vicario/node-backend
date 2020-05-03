import { describe, it } from 'mocha'
import { assert } from 'chai'
import app from '../app'
import request from 'supertest'

let TOKENS = {
  // svicario@fi.uba.ar
  CREATOR: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzdmljYXJpb0BmaS51YmEuYXIiLCJjcmVkZW50aWFscyI6WyJDUkVBVEVfUFJPSkVDVFMiLCJFRElUX1BST0pFQ1RTIiwiR0VUX1BST0pFQ1RTIiwiR0VUX1VTRVJTIiwiRURJVF9UVVRPUl9SRVFVRVNUUyIsIkVESVRfUkVRVUlSRU1FTlRTIl0sImlhdCI6MTU4NTY3NzA2MCwiZXhwIjoxNTg4MjY5MDYwfQ.DB7AZKHwjDxBFyRwPnA3qEq1lBRqQ6lHMSLI168g7QA',
  // vicario.sebastian@gmail.com
  TUTOR: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ2aWNhcmlvLnNlYmFzdGlhbkBnbWFpbC5jb20iLCJjcmVkZW50aWFscyI6WyJDUkVBVEVfUFJPSkVDVFMiLCJFRElUX1BST0pFQ1RTIiwiR0VUX1BST0pFQ1RTIiwiRURJVF9VU0VSUyIsIkdFVF9VU0VSUyIsIkVESVRfUFJPRklMRVMiLCJHRVRfUFJPRklMRVMiLCJFRElUX1RVVE9SX1JFUVVFU1RTIiwiQVBQUk9WRV9QUk9KRUNUUyIsIkVESVRfUkVRVUlSRU1FTlRTIiwiR0VUX1JFUVVJUkVNRU5UUyIsIkdFVF9EQVNIQk9BUkQiXSwiaWF0IjoxNTg1Njc3MTA5LCJleHAiOjE1ODgyNjkxMDl9.F-U4hZdqU9Kjdb3QKfpVGoKTdq63xfeFeL_BT4SYxAw',
  // naraya@fi.uba.ar
  STUDENT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJuYXJheWFAZmkudWJhLmFyIiwiY3JlZGVudGlhbHMiOlsiQ1JFQVRFX1BST0pFQ1RTIiwiRURJVF9QUk9KRUNUUyIsIkdFVF9QUk9KRUNUUyIsIkdFVF9VU0VSUyJdLCJpYXQiOjE1ODU2NzcxODUsImV4cCI6MTU4ODI2OTE4NX0.m-HHvVrZMeyjoCU1ZhMyjSMHlihMvAcPw26f1mEkTEc',
  // arrowgamemaster@gmail.com
  COTUTOR: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhcnJvd2dhbWVtYXN0ZXJAZ21haWwuY29tIiwiY3JlZGVudGlhbHMiOlsiR0VUX1BST0pFQ1RTIiwiRURJVF9UVVRPUl9SRVFVRVNUUyIsIkVESVRfUkVRVUlSRU1FTlRTIiwiQVBQUk9WRV9QUk9KRUNUUyJdLCJpYXQiOjE1ODU2NzcyMjIsImV4cCI6MTU4ODI2OTIyMn0.I0J-BGD3wx0a2JSr08mRRDnBtLbZw5P_p5-Xw-dIF1w',
  // arrowgamemaster@gmail.com
  CURRICULAR: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhcnJvd2dhbWVtYXN0ZXJAZ21haWwuY29tIiwiY3JlZGVudGlhbHMiOlsiR0VUX1BST0pFQ1RTIiwiRURJVF9UVVRPUl9SRVFVRVNUUyIsIkVESVRfUkVRVUlSRU1FTlRTIiwiQVBQUk9WRV9QUk9KRUNUUyJdLCJpYXQiOjE1ODU2NzcyMjIsImV4cCI6MTU4ODI2OTIyMn0.I0J-BGD3wx0a2JSr08mRRDnBtLbZw5P_p5-Xw-dIF1w',
  // vicario.sebastian@gmail.com
  ADMIN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ2aWNhcmlvLnNlYmFzdGlhbkBnbWFpbC5jb20iLCJjcmVkZW50aWFscyI6WyJDUkVBVEVfUFJPSkVDVFMiLCJFRElUX1BST0pFQ1RTIiwiR0VUX1BST0pFQ1RTIiwiRURJVF9VU0VSUyIsIkdFVF9VU0VSUyIsIkVESVRfUFJPRklMRVMiLCJHRVRfUFJPRklMRVMiLCJFRElUX1RVVE9SX1JFUVVFU1RTIiwiQVBQUk9WRV9QUk9KRUNUUyIsIkVESVRfUkVRVUlSRU1FTlRTIiwiR0VUX1JFUVVJUkVNRU5UUyIsIkdFVF9EQVNIQk9BUkQiXSwiaWF0IjoxNTg1Njc3MTA5LCJleHAiOjE1ODgyNjkxMDl9.F-U4hZdqU9Kjdb3QKfpVGoKTdq63xfeFeL_BT4SYxAw',
  // svicario.santandertecnologia@gmail.com
  STUDENT1: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoic3ZpY2FyaW8uc2FudGFuZGVydGVjbm9sb2dpYUBnbWFpbC5jb20iLCJjcmVkZW50aWFscyI6WyJDUkVBVEVfUFJPSkVDVFMiLCJFRElUX1BST0pFQ1RTIiwiR0VUX1BST0pFQ1RTIiwiR0VUX1VTRVJTIl0sImlhdCI6MTU4ODI2MzA2MSwiZXhwIjoxNTkwODU1MDYxfQ.j7CjHf0PH44MGjqWfvJ2U4dnTp3luqqxRHArrgHbr50',

  // svicario@santandertecnologia.com.ar
  STUDENT2: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3ZpY2FyaW9Ac2FudGFuZGVydGVjbm9sb2dpYS5jb20uYXIiLCJjcmVkZW50aWFscyI6WyJDUkVBVEVfUFJPSkVDVFMiLCJFRElUX1BST0pFQ1RTIiwiR0VUX1BST0pFQ1RTIiwiR0VUX1VTRVJTIl0sImlhdCI6MTU4ODI2MzEyNywiZXhwIjoxNTkwODU1MTI3fQ._cPMEoqJPL2VMwWP__oP9ZTQEFlvhQ0uSF2XslVZqYg',

  // mobilecostudios@gmail.com
  STUDENT3: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImVtYWlsIjoibW9iaWxlY29zdHVkaW9zQGdtYWlsLmNvbSIsImNyZWRlbnRpYWxzIjpbIkNSRUFURV9QUk9KRUNUUyIsIkVESVRfUFJPSkVDVFMiLCJHRVRfUFJPSkVDVFMiLCJHRVRfVVNFUlMiXSwiaWF0IjoxNTg4MjYzMjA4LCJleHAiOjE1OTA4NTUyMDh9.8EytGjI5HfwW_w7q_dqODlsMuu562_YhY7lyK_aeJ6k'
}

describe('GET /v0/api/interests/', () => {
  it('Obtain all interests', (done) => {
    request(app)
      .get('/v0/api/interests')
      .set({ 'Authorization': TOKENS.ADMIN, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data[0].id, 1)
        assert.equal(response.body.data[0].name, 'Videojuegos')
        assert.equal(response.body.data[0].description, '')
        done()
      }).catch(done)
  })

  it('Edit interests user 1', (done) => {
    request(app)
      .put(`/v0/api/interests/users/`)
      .send({ 'interests': [
        { "id": 1, "score": 9, "original_score": 0 },
        { "id": 2, "score": 5, "original_score": 0 }
      ]})
      .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
      .expect(201)
      .then(response => {
        request(app)
          .get(`/v0/api/interests/users/`)
          .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
          .expect(200)
          .then(response => {
            // console.log('edit interest: ', response)
            assert.equal(response.body.data.length, 2)
            assert.equal(response.body.data[0].Interest.id, 1)
            assert.equal(response.body.data[0].original_score, 9)
            assert.equal(response.body.data[1].Interest.id, 2)
            assert.equal(response.body.data[1].original_score, 5)
            done()
          }).catch(done)
      }).catch(done)
  })

  it('Edit interests user 2', (done) => {
    request(app)
      .put(`/v0/api/interests/users/`)
      .send({ 'interests': [ { "id": 2, "score": 9, "original_score": 0 } ]})
      .set({ 'Authorization': TOKENS.STUDENT, Accept: 'application/json' })
      .expect(201)
      .then(response => {
        request(app)
          .get(`/v0/api/interests/users/`)
          .set({ 'Authorization': TOKENS.STUDENT, Accept: 'application/json' })
          .expect(200)
          .then(response => {
            // console.log('edit interest: ', response)
            assert.equal(response.body.data.length, 1)
            assert.equal(response.body.data[0].Interest.id, 2)
            assert.equal(response.body.data[0].original_score, 9)
            done()
          }).catch(done)
      }).catch(done)
  })

  it('Edit interests user 3', (done) => {
    request(app)
      .put(`/v0/api/interests/users/`)
      .send({ 'interests': [ { "id": 1, "score": 9, "original_score": 0 } ]})
      .set({ 'Authorization': TOKENS.STUDENT1, Accept: 'application/json' })
      .expect(201)
      .then(response => {
        request(app)
          .get(`/v0/api/interests/users/`)
          .set({ 'Authorization': TOKENS.STUDENT1, Accept: 'application/json' })
          .expect(200)
          .then(response => {
            // console.log('edit interest: ', response)
            assert.equal(response.body.data.length, 1)
            assert.equal(response.body.data[0].Interest.id, 1)
            assert.equal(response.body.data[0].original_score, 9)
            done()
          }).catch(done)
      }).catch(done)
  })

  it('Edit interests user 4', (done) => {
    request(app)
      .put(`/v0/api/interests/users/`)
      .send({ 'interests': [ { "id": 1, "score": 9, "original_score": 0 } ]})
      .set({ 'Authorization': TOKENS.STUDENT2, Accept: 'application/json' })
      .expect(201)
      .then(response => {
        request(app)
          .get(`/v0/api/interests/users/`)
          .set({ 'Authorization': TOKENS.STUDENT2, Accept: 'application/json' })
          .expect(200)
          .then(response => {
            // console.log('edit interest: ', response)
            assert.equal(response.body.data.length, 1)
            assert.equal(response.body.data[0].Interest.id, 1)
            assert.equal(response.body.data[0].original_score, 9)
            done()
          }).catch(done)
      }).catch(done)
  })

  it('Edit interests user 5', (done) => {
    request(app)
      .put(`/v0/api/interests/users/`)
      .send({ 'interests': [ { "id": 1, "score": 9, "original_score": 0 } ]})
      .set({ 'Authorization': TOKENS.STUDENT3, Accept: 'application/json' })
      .expect(201)
      .then(response => {
        request(app)
          .get(`/v0/api/interests/users/`)
          .set({ 'Authorization': TOKENS.STUDENT3, Accept: 'application/json' })
          .expect(200)
          .then(response => {
            // console.log('edit interest: ', response)
            assert.equal(response.body.data.length, 1)
            assert.equal(response.body.data[0].Interest.id, 1)
            assert.equal(response.body.data[0].original_score, 9)
            done()
          }).catch(done)
      }).catch(done)
  })

  it('Get students similar', (done) => {
    request(app)
      .get('/v0/api/interests/users/similar')
      .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        console.log('similars: ', response.body.data)
        assert.equal(response.body.data.length, 3)
        done()
      }).catch(done)
  })
})
