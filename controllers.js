require("dotenv").config() // onnce installed, i can access variables rom .env 
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = 11
const TOKEN_KEY = process.env.TOKEN_KEY
// LISTEN
const listen = () => {
  console.log('server is listening')
}

// REGISTER
const register = async (req, res) => {
  const credentials = req.body.registrationCred
  const password = credentials.password 

  const password_digest = await bcrypt.hash(password, SALT_ROUNDS) // hash password

  const payload = {email: credentials.email}
  const token = jwt.sign(payload, TOKEN_KEY) // encrypt email payload

  res.json({ password_digest, token }) //respond with hashed password and encrupted payload/token
}

// SIGN-IN
const signIn = async (req, res) => {
  const loginCredentials = req.body.loginAuth
  const password = loginCredentials.password
  const password_digest = loginCredentials.password_digest
  if (await bcrypt.compare(password, password_digest)) {
    res.status(201).json({ user: true })
  } else {
    res.status(401).send("Invalid Credentials");
  }
}
// VERIFY
const verify = (req, res) => {
  // 'req.header' grabs the header from the request which value is 'Bearer <token>'
  // <token> was set in localstorage so we can grab it now

  const token = req.header('authorization').split(' ')[1] // grabs the token from the header
  const decodedToken = jwt.verify(token, TOKEN_KEY) // decodes the token obj
  res.json(decodedToken.email) // responds with decoded value
}

module.exports = {
  listen,
  register,
  signIn,
  verify
}