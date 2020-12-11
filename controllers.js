const bcrypt = require("bcrypt")


const SALT_ROUNDS = 11


const listen = () => {
  console.log('server is listening')
}

const register = async (req, res) => {
  const password = req.body.formData.password
  const password_digest = await bcrypt.hash(password, SALT_ROUNDS)

  res.json(password_digest)
}

// try {
//   console.log(req.body)
//   const { username, email, password, admin_key } = req.body
//   const password_digest = await bcrypt.hash(password, SALT_ROUNDS)
//   const user = await new User({
//     username,
//     email,
//     password_digest,
//     admin_key
//   })
//   await user.save();

//   const payload = {
//     id: user._id,
//     username: user.username,
//     email: user.email
//   }

//   const token = jwt.sign(payload, TOKEN_KEY)
//   return res.status(201).json({ user, token })
// } catch (error) {
//   console.log("Error in signUp")
//   return res.status(400).json({ error: error.message })
// }
// }

module.exports = {
  listen,
  register
}