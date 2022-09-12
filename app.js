const express = require('express')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')
//initialize app
const app =  express()
app.use(express.json())

//database
let db
connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('app listening on port 3k')
        })
        db = getDb( )
    }
})


// route 
app.get('/books', (req, res) => {
    let books = []

    //when we iterate and get a book, we store it in to an empty array 
    // then send a response

    db.collection('books')
      .find()
      .sort({ author: 1 })
      .forEach(book => books.push(book))
      .then(()=> {
        res.status(200).json(books)
      })
      .catch(() =>{
        res.status(500).json({error: 'Couldn\'t fetch the books'})
      })
    //json response to the asker
})  

app.get('/books/:id', (req, res) => {
  
if(ObjectId.isValid(req.params.id))  
  {
    db.collection('books')
      .findOne({_id: ObjectId( req.params.id )})
      .then(doc => {
        res.status(200).json(doc)
      })
      .catch(err => {
        res.status(500).json({error: 'Couldn\'t fetch the books'})
      })
  }else{
     res.status(500).json({error: 'not valid id'})
  }
}) 
app.post('/books', (req,res) => {
  const book = req.body

  db.collection('books')
    .insertOne(book)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({err: 'could not insert'})
    })
})
app.delete('/books/:id', (req,res) => {
  if(ObjectId.isValid(req.params.id))  
  {
    db.collection('books')
      .deleteOne({_id: ObjectId( req.params.id )})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({error: 'Couldn\'t delete the books'})
      })
  }
  else{
     res.status(500).json({error: 'not valid id'})
  }
})
app.patch('/books/:id', (req,res) => {
  const updates = req.body
  if(ObjectId.isValid(req.params.id))  
  {
    db.collection('books')
      .updateOne({_id: ObjectId( req.params.id )},{$set: updates})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({error: 'Couldn\'t patch the books'})
      })
  }
  else{
     res.status(500).json({error: 'not valid id'})
  }
})