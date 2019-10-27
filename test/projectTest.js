import { describe, it, after } from 'mocha'
import { assert } from 'chai'
import app from '../app'
import request from 'supertest'

let TOKENS = {
  // svicario@fi.uba.ar
  CREATOR: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzdmljYXJpb0BmaS51YmEuYXIiLCJjcmVkZW50aWFscyI6WyJDUkVBVEVfUFJPSkVDVFMiLCJFRElUX1BST0pFQ1RTIiwiR0VUX1BST0pFQ1RTIiwiR0VUX1VTRVJTIl0sImlhdCI6MTU3MTA4OTUwNSwiZXhwIjoxNTczNjgxNTA1fQ.CLTiKM6tQ05GUtlcGSCVeApCZTA8fjkbHaosEmpjxhw',
  // vicario.sebastian@gmail.com
  TUTOR: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ2aWNhcmlvLnNlYmFzdGlhbkBnbWFpbC5jb20iLCJjcmVkZW50aWFscyI6WyJDUkVBVEVfUFJPSkVDVFMiLCJFRElUX1BST0pFQ1RTIiwiR0VUX1BST0pFQ1RTIiwiRURJVF9VU0VSUyIsIkdFVF9VU0VSUyIsIkVESVRfUFJPRklMRVMiLCJHRVRfUFJPRklMRVMiLCJFRElUX1RVVE9SX1JFUVVFU1RTIiwiQVBQUk9WRV9QUk9KRUNUUyIsIkVESVRfUkVRVUlSRU1FTlRTIiwiR0VUX1JFUVVJUkVNRU5UUyIsIkdFVF9EQVNIQk9BUkQiXSwiaWF0IjoxNTcyMjA3MTMwLCJleHAiOjE1NzQ3OTkxMzB9.3O75BTEfnpTXm846mAQoAf60hm9IQgBfDzn9OtEw9vY',
  // naraya@fi.uba.ar
  STUDENT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJuYXJheWFAZmkudWJhLmFyIiwiY3JlZGVudGlhbHMiOlsiQ1JFQVRFX1BST0pFQ1RTIiwiRURJVF9QUk9KRUNUUyIsIkdFVF9QUk9KRUNUUyIsIkdFVF9VU0VSUyJdLCJpYXQiOjE1NzEwODk1OTgsImV4cCI6MTU3MzY4MTU5OH0.N7tFJkiWBDlskzln_-X5ICie6BL64Xlm2cx_nNKB0JI',
  // arrowgamemaster@gmail.com
  COTUTOR: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhcnJvd2dhbWVtYXN0ZXJAZ21haWwuY29tIiwiY3JlZGVudGlhbHMiOlsiR0VUX1BST0pFQ1RTIiwiRURJVF9UVVRPUl9SRVFVRVNUUyIsIkVESVRfUkVRVUlSRU1FTlRTIiwiQVBQUk9WRV9QUk9KRUNUUyJdLCJpYXQiOjE1NzEwODk2MzgsImV4cCI6MTU3MzY4MTYzOH0.nUm-du2mrgAdbIWMzkOVhauZnRaZUjCHfb9FLZ6XWFA',
  // arrowgamemaster@gmail.com
  CURRICULAR: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhcnJvd2dhbWVtYXN0ZXJAZ21haWwuY29tIiwiY3JlZGVudGlhbHMiOlsiR0VUX1BST0pFQ1RTIiwiRURJVF9UVVRPUl9SRVFVRVNUUyIsIkVESVRfUkVRVUlSRU1FTlRTIiwiQVBQUk9WRV9QUk9KRUNUUyJdLCJpYXQiOjE1NzEwODk2MzgsImV4cCI6MTU3MzY4MTYzOH0.nUm-du2mrgAdbIWMzkOVhauZnRaZUjCHfb9FLZ6XWFA'
}

let projectId
let studentRequestId
let tutorRequestId
let cotutorRequestId

