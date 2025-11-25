const express = require('express')
// create an instance of the router application (mini-app)
const router = express.Router()


// index
router.get('/', (req, res) => {
  res.send('Show all pizzas here');
})

// show
router.get('/:id', (req, res) => {
  res.send(`Show the pizza with id: ${req.params.id}`);
})

// store
router.post('/', (req, res) => {
  res.send('Store a new pizza here');
})

// update
router.put('/:id', (req, res) => {
  res.send(`Update the pizza with id: ${req.params.id}`);
})

// modify (optional)
router.patch('/:id', (req, res) => {
  res.send(`Modify the pizza with id: ${req.params.id}`);
})


// destroy
router.delete('/:id', (req, res) => {
  res.send(`Delete the pizza with id: ${req.params.id}`)
})




// export it using commonjs so that we can reuse it later
module.exports = router