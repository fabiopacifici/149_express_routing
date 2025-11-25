const express = require('express')
const router = express.Router()



// index
router.get('/', (req, res) => {
  res.send('Show all drinks here');
})

// show
router.get('/:id', (req, res) => {
  res.send(`Show the drink with id: ${req.params.id}`);
})

// store
router.post('/', (req, res) => {
  res.send('Store a new drink here');
})

// update
router.put('/:id', (req, res) => {
  res.send(`Update the drink with id: ${req.params.id}`);
})

// modify (optional)
router.patch('/:id', (req, res) => {
  res.send(`Modify the drink with id: ${req.params.id}`);
})


// destroy
router.delete('/:id', (req, res) => {
  res.send(`Delete the drink with id: ${req.params.id}`)
})


module.exports = router