describe('Project /v0/api/projects/', () => {
  it('Create basic project', (done) => {
    request(app)
      .post('/v0/api/projects/')
      .send({ 'name': 'Little War Online',
        'description': 'MMORPG Game',
        'type_id': 1,
        'students': [2],
        'tutor_id': 9,
        'cotutors': [7],
        'careers': [1] })
      .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
      .expect(201)
      .then(response => {
        assert.equal(response.body.code, 201)
        projectId = response.body.data
        done()
      }).catch(done)
  })

  it('Obtain all projects by filter', (done) => {
    request(app)
      .get('/v0/api/projects?state=1')
      .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data[0].id, projectId)
        assert.equal(response.body.data[0].name, 'Little War Online')
        assert.equal(response.body.data[0].Type.id, 1)
        assert.equal(response.body.data[0].Type.name, 'Trabajo Profesional')
        assert.equal(response.body.data[0].State.id, 1)
        assert.equal(response.body.data[0].State.name, 'Idea en revisión')
        assert.equal(response.body.data[0].Creator.id, 1)
        assert.equal(response.body.data[0].Creator.email, 'svicario@fi.uba.ar')
        assert.equal(response.body.data[0].Tutor.id, 9)
        assert.equal(response.body.data[0].Tutor.email, 'vicario.sebastian@gmail.com')
        assert.equal(response.body.data[0].Students[0].id, 2)
        assert.equal(response.body.data[0].Students[0].email, 'naraya@fi.uba.ar')
        assert.equal(response.body.data[0].Cotutors[0].id, 7)
        assert.equal(response.body.data[0].Cotutors[0].email, 'arrowgamemaster@gmail.com')
        assert.equal(response.body.data[0].ProjectCareers[0].Career.id, 1)
        assert.equal(response.body.data[0].ProjectCareers[0].Career.name, 'Ingeniería en Informática')
        done()
      }).catch(done)
  })

  it('Obtain all projects students', (done) => {
    request(app)
      .get('/v0/api/projects/students')
      .set({ 'Authorization': TOKENS.STUDENT, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data.Creations.length, 0)
        assert.equal(response.body.data.Participations.length, 1)
        request(app)
          .get('/v0/api/projects/students')
          .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
          .expect(200)
          .then(response => {
            assert.equal(response.body.data.Creations.length, 1)
            assert.equal(response.body.data.Participations.length, 0)
            done()
          }).catch(done)
      }).catch(done)
  })

  it('Obtain all projects tutors', (done) => {
    request(app)
      .get('/v0/api/projects/tutors')
      .set({ 'Authorization': TOKENS.TUTOR, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data.Tutorials.length, 1)
        assert.equal(response.body.data.Cotutorials.length, 0)
        request(app)
          .get('/v0/api/projects/tutors')
          .set({ 'Authorization': TOKENS.COTUTOR, Accept: 'application/json' })
          .expect(200)
          .then(response => {
            assert.equal(response.body.data.Tutorials.length, 0)
            assert.equal(response.body.data.Cotutorials.length, 1)
            done()
          }).catch(done)
      }).catch(done)
  })

  it('Obtain project by id', (done) => {
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
        tutorRequestId = response.body.data.Tutor.TutorRequests[0].id
        assert.equal(response.body.data.Students[0].id, 2)
        assert.equal(response.body.data.Students[0].email, 'naraya@fi.uba.ar')
        assert.equal(response.body.data.Students[0].StudentRequests.length, 1)
        studentRequestId = response.body.data.Students[0].StudentRequests[0].id
        assert.equal(response.body.data.Cotutors[0].id, 7)
        assert.equal(response.body.data.Cotutors[0].email, 'arrowgamemaster@gmail.com')
        assert.equal(response.body.data.Cotutors[0].TutorRequests[0].type, 'cotutor')
        cotutorRequestId = response.body.data.Cotutors[0].TutorRequests[0].id
        assert.equal(response.body.data.ProjectCareers[0].Career.id, 1)
        assert.equal(response.body.data.ProjectCareers[0].Career.name, 'Ingeniería en Informática')
        assert.equal(response.body.data.ProjectCareers[0].judge_id, null)
        done()
      }).catch(done)
  })

  it('Edit some fiedls project', (done) => {
    request(app)
      .put(`/v0/api/projects/${projectId}`)
      .send({ 'type_id': 2,
        'careers': [1, 2] })
      .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
      .expect(201)
      .then(response => {
        assert.equal(response.body.data, projectId)
        request(app)
          .get(`/v0/api/projects/${projectId}`)
          .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
          .expect(200)
          .then(response => {
            assert.equal(response.body.data.id, projectId)
            assert.equal(response.body.data.Type.id, 2)
            assert.equal(response.body.data.Type.name, 'Tesis')
            assert.equal(response.body.data.ProjectCareers.length, 2)
            done()
          }).catch(done)
      }).catch(done)
  })

  it('Tutor accept request project', (done) => {
    request(app)
      .put(`/v0/api/requests/tutors/${tutorRequestId}`)
      .send({ 'status': 'accepted', 'type': 'tutor' })
      .set({ 'Authorization': TOKENS.TUTOR, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data, tutorRequestId)
        done()
      }).catch(done)
  })

  it('Student accept request project', (done) => {
    request(app)
      .put(`/v0/api/requests/students/${studentRequestId}`)
      .send({ 'status': 'accepted' })
      .set({ 'Authorization': TOKENS.STUDENT, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data.id, studentRequestId)
        assert.equal(response.body.data.status, 'accepted')
        done()
      }).catch(done)
  })

  it('Cotutor reject request project', (done) => {
    request(app)
      .put(`/v0/api/requests/tutors/${cotutorRequestId}`)
      .send({ 'status': 'rejected', 'type': 'cotutor' })
      .set({ 'Authorization': TOKENS.COTUTOR, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data.id, cotutorRequestId)
        assert.equal(response.body.data.status, 'rejected')
        done()
      }).catch(done)
  })

  it('Delete cotutor project', (done) => {
    request(app)
      .delete(`/v0/api/projects/${projectId}/tutors/7`)
      .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
      .then(response => {
        assert.equal(response.body.data, projectId)
        done()
      }).catch(done)
  })

  // CASO NO FELIZ TODOS LOS DE LA CC ACEPTAN LA PROPUESTA SALVO UNO

  it('Creator upload proposal', (done) => {
    request(app)
      .put(`/v0/api/projects/${projectId}/proposal`)
      .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
      .attach('file', './test/example.pdf', 'example.pdf')
      .expect(201)
      .then(response => {
        assert.equal(response.body.data[0], 1)
        done()
      }).catch(done)
  })

  it('Tutor accept proposal project', (done) => {
    request(app)
      .put(`/v0/api/requests/tutors/${tutorRequestId}`)
      .send({ 'accepted_proposal': 'accepted' })
      .set({ 'Authorization': TOKENS.TUTOR, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data.id, tutorRequestId)
        assert.equal(response.body.data.accepted_proposal, 'accepted')
        done()
      }).catch(done)
  })

  it('Student accept proposal project', (done) => {
    request(app)
      .put(`/v0/api/requests/students/${studentRequestId}`)
      .send({ 'accepted_proposal': 'accepted' })
      .set({ 'Authorization': TOKENS.STUDENT, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data.id, studentRequestId)
        assert.equal(response.body.data.accepted_proposal, 'accepted')
        request(app)
          .get(`/v0/api/projects/${projectId}`)
          .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
          .expect(200)
          .then(response => {
            assert.equal(response.body.data.id, projectId)
            assert.equal(response.body.data.State.id, 3)
            assert.equal(response.body.data.State.name, 'Propuesta en revisión')
            done()
          }).catch(done)
      }).catch(done)
  })

  it('Obtain all projects commission before revision', (done) => {
    request(app)
      .get('/v0/api/projects/commissions')
      .set({ 'Authorization': TOKENS.CURRICULAR, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data.length, 1)
        assert.equal(response.body.data[0].ProjectCareers.length, 2)
        done()
      }).catch(done)
  })

  it('Obtain all projects approved before revision', (done) => {
    request(app)
      .get('/v0/api/projects/commissions?approved=1')
      .set({ 'Authorization': TOKENS.CURRICULAR, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data.length, 0)
        done()
      }).catch(done)
  })

  it('Obtain all projects commission by career that dont match before revision', (done) => {
    request(app)
      .get('/v0/api/projects/commissions?career=3')
      .set({ 'Authorization': TOKENS.CURRICULAR, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data.length, 0)
        done()
      }).catch(done)
  })

  it('Curricular reject proposal of one career', (done) => {
    request(app)
      .put(`/v0/api/projects/${projectId}/assessments`)
      .send({ 'status': 'rejected', 'career': 2, 'reject_reason': 'Falta contenido' })
      .set({ 'Authorization': TOKENS.CURRICULAR, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data, projectId)
        request(app)
          .get(`/v0/api/projects/${projectId}`)
          .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
          .expect(200)
          .then(response => {
            assert.equal(response.body.data.ProjectCareers[0].status, 'pending')
            assert.equal(response.body.data.ProjectCareers[0].judge_id, null)
            assert.equal(response.body.data.ProjectCareers[1].reject_reason, 'Falta contenido')
            assert.equal(response.body.data.ProjectCareers[1].status, 'rejected')
            assert.equal(response.body.data.ProjectCareers[1].Judge.id, 7)
            assert.equal(response.body.data.ProjectCareers[1].Judge.email, 'arrowgamemaster@gmail.com')
            assert.equal(response.body.data.id, projectId)
            assert.equal(response.body.data.State.id, 3)
            assert.equal(response.body.data.State.name, 'Propuesta en revisión')
            done()
          }).catch(done)
      }).catch(done)
  })

  it('Curricular accept proposal of last career', (done) => {
    request(app)
      .put(`/v0/api/projects/${projectId}/assessments`)
      .send({ 'status': 'accepted', 'career': 1 })
      .set({ 'Authorization': TOKENS.CURRICULAR, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data, projectId)
        request(app)
          .get(`/v0/api/projects/${projectId}`)
          .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
          .expect(200)
          .then(response => {
            assert.equal(response.body.data.ProjectCareers[0].status, 'rejected')
            assert.equal(response.body.data.ProjectCareers[0].Judge.id, 7)
            assert.equal(response.body.data.ProjectCareers[1].status, 'accepted')
            assert.equal(response.body.data.ProjectCareers[1].Judge.id, 7)
            assert.equal(response.body.data.id, projectId)
            assert.equal(response.body.data.State.id, 2)
            assert.equal(response.body.data.State.name, 'Pendiente de propuesta')
            done()
          }).catch(done)
      }).catch(done)
  })

  it('Obtain all projects commission after rejected', (done) => {
    request(app)
      .get('/v0/api/projects/commissions')
      .set({ 'Authorization': TOKENS.CURRICULAR, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data.length, 0)
        done()
      }).catch(done)
  })

  // CASO FELIZ TODOS LOS DE LA CC ACEPTAN LA PROPUESTA

  it('Creator upload proposal', (done) => {
    request(app)
      .put(`/v0/api/projects/${projectId}/proposal`)
      .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
      .attach('file', './test/example.pdf', 'example.pdf')
      .expect(201)
      .then(response => {
        assert.equal(response.body.data[0], 1)
        done()
      }).catch(done)
  })

  it('Tutor accept proposal project', (done) => {
    request(app)
      .put(`/v0/api/requests/tutors/${tutorRequestId}`)
      .send({ 'accepted_proposal': 'accepted' })
      .set({ 'Authorization': TOKENS.TUTOR, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data.id, tutorRequestId)
        assert.equal(response.body.data.accepted_proposal, 'accepted')
        done()
      }).catch(done)
  })

  it('Student accept proposal project', (done) => {
    request(app)
      .put(`/v0/api/requests/students/${studentRequestId}`)
      .send({ 'accepted_proposal': 'accepted' })
      .set({ 'Authorization': TOKENS.STUDENT, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data.id, studentRequestId)
        assert.equal(response.body.data.accepted_proposal, 'accepted')
        request(app)
          .get(`/v0/api/projects/${projectId}`)
          .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
          .expect(200)
          .then(response => {
            assert.equal(response.body.data.id, projectId)
            assert.equal(response.body.data.State.id, 3)
            assert.equal(response.body.data.State.name, 'Propuesta en revisión')
            done()
          }).catch(done)
      }).catch(done)
  })

  it('Curricular accept proposal of one project', (done) => {
    request(app)
      .put(`/v0/api/projects/${projectId}/assessments`)
      .send({ 'status': 'accepted', 'career': 1 })
      .set({ 'Authorization': TOKENS.CURRICULAR, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data, projectId)
        request(app)
          .get(`/v0/api/projects/${projectId}`)
          .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
          .expect(200)
          .then(response => {
            assert.equal(response.body.data.ProjectCareers[0].status, 'pending')
            assert.equal(response.body.data.ProjectCareers[0].judge_id, null)
            assert.equal(response.body.data.ProjectCareers[1].status, 'accepted')
            assert.equal(response.body.data.ProjectCareers[1].Judge.id, 7)
            assert.equal(response.body.data.id, projectId)
            assert.equal(response.body.data.State.id, 3)
            assert.equal(response.body.data.State.name, 'Propuesta en revisión')
            done()
          }).catch(done)
      }).catch(done)
  })

  it('Curricular accept proposal of last project', (done) => {
    request(app)
      .put(`/v0/api/projects/${projectId}/assessments`)
      .send({ 'status': 'accepted', 'career': 2 })
      .set({ 'Authorization': TOKENS.CURRICULAR, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data, projectId)
        request(app)
          .get(`/v0/api/projects/${projectId}`)
          .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
          .expect(200)
          .then(response => {
            assert.equal(response.body.data.ProjectCareers[0].status, 'accepted')
            assert.equal(response.body.data.ProjectCareers[0].Judge.id, 7)
            assert.equal(response.body.data.ProjectCareers[1].status, 'accepted')
            assert.equal(response.body.data.ProjectCareers[1].Judge.id, 7)
            assert.equal(response.body.data.id, projectId)
            assert.equal(response.body.data.State.id, 4)
            assert.equal(response.body.data.State.name, 'Pendiente de presentación')
            done()
          }).catch(done)
      }).catch(done)
  })

  it('Obtain all projects commission after approved', (done) => {
    request(app)
      .get('/v0/api/projects/commissions')
      .set({ 'Authorization': TOKENS.CURRICULAR, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data.length, 0)
        done()
      }).catch(done)
  })

  it('Obtain all projects approved after approved', (done) => {
    request(app)
      .get('/v0/api/projects/commissions?approved=1')
      .set({ 'Authorization': TOKENS.CURRICULAR, Accept: 'application/json' })
      .expect(200)
      .then(response => {
        assert.equal(response.body.data.length, 1)
        assert.equal(response.body.data[0].ProjectCareers.length, 2)
        done()
      }).catch(done)
  })

  after((done) => {
    request(app)
      .delete(`/v0/api/projects/${projectId}`)
      .set({ 'Authorization': TOKENS.CREATOR, Accept: 'application/json' })
      .then(() => done())
  })
})
