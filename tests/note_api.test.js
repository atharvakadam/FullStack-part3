const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Note = require('../models/note')

beforeEach(async () => {
    await Note.deleteMany({})
    console.log('cleared')
  
    // This is the solution if the promises were to be executed in a sequential order.
    // for (let note of helper.initialNotes) {
    //     let noteObject = new Note(note)
    //     await noteObject.save()
    // }
    const noteObjects = helper.initialNotes.map(note => new Note(note))
    const promiseArray = noteObjects.map(note => note.save())
    await Promise.all(promiseArray)
    console.log('done')
})

describe('note api test', () => {
    
    test('notes are returned as json', async () => {
        await api.get('/api/notes').expect(200).expect('Content-Type', /application\/json/)
    })

    test('there are two notes', async () => {
        // eslint-disable-next-line no-unused-vars
        const result = api.get('/api/notes').then(response => {
            console.log(response.body)
        })
        const res = await api.get('/api/notes')
        expect(res.body).toHaveLength(2)
    })
  
    test('the first note is about HTTP methods', async () => {
        const response = await api.get('/api/notes')
    
        expect(response.body[0].content).toBe('HTML is easy')
    })

    test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/notes')
      
        const contents = response.body.map(r => r.content)
      
        expect(contents).toContain(
            'Browser can execute only Javascript'
        )
    })

    test('a valid note can be added', async () => {
        const newNote = {
            content: 'async/await simplifies making async calls',
            important: true,
            date: Date()
        }
      
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(200)
            .expect('Content-Type', /application\/json/)
      
        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

        const contents = notesAtEnd.map(r => r.content)
        expect(contents).toContain(
            'async/await simplifies making async calls'
        )
    })

    test('note without content is not added', async () => {
        const newNote = {
            important: true
        }
      
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)
      
        const notesAtEnd = await helper.notesInDb()

        expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })
      
    test('a specific note can be viewed', async () => {
        const notesAtStart = await helper.notesInDb()
      
        const noteToView = notesAtStart[0]
        console.log(noteToView)
        // noteToView.date = noteToView.date + ''
      
        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
      
        expect(resultNote.body).toEqual({
            content: 'HTML is easy',
            important: false,
            date: new Date(Date.parse(noteToView.date)).toISOString(),
            id: noteToView.id
        })
    })
      
    test('a note can be deleted', async () => {
        const notesAtStart = await helper.notesInDb()
        const noteToDelete = notesAtStart[0]
      
        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)
      
        const notesAtEnd = await helper.notesInDb()
      
        expect(notesAtEnd).toHaveLength(
            helper.initialNotes.length - 1
        )
      
        const contents = notesAtEnd.map(r => r.content)
      
        expect(contents).not.toContain(noteToDelete.content)
    }) 

})



afterAll(() => {
    mongoose.connection.close()
})