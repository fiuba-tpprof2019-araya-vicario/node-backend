import { describe, it, after } from 'mocha'
import { assert } from 'chai'
import app from '../app'
import request from 'supertest'

// vicario.sebastian@gmail.com
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ2aWNhcmlvLnNlYmFzdGlhbkBnbWFpbC5jb20iLCJjcmVkZW50aWFscyI6WyJDUkVBVEVfUFJPSkVDVFMiLCJFRElUX1BST0pFQ1RTIiwiR0VUX1BST0pFQ1RTIiwiRURJVF9VU0VSUyIsIkdFVF9VU0VSUyIsIkVESVRfUFJPRklMRVMiLCJHRVRfUFJPRklMRVMiLCJFRElUX1RVVE9SX1JFUVVFU1RTIiwiQVBQUk9WRV9QUk9KRUNUUyIsIkVESVRfUkVRVUlSRU1FTlRTIiwiR0VUX1JFUVVJUkVNRU5UUyIsIkdFVF9EQVNIQk9BUkQiXSwiaWF0IjoxNTg1Njc3MTA5LCJleHAiOjE1ODgyNjkxMDl9.F-U4hZdqU9Kjdb3QKfpVGoKTdq63xfeFeL_BT4SYxAw'

describe('GET /v0/api/interests/', () => {
  it('Obtain all interests', (done) => {
    request(app)
      .get('/v0/api/interests')
      .set({ 'Authorization': token, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data[0].id, 1)
        assert.equal(response.body.data[0].name, 'Videojuegos')
        assert.equal(response.body.data[0].description, '')
        done()
      }).catch(done)
  })
})
