const pizzas = require('../data/menu')
const connection = require('../database/connection')

const index = (req, res) => {

  const sql = 'SELECT * FROM pizzas'

  connection.query(sql, (err, results)=>{
    //console.log(err, results);
    if(err) return res.status(500).json({error: true, message: err.message})

  
    res.json(results)
  })





  //console.log(req.query.ingredient);
 /*  const ingredient = req.query.ingredient
  let filteredMenu = pizzas

  //console.log(ingredient);

  if (ingredient) {
    //console.log('I found the ingredient you need to filter the menu');
    filteredMenu = pizzas.filter(pizza => pizza.ingredients.includes(ingredient))
  } */
/*   res.json(filteredMenu); */
}

const show = (req, res) => {
 //return res.send('show pizza')
  const id = Number(req.params.id)
  //console.log(typeof id);
  
  const sql = 'SELECT * FROM pizzas WHERE id = ?'
  const sqlIngredients = 'SELECT ingredients.id, ingredients.name FROM ingredients JOIN ingredient_pizza ON ingredient_pizza.ingredient_id = ingredients.id WHERE ingredient_pizza.pizza_id = ?'
  //console.log(sql, id);

  connection.query(sql, [id], (err, response) =>{
    if (err) return res.status(500).json({ error: true, message: err.message })
    if(response.length === 0) return res.status(404).json({error: true, message: 'Pizza Not Found'})
      
    const pizza = response[0]
    //console.log(pizza);
  
    connection.query(sqlIngredients, [id], (errIngredients, resIngredients)=> {
      if (errIngredients) return res.status(500).json({ error: true, message: errIngredients.message })

      console.log(errIngredients, resIngredients, pizza);

      pizza['ingredients'] = resIngredients
      
      res.json(pizza)
    })
    
  })




 /*  const foundPizza = pizzas.find(pizza => pizza.id === id)
  //console.log(foundPizza);

  if (!foundPizza) {
    //res.status(404)
    return res.status(404).json({
      error: true,
      message: 'Not found!'
    })
  }

  res.json(foundPizza); */

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


  // This Number can sometimes prevent sql injections (but not enoguh)
  const id = Number(req.params.id)

  // ⚠️ SQL injection
  const sql = 'DELETE FROM pizzas WHERE id = ?'
  console.log(sql, id);
  
  connection.query(sql, [id], (err, results)=>{
    if(err) return res.status(500).json({error: true, message: err.message})
    // You can use results.affectedRows to check if the record was already deleted in needed
    console.log(results);
    return res.sendStatus(204)
  })


  //res.send(`You want to delete pizza with id: ${id}`)


  /* const foundPizza = pizzas.find(pizza => pizza.id === id)
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

  //res.send(`Delete the pizza with id: ${req.params.id}`) */

}



module.exports = {
  index,
  show,
  store, 
  update,
  modify,
  destroy
}