const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const Note = require('./models/note')

const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

let notes = [
  {
    "id": 1,
    "content": "HTML is easy",
    "date": "2019-05-30T17:30:31.098Z",
    "important": true
  },
  {
    "id": 2,
    "content": "Browser can execute only Javascript",
    "date": "2019-05-30T17:30:31.098Z",
    "important": true
  },
  {
    "id": 3,
    "content": "GET and POST are the most important methods of HTTP protocol",
    "date": "2019-05-30T17:30:31.098Z",
    "important": true
  },
  {
    "id": 4,
    "content": "POST is used to add data to a REST api",
    "date": "2019-05-30T17:30:31.098Z",
    "important": true
  }
]

/*app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})*/

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes.map(note => note.toJSON()))
  })
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })

    note.save().then(savedNote => {
      response.json(savedNote)
    })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })  
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id) 

  response.status(204).end()
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})  