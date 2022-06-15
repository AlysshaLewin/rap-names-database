//REQUIRE DEPENDENCIES
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

//DECLARED DB VARIABLES
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'rap-names-api'

//CONNECTED TO MONGODB   
MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database 😉`)
        db = client.db(dbName)
    })

//SET MIDDLEWARE(COMES FIRST BEFORE REQUESTS OR ELSE WONT WORK)   
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//CRUD-READ(GET)(DISPLAYS HOMEPAGE)
app.get('/', (request, response) => {
    let contents = db.collection('rapper-info').find().toArray()
        .then(data => {
            let nameList = data.map(item => item.name)
            console.log(nameList)
            response.render('index.ejs', { info: nameList })
        })
        .catch(error => console.error(error))
})

//CRUD-CREATE(POST)
app.post('/api', (request, response) => {
    console.log('Post Heard')
    db.collection('rapper-info').insertOne(
        request.body
    )
    .then(result => {
        console.log(result)
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

//CRUD-UPDATE(PUT)
app.put('/updateEntry', (request, response) => {
    console.log(request.body)
    Object.keys(request.body).forEach(key => {
        if (request.body[key] === null || request.body[key] === undefined || request.body[key] === "") {
          delete request.body[key]
        }
    })
    console.log(request.body)
    db.collection('rapper-info').findOneAndUpdate(
        {name: request.body.name},
        {
            $set:  request.body  
        }
    )
    .then(result => {
        console.log(result)
        response.json('Success')
    })
    .catch(error => console.error(error))
})

//CRUD-DELETE(DELETE)
app.delete('/deleteEntry', (request, response) => {
    db.collection('rapper-info').deleteOne(
        {name: request.body.name}
    )
    .then(result => {
        console.log('Entry Deleted')
        response.json('Entry Deleted')
    })
    .catch(error => console.error(error))
})


//SET UP LOCALHOST ON PORT
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT} 😀`)
})