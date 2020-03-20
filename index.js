const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const UserModel = require('./user.model')
const express = require('express')
const app = express()
const port = 4000

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

  mongoose.connection.openUri(`mongodb://localhost:27017/reviv4lgamingDB`, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true,
    autoIndex: true,
  })


const db = mongoose.connection

db.on('error', err => {
  console.log('FAILED TO CONNECT', err)
  process.exit(1)
})



app.use((req, res, next) => {

  // NOTE: Should modify k8s/configs/service.yml too
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Request-Method', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, x-access-token, X-Expiry, X-Client, X-Access-Token, X-pass, X-Uuid, Content-Type, Authorization, x-access-id')

  next()
})
db.once('open', async () => {

  app.get('/', (req, res) => res.send('Hello World!'))

// http://localhost:3000/createAccount?email=henri@ballin.co&password=mpd1234
  app.get('/createAccount', async (req, res) => {
    console.log(req.query);

    const hash = await bcrypt.hash(req.query.password, 10)
    const myUser = new UserModel({
      email: req.query.email,
      password: hash,
    })

    await myUser.save()
    res.send('Account created')

  })

  app.listen(port, () => console.log(`Example app listening on port ${port}!`))




})

//
// /*CREATE USER */
// const myUser = new UserModel({
//   email: 'toto@live.com',
//   password: 'totoPassword',
// })
// await myUser.save()
// /*CREATE USER */
//
//
// /* FIND USER */
// const user = await UserModel.findOne({email: 'toto@live.com'})
// console.log('user =>',user);
//
//
// /*UPDATE USER*/
// await UserModel.findOneAndUpdate({email: 'toto@live.com'}, {password: '1234'})
//
//
// const newUser = await UserModel.findOne({email: 'toto@live.com'})
// console.log('user =>',newUser);
