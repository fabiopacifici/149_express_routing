const express = require('express')
// create an instance of the router application (mini-app)
const router = express.Router()
const pizzaController = require('../controllers/pizzaController')

// index
router.get('/', pizzaController.index )

// show
router.get('/:id', pizzaController.show )

// store
router.post('/', pizzaController.store )

// update
router.put('/:id', pizzaController.update)

// modify (optional)
router.patch('/:id', pizzaController.modify )


// destroy
router.delete('/:id', pizzaController.destroy)



// export it using commonjs so that we can reuse it later
module.exports = router