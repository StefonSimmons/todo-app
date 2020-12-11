const bcrypt = require("bcrypt")


const SALT_ROUNDS = 11


const listen = () => {
  console.log('server is listening')
}

const register = async (req, res) => {
  const password = req.body.registrationCred.password
  const password_digest = await bcrypt.hash(password, SALT_ROUNDS)

  res.json(password_digest)
}

const signIn = async (req, res) => {
  const loginCredentials = req.body.loginAuth
  const password = loginCredentials.password
  const password_digest = loginCredentials.password_digest
  if (await bcrypt.compare(password, password_digest)) {
    console.log('WORKS!')
  } else {
    res.status(401).send("Invalid Credentials");
  }

}

module.exports = {
  listen,
  register,
  signIn
}