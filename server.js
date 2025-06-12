// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  return res.send('<div><h1> Hello World </h1> <p> Welcome to the Product API! Go to /api/products to see all products.</p></div> ');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
// GET /api/products/:id - Get a specific product
// POST /api/products - Create a new product
// PUT /api/products/:id - Update a product
// DELETE /api/products/:id - Delete a product

// Example route implementation for GET /api/products
app.get('/api/products', (req, res) => {
  res.status(200).json({success: true, data: products});
});

app.get('/api/products/:id', (req,res)=>{
  // get route parameters from request
  console.log(req.params)
  const {id} = req.params; // the param must be exact to whats given in the id
  // by default the id param is of type string
  console.log(id)
  console.log(typeof(id));
  // use find to get the product with the id : javascript array method
  // find method returns the first product that matches with the id:(unique for each product)
  // if not returns undefined 
  const foundProduct = products.find((productItem)=>{return productItem.id == id})
  if (foundProduct)
  {
    res.status(200).json({success: true, data: foundProduct})
  }
  else
  {
    res.status(200).json({success: false, msg: `No product was found with the id : ${id}`})
  }
})

app.post("/api/products", (req,res)=>{
  const { id, name, description, price, category, instock} =  req.body;
  // products is an array : modifiable: let
  // how to append data to javascript array : push()
  products.push({id, name, description, price,  category, instock});
  res.json({success: true, msg: "New Product has been Added" , data: products});
  console.log(products);
})


app.put("/api/products/:id", (req, res)=>{
  // get product detail to change from body
  const {name, description, price, category, instock} =  req.body;
  
  // get the route parameter === for a given product || update product based on the id
  const {id} = req.params;
  // find the product
  const foundProduct = products.find((productItem)=>{return productItem.id == id});
  if (foundProduct)
  {
    // check if req.body is undefined
  
    if (name)
    {
      foundProduct.name = name;
    }
    else if (description)
    {
      foundProduct.description = description;
    }
    else if (price)
    {
      foundProduct.price = price;
    }
    else if (category)
    {
      foundProduct.category = category;
    }
    else if (instock)
    {
      foundProduct.inStock = instock;
    }
    else if (!name || !description || !price || !category || !instock)
    {
      return res.status(200).send("<p>No new details for the product ${id} was given</p>")
    }
  }
  else
  {
    return res.status(200).json({success: false, msg: `No product with id : ${id} found! Try with another id`})
  }
  console.log(products)
  return res.json({success: true, msg:`Product with id : ${id} has been updated`, data: products})
})

app.delete("/api/products/:id", (req, res)=>{
  // get parameter
  const {id} = req.params;

   // we will use filter : returns a new array that meet the given condition in the callback function
  const foundProducts = products.filter((productItem)=>{return productItem.id != id});

  products  = foundProducts;
  if (foundProducts)
  {
    return res.status(200).json({success: true, msg: `Product with id: ${id} has been deleted`, data: products});
  }
  else
  {
    return res.status(200).json({success: false, msg:`No product with the ${id} has been found`});
  }
})
// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
// module.exports = app; 