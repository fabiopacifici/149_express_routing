# Express CRUD Step by Step

This document describes the steps to start a new express project and perform the CRUD operations

**Steps**

- INITIALISE THE PROJECT
  - create a server.js file
  - initialize the project with `npm init -y`
  - install the dependencies

- CREATE THE EXPRESS SERVER
  - create the server logic
  - add your first route
  - update the package.json script section
  - Add the static assets middleware

- CRUD OPERATIONS
  - Add the body parser middleware
  - Add express router
  - Add controllers

## INITIALISE THE PROJECT

Steps to create your project

```bash
mkdir myexpress-server
cd myexpress-server
touch server.js
npm init -y
npm i express
```

## CREATE THE EXPRESS SERVER

Now inside the file server.js we add the server logic

```js
// import express
const express = require('express')
// create the express instance
const app = express()
// Set the port
const PORT = 3000


// Put the server on listening
app.listen(PORT, ()=>{
  console.log(`Server listening on localhost:${PORT}`)
})



// define your first route
app.get('/', (req, res) =>{
  res.send('This is your server index route! you must have it!!')
})

```

There are multiple methods to return the responst and close the connection:
send(), json()

Next we need to update the package.json to create an alias sript to start our node server

### update the package.json script section

Inside the `package.json` file

Ensure your scripts section has start and dev to run your server

```json

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js", 👈
    "dev": "node --watch server.js" 👈
  },

```

Now you can do `npm run dev` or `npm start` to run your server, however:

- start: does not update when file changes
- dev: does due to its `--watch` flag.

### Add the static assets middleware

To serve stati c assets like images you need to register the middleware in your main server entry point `server.js` in this case

```js
// register the static assets
app.use(express.static('public'))

```

### Final server js

Your final server js file should now look like this:

```js
// import express
const express = require('express')
// create the express instance
const app = express()
// Set the port
const PORT = 3000


// register the static assets
app.use(express.static('public')) 


// Put the server on listening
app.listen(PORT, ()=>{
  console.log(`Server listening on localhost:${PORT}`)
})



// define your first route
app.get('/', (req, res) =>{
  res.send('This is your server index route! you must have it!!')
})

// Other routes here 👇

```

## CRUD OPERATIONS

Now we need to add routes to perform cruds on our entities, for example `users`

TODO:

- Add the body parser middleware
- Add express router
- Add controllers

First let's add the body parser so that it is set for later.

```js

// static assets middleware here
// ...
// register the body parser
app.use(express.json())

// rest of the file ...

```

Now lets define our router in a dedicated file

### Add express router

Add the code below to a dedicated `routes/users.js` file

```js
const express = require('express')
// create an instance of the router application (mini-app)
const router = express.Router()


// define all your routes here
// 👇...



// export it using commonjs so that we can reuse it later
module.exports = router
```

### Index route (users)

LEts start wiuth the index route first

```js
const express = require('express')
// create an instance of the router application (mini-app)
const router = express.Router()


// define all your routes here
// 👇...
router.get('/', (req, res)=>{
  res.send('show all users here')
})


// export it using commonjs so that we can reuse it later
module.exports = router

```

Next lets' do the remaining routes

### Show route (users)

LEts start wiuth the index route first

```js
const express = require('express')
// create an instance of the router application (mini-app)
const router = express.Router()

//.. other routes

// Show Route 
router.get('/:id', (req, res)=>{
  res.send('show all users here' + req.params.id)
})


// export it using commonjs so that we can reuse it later
module.exports = router

```

### Store route (users)

LEts start wiuth the index route first

```js
const express = require('express')
// create an instance of the router application (mini-app)
const router = express.Router()

//.. other routes

// Store Route 
router.post('/', (req, res)=>{
  res.send('Save the user in the system')
})


// export it using commonjs so that we can reuse it later
module.exports = router

```

### Update route (users)

LEts start wiuth the index route first

```js
const express = require('express')
// create an instance of the router application (mini-app)
const router = express.Router()

//.. other routes

// Update Route 
router.put('/:id', (req, res)=>{
  res.send('update the user' + req.params.id)
})


// export it using commonjs so that we can reuse it later
module.exports = router

```

### Destroy route (users)

LEts start wiuth the index route first

```js
const express = require('express')
// create an instance of the router application (mini-app)
const router = express.Router()

//.. other routes

// Destroy Route 
router.delete('/:id', (req, res)=>{
  res.send('delete the user' + req.params.id)
})


// export it using commonjs so that we can reuse it later
module.exports = router

```

### Final router

```js

const express = require('express')
// create an instance of the router application (mini-app)
const router = express.Router()


// define all your routes here
//index
router.get('/', (req, res)=>{
  res.send('show all users here')
})

// Show Route 
router.get('/:id', (req, res)=>{
  res.send('show all users here' + req.params.id)
})

// Store Route 
router.post('/', (req, res)=>{
  res.send('Save the user in the system')
})

// Update Route 
router.put('/:id', (req, res)=>{
  res.send('update the user' + req.params.id)
})
// Destroy Route 
router.delete('/:id', (req, res)=>{
  res.send('delete the user' + req.params.id)
})

// export it using commonjs so that we can reuse it later
module.exports = router
```

### Register your router in the main server app

back inside server.js you need to import the router and regster it on a path

impoort at the top of the server.js file

```js
const userRouter = require('./routes/user')

```

> Note the dedicated folder for the `routes/`

use the router

```js
// Other routes here 👇
app.use('/api/users', usersRouter)
```

### Final server.js

```js

// import express
const express = require('express')
// create the express instance
const app = express()
// Set the port
const PORT = 3000
// import the routers
const userRouter = require('./routes/user')


// register the static assets
app.use(express.static('public')) 


// Put the server on listening
app.listen(PORT, ()=>{
  console.log(`Server listening on localhost:${PORT}`)
})


// define your first route
app.get('/', (req, res) =>{
  res.send('This is your server index route! you must have it!!')
})

// Other routes here 👇
app.use('/api/users', usersRouter)
```

## Refactoring with a controller

Now let's organize our code and use a dedicated controller file to group all the CRUD functions

```js

const index  = (req, res)=>{
  res.send('show all users here')
}

// Show Route 
const show = (req, res)=>{
  res.send('show all users here' + req.params.id)
}

// Store Route 
const store = (req, res)=>{
  res.send('Save the user in the system')
}

// Update Route 
const update = (req, res)=>{
  res.send('update the user' + req.params.id)
}

// Destroy Route 
const destroy =  (req, res)=>{
  res.send('delete the user' + req.params.id)
}


module.exports = {
  index,
  show, 
  store,
  update,
  destroy
}


```

Once all function have been defined we can import the controller and replace the logic insdie the router

inside usersRouter.js

```js

const express = require('express')
// create an instance of the router application (mini-app)
const router = express.Router()
const userController = require('../controllers/userController.js')

// define all your routes here
//index
router.get('/', userController.index)

// Show Route 
router.get('/:id', userController.show)

// Store Route 
router.post('/', userController.store)

// Update Route 
router.put('/:id', userController.update)
// Destroy Route 
router.delete('/:id', userController.destroy)

// export it using commonjs so that we can reuse it later
module.exports = router
```
