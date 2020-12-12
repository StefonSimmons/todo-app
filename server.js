const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

const { listen, register, signIn, verify } = require('./controllers')

// ======================
// Use Body-Parser and Cors
// ======================
app.use(bodyParser.json())
app.use(cors())


// ======================
// Express Routes for Responses
// ======================
app.listen(PORT, listen)
app.post('/users', register)
app.post('/sign-in', signIn)
app.get('/verify', verify)