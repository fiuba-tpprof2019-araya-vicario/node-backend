import { describe, it, after } from 'mocha'
import { assert } from 'chai'
import app from '../app'
import request from 'supertest'

let TOKENS = {
  CREATOR: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzdmljYXJpb0BmaS51YmEuYXIiLCJjcmVkZW50aWFscyI6WyJDUkVBVEVfUFJPSkVDVFMiLCJFRElUX1BST0pFQ1RTIiwiR0VUX1BST0pFQ1RTIiwiR0VUX1VTRVJTIiwiRURJVF9UVVRPUl9SRVFVRVNUUyIsIkVESVRfUkVRVUlSRU1FTlRTIl0sImlhdCI6MTU2OTE4NDMyMywiZXhwIjoxNTcxNzc2MzIzfQ.J7Q4NmrvDHZOq7ZOgS7Xx4R-94ANkISjGb0ppUsaM3Y',
  TUTOR: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ2aWNhcmlvLnNlYmFzdGlhbkBnbWFpbC5jb20iLCJjcmVkZW50aWFscyI6WyJDUkVBVEVfUFJPSkVDVFMiLCJFRElUX1BST0pFQ1RTIiwiR0VUX1BST0pFQ1RTIiwiRURJVF9VU0VSUyIsIkdFVF9VU0VSUyIsIkVESVRfUFJPRklMRVMiLCJHRVRfUFJPRklMRVMiLCJFRElUX1RVVE9SX1JFUVVFU1RTIiwiQVBQUk9WRV9QUk9KRUNUUyIsIkVESVRfUkVRVUlSRU1FTlRTIiwiR0VUX1JFUVVJUkVNRU5UUyJdLCJpYXQiOjE1NjkxODQzOTcsImV4cCI6MTU3MTc3NjM5N30.W5UNYWNXCs0BE17oH6wMaOD35JmAjdVsj1bX6IL2ySA',
  STUDENT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJzdmljYXJpb0BjeXMuY29tLmFyIiwiY3JlZGVudGlhbHMiOlsiQ1JFQVRFX1BST0pFQ1RTIiwiRURJVF9QUk9KRUNUUyIsIkdFVF9QUk9KRUNUUyIsIkdFVF9VU0VSUyJdLCJpYXQiOjE1NjkxODQ0MzMsImV4cCI6MTU3MTc3NjQzM30.2F7VzxkzOkyAg4CQGt95BOFMfiTxKTJdcOq3KtOY5UQ',
  COTUTOR: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhcnJvd2dhbWVtYXN0ZXJAZ21haWwuY29tIiwiY3JlZGVudGlhbHMiOlsiQ1JFQVRFX1BST0pFQ1RTIiwiRURJVF9QUk9KRUNUUyIsIkdFVF9QUk9KRUNUUyIsIkVESVRfVVNFUlMiLCJHRVRfVVNFUlMiLCJFRElUX1BST0ZJTEVTIiwiR0VUX1BST0ZJTEVTIiwiRURJVF9UVVRPUl9SRVFVRVNUUyIsIkFQUFJPVkVfUFJPSkVDVFMiLCJFRElUX1JFUVVJUkVNRU5UUyIsIkdFVF9SRVFVSVJFTUVOVFMiXSwiaWF0IjoxNTY5MTg0NDY5LCJleHAiOjE1NzE3NzY0Njl9.m85LzPtbfygs3qxeDcddJ6QH5V5OArz0_jUMsyP6kGs',
  CURRICULAR: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhcnJvd2dhbWVtYXN0ZXJAZ21haWwuY29tIiwiY3JlZGVudGlhbHMiOlsiQ1JFQVRFX1BST0pFQ1RTIiwiRURJVF9QUk9KRUNUUyIsIkdFVF9QUk9KRUNUUyIsIkVESVRfVVNFUlMiLCJHRVRfVVNFUlMiLCJFRElUX1BST0ZJTEVTIiwiR0VUX1BST0ZJTEVTIiwiRURJVF9UVVRPUl9SRVFVRVNUUyIsIkFQUFJPVkVfUFJPSkVDVFMiLCJFRElUX1JFUVVJUkVNRU5UUyIsIkdFVF9SRVFVSVJFTUVOVFMiXSwiaWF0IjoxNTY5NDQzNTY4LCJleHAiOjE1NzIwMzU1Njh9.Vw2jJTQqij-gn-gnCbspXl5ScwsyMQCec25jARNmEKM'
}

let requirementId
let projectId

describe('Requirement /v0/api/requiremets/', () => {
  it('Create requirement', (done) => {
    request(app)
      .post('/v0/api/requirements/')
      .send({ 'name': 'Little War Online Requirement',
        'description': 'MMORPG Game Requirement' })
      .set({ 'Authorization': TOKENS.TUTOR, Accept: 'application/json' })
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
