const pizzas = require('../data/menu')


const index = (req, res) => {

  //console.log(req.query.ingredient);
  const ingredient = req.query.ingredient
  let filteredMenu = pizzas

  //console.log(ingredient);

  if (ingredient) {
    //console.log('I found the ingredient you need to filter the menu');
    filteredMenu = pizzas.filter(pizza => pizza.ingredients.includes(ingredient))
  }
  res.json(filteredMenu);
}

const show = (req, res) => {
  const id = Number(req.params.id)
  //console.log(typeof id);

  const foundPizza = pizzas.find(pizza => pizza.id === id)
  //console.log(foundPizza);

  if (!foundPizza) {
    //res.status(404)
    return res.status(404).json({
      error: true,
      message: 'Not found!'
    })
  }

  res.json(foundPizza);

}


const store = (req, res) => {


  // create a new object
  const newPizza = {
    id: Date.now(),
    ...req.body
  } 


  //console.log(newPizza);
  // push the 
  pizzas.push(newPizza)
  
  res.status(201).json(newPizza);
}


const update = (req, res) => {
  const pizzaId = Number(req.params.id)
  const pizzaData =  req.body

  const pizza = pizzas.find(pizza => pizza.id === pizzaId)
  //console.log(pizza);

  if (!pizza) {
    //res.status(404)
    return res.status(404).json({
      error: true,
      message: 'Not found!'
    })
  }


  // ?? 
  pizza.name = pizzaData.name
  pizza.ingredients = pizzaData.ingredients
  pizza.image = pizzaData.image

  //console.log(pizzaData, pizzaId, pizza);
  

  res.json(pizza);
}


const modify = (req, res) => {
  res.send(`Modify the pizza with id: ${req.params.id}`);
}


const destroy = (req, res) => {
  const id = Number(req.params.id)
  const foundPizza = pizzas.find(pizza => pizza.id === id)
  //console.log(foundPizza);

  if (!foundPizza) {
    //res.status(404)
    return res.status(404).json({
      error: true,
      message: 'Not found!'
    })
  }


  // remove the pizza from the menu
  // - splice + indexof
  pizzas.splice(pizzas.indexOf(foundPizza), 1)
  console.log(pizzas);

  res.sendStatus(204)

  //res.send(`Delete the pizza with id: ${req.params.id}`)

}



module.exports = {
  index,
  show,
  store, 
  update,
  modify,
  destroy
}