const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose')
const GalleryItem = require('./models/galleryItem')
var cors = require('cors')

const DbUri = `mongodb+srv://${process.env.username}:${process.env.password}@mongofirst.sd25r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const app = express()

app.use(cors())

mongoose.connect(DbUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
  console.log('Database connected')
  app.listen(5000, () => {
    console.log('listening at http:localhost:5000');
  })
})

app.use(express.static('public'))
app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

app.get('/', (req, res) => {
  GalleryItem.find()
    .then(result => {
      console.log(result)
      res.render('pages/index', { result })
    })
    .catch(err => console.log(err))
})
app.get('/addNew', (req, res) => {
  res.render('pages/newItem')
})
app.post('/new', (req, res) => {
  // console.log(req.body)
  // const newItem={
  //     url:'https://images.unsplash.com/photo-1618249984219-d49807f8530a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  //     author:'Andrey Mm',
  //     rating:7
  // }
  // const newGalleryItem=new GalleryItem(newItem)
  // console.log(typeof req.body.rating)
  const newGalleryItem = new GalleryItem({
    url: req.body.url,
    author: req.body.author,
    rating: Number(req.body.rating)
  })
  newGalleryItem.save()
    .then(result => res.redirect('/'))
    .catch(err => console.log(err))
  //res.redirect('/')
})

app.get('/item/:id', (req, res) => {
  // res.send(req.params.id)
  GalleryItem.findById(req.params.id)
    .then(result => {
      res.render('pages/oneItem', { result })
    }).catch(err => console.log(err))
})

app.get('/updateItem/:id', (req, res) => {
  GalleryItem.findById(req.params.id)
    .then(result => {

      res.render('pages/updateItem', { result })
    }).catch(err => console.log(err))

})


//Update with Post
app.post('/update', (req, res) => {
  //res.send(req.body)
  GalleryItem.findByIdAndUpdate(req.body.id, { url: req.body.url, author: req.body.author, rating: req.body.rating })
    .then(result => {
      // res.send(result)  Best way ever to test
      res.redirect('/')
    }).catch(err => console.log(err))
})
//delete with get method
app.get('/delete/:id', (req, res) => {
  // res.send(req.params.id)
  GalleryItem.findByIdAndDelete(req.params.id)
    .then(result => {
      // res.send(result)  Best way ever to test
      res.redirect('/')
    }).catch(err => console.log(err))
})
app.delete('/delete1/:id', (req, res) => {
  // res.send(req.params.id)
  GalleryItem.findByIdAndDelete(req.params.id)
    .then(result => {
      res.send('deleted')
    }).catch(err => console.log(err))
})
