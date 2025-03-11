const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

// mongoose.connect('mongodb+srv://<username>:<password>@clustercuong.xyz77.mongodb.net/shoppingonline?retryWrites=true&w=majority')
//     .then(() => console.log('Connected to MongoDB Atlas!'))
//     .catch(err => console.error('Error connecting to MongoDB:', err));


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Sample product data
const products = [
    { id: 1, name: "Coffee", price: 5 },
    { id: 2, name: "Latte", price: 6 },
    { id: 3, name: "Cappuccino", price: 7 }
];

let cart = [];

// Routes
app.get("/", (req, res) => {
    res.render("products", { products });
});

app.get("/product/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    res.render("product-detail", { product });
});

app.post("/add-to-cart", (req, res) => {
    const product = products.find(p => p.id == req.body.productId);
    if (product) cart.push(product);
    res.redirect("/");
});

app.get("/cart", (req, res) => {
    res.render("cart", { cart });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
