const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({})
    response.json(notes.map(note => note.toJSON()))

    // Note.find({}).then(notes => {
    //     response.json(notes.map(note => note.toJSON()))
    // })
})

notesRouter.get('/:id', async (request, response) => {
    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note.toJSON())
    } else {
        response.status(404).end()
    }


    // Note.findById(request.params.id).then(note => {
    //     if (note) {
    //         response.json(note.toJSON())
    //     } else {
    //         response.status(404).end()
    //     }
    // }).catch(error => next(error))
})

notesRouter.post('/', async (request, response) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })

    const savedNote = await note.save()
    response.json(savedNote.toJSON())
    // try { 
        
    // } 
    // catch(exception) {
    //     next(exception)
    // }
    // note.save().then(savedNote => {
    //     response.json(savedNote.toJSON())
    // }).catch(error => next(error))
})

notesRouter.delete('/:id',async (request, response) => {

    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()

    // Note.findByIdAndRemove(request.params.id).then(() => {
    //     response.status(204).end()
    // }).catch(error => next(error))
})

notesRouter.put('/:id',async (request, response) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
    response.json(updatedNote.toJSON())

    // Note.findByIdAndUpdate(request.params.id, note, { new: true }).then(updatedNote => {
    //     response.json(updatedNote.toJSON())
    // }).catch(error => next(error))
})

module.exports = notesRouter