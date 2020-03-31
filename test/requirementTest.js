import { describe, it, after } from 'mocha'
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
  CURRICULAR: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhcnJvd2dhbWVtYXN0ZXJAZ21haWwuY29tIiwiY3JlZGVudGlhbHMiOlsiR0VUX1BST0pFQ1RTIiwiRURJVF9UVVRPUl9SRVFVRVNUUyIsIkVESVRfUkVRVUlSRU1FTlRTIiwiQVBQUk9WRV9QUk9KRUNUUyJdLCJpYXQiOjE1ODU2NzcyMjIsImV4cCI6MTU4ODI2OTIyMn0.I0J-BGD3wx0a2JSr08mRRDnBtLbZw5P_p5-Xw-dIF1w'
}

let requirementId
let projectId

describe('Requirement /v0/api/requiremets/', () => {
  it('Create requirement', (done) => {
    request(app)
      .post('/v0/api/requirements/')
      .field('name', 'Little War Online Requirement')
      .field('description', 'MMORPG Game Requirement')
      .set({ 'Authorization': TOKENS.TUTOR, Accept: 'multipart/form-data' })
      .attach('file', './test/example_req.pdf', 'example_req.pdf')
      .expect(201)
      .then(response => {
        assert.equal(response.body.code, 201)
        requirementId = response.body.data
        done()
      }).catch(done)
  })

  it('Create project with requirement', (done) => {
    request(app)
      .post('/v0/api/projects/')
      .send({ 'name': 'Little War Online',
        'description': 'MMORPG Game',
        'type_id': 1,
        'students': [8],
        'tutor_id': 9,
        'cotutors': [7],
        'careers': [1],
        'requirement_id': requirementId })
      .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
      .expect(201)
      .then(response => {
        assert.equal(response.body.code, 201)
        projectId = response.body.data
        done()
      }).catch(done)
  })

  it('Obtain project by id with requirement', (done) => {
    request(app)
      .get(`/v0/api/projects/${projectId}`)
      .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        console.log(response.body)
        assert.equal(response.body.data.id, projectId)
        assert.equal(response.body.data.name, 'Little War Online')
        assert.equal(response.body.data.Type.id, 1)
        assert.equal(response.body.data.Type.name, 'Trabajo Profesional')
        assert.equal(response.body.data.State.id, 1)
        assert.equal(response.body.data.State.name, 'Idea en revisión')
        assert.equal(response.body.data.Creator.id, 1)
        assert.equal(response.body.data.Creator.email, 'svicario@fi.uba.ar')
        assert.equal(response.body.data.Tutor.id, 9)
        assert.equal(response.body.data.Tutor.email, 'vicario.sebastian@gmail.com')
        assert.equal(response.body.data.Tutor.TutorRequests[0].type, 'tutor')
        assert.equal(response.body.data.Students[0].id, 8)
        assert.equal(response.body.data.Students[0].email, 'svicario@cys.com.ar')
        assert.equal(response.body.data.Students[0].StudentRequests.length, 1)
        assert.equal(response.body.data.Cotutors[0].id, 7)
        assert.equal(response.body.data.Cotutors[0].email, 'arrowgamemaster@gmail.com')
        assert.equal(response.body.data.Cotutors[0].TutorRequests[0].type, 'cotutor')
        assert.equal(response.body.data.ProjectCareers[0].Career.id, 1)
        assert.equal(response.body.data.ProjectCareers[0].Career.name, 'Ingeniería en Informática')
        assert.equal(response.body.data.Requirement.id, requirementId)
        assert.equal(response.body.data.Requirement.name, 'Little War Online Requirement')
        assert.equal(response.body.data.Requirement.status, 'active')
        assert.equal(response.body.data.Requirement.file_name, 'example_req.pdf')
        done()
      }).catch(done)
  })

  after((done) => {
    request(app)
      .delete(`/v0/api/projects/${projectId}`)
      .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
      .then(() => {
        request(app)
          .delete(`/v0/api/requirements/${requirementId}`)
          .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
          .then(() => done())
      })
  })
})
