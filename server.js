const express = require('express')
const app = express()
const PORT = 3000
const pizzasRouter = require('./routes/pizzas')
const drinksRouter = require('./routes/drinks')
const logger = require('./middlewares/logger')
const serverError = require('./middlewares/serverError')
const notFound = require('./middlewares/notFound')
const pizzas = require('./data/menu')

// register the static assets
app.use(express.static('public'))

// register the body parser
app.use(express.json())


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})

// 1️⃣ Define your middleware

/* function logger(req, res, next) {
  //console.log(req);

  console.log(`[${new Date().toLocaleString()}] - Method: ${req.method} | Url ${req.originalUrl}`);
  next()

}

function printMe(req, res, next) {
  console.log('me');
  next()

}
 */

// 2️⃣ Register your middleware
// - global middleware app.use()
app.use(logger)
// globan on a given path
//app.use('/api', logger)


// - route level middleware app.get(path, middeware, gestore)
// - route level middleware app.get(path, middeware, gestore)
/* option 1
app.get('/',
  (req, res, next) => {
    console.log('I am a middleware');
    next()

  },
  (req, res, next) => {
    console.log('I am another middleware');
    next()

  },
  (req, res) => {
    console.log('After the print me middleware');

    res.send('Welcome to my pizzeria API server')
  })


  // option 2   👇
  app.get('/', logger, 
  (req, res) => {
    console.log('After the print me middleware');

    res.send('Welcome to my pizzeria API server')
  })
// option 3

  app.get('/', [logger, printMe], 
    (req, res) => {
      console.log('After the print me middleware');

      res.send('Welcome to my pizzeria API server')
    })
*/


// - router level middleware router.get(path, middlweare, gestore)

// Server Entry point
app.get('/', (req, res) => {
  //console.log('After the print me middleware');
  //app.daje();

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



app.use(serverError)
app.use(notFound)