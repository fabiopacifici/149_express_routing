const express = require('express')
const app = express()
const PORT = 3000
const pizzasRouter = require('./routes/pizzas')
const drinksRouter = require('./routes/drinks')

// register the static assets
app.use(express.static('public'))

// register the body parser
app.use(express.json())


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})


// Server Entry point
app.get('/', (req, res) => {
  res.send('Welcome to my pizzeria API server')
})


// 📌🍕 Resourse: Pizza
app.use('/api/pizzas', pizzasRouter)
/* 
// index
app.get('/api/pizzas', (req, res) => {
  res.send('Show all pizzas here');
})

// show
app.get('/api/pizzas/:id', (req, res)=>{
  res.send(`Show the pizza with id: ${req.params.id}`);
})

// store
app.post('/api/pizzas', (req, res) =>{
  res.send('Store a new pizza here');
})

// update
app.put('/api/pizzas/:id', (req, res)=>{
  res.send(`Update the pizza with id: ${req.params.id}`);
})

// modify (optional)
app.patch('/api/pizzas/:id', (req, res) => {
  res.send(`Modify the pizza with id: ${req.params.id}`);
})


// destroy
app.delete('/api/pizzas/:id', (req, res)=>{
  res.send(`Delete the pizza with id: ${req.params.id}`)
})
 */


// 📌🍺 Resourse: Drinks

app.use('/api/drinks', drinksRouter)

/* 

// index
app.get('/api/drinks', (req, res) => {
  res.send('Show all drinks here');
})

// show
app.get('/api/drinks/:id', (req, res) => {
  res.send(`Show the drink with id: ${req.params.id}`);
})

// store
app.post('/api/drinks', (req, res) => {
  res.send('Store a new drink here');
})

// update
app.put('/api/drinks/:id', (req, res) => {
  res.send(`Update the drink with id: ${req.params.id}`);
})

// modify (optional)
app.patch('/api/drinks/:id', (req, res) => {
  res.send(`Modify the drink with id: ${req.params.id}`);
})


// destroy
app.delete('/api/drinks/:id', (req, res) => {
  res.send(`Delete the drink with id: ${req.params.id}`)
}) */