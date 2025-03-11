const port = 3000;  
const express = require("express");
const app = express();
const session = require("express-session"); 
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Product = require("./models/Product");  // Import model

//database connection mongodb
mongoose.connect("mongodb+srv://cuongtomato174:bzzZ1YOvHhvN2pz6@lab6.np7iv.mongodb.net/lab6")
.then(() => console.log("✅ Kết nối MongoDB thành công"))
.catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// Trang danh sách sản phẩm
app.get("/", async (req, res) => {
    const products = await Product.find();
    res.render("products", { products });
});

// Xem chi tiết sản phẩm
app.get("/product/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("product-detail", { product });
});

// Thêm sản phẩm vào giỏ hàng
app.post("/add-to-cart/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    let cart = req.session.cart || {};
    cart[req.params.id] = {
        product: product,
        quantity: cart[req.params.id] ? cart[req.params.id].quantity + 1 : 1
    };
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/cart");
});

// Xóa sản phẩm khỏi giỏ hàng
app.post("/remove-from-cart/:id", async (req, res) => {
    let cart = req.session.cart;
    delete cart[req.params.id];
    req.session.cart = cart;
    res.redirect("/cart");
});

// Trang giỏ hàng
app.get("/cart", async (req, res) => {
    let cart = req.session.cart || {};
    let cartItems = [];
    for (const item in cart) {
        cartItems.push(cart[item]);
    }
    res.render("cart", { cartItems });
});



// Thêm sản phẩm vào database
app.post("/add-product", async (req, res) => {
    const { name, price, category, image } = req.body;
    const newProduct = new Product({ name, price, category, image });
    await newProduct.save();
    res.redirect("/");
});

// Xóa sản phẩm
app.post("/delete-product/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

// Trang danh sách sản phẩm
app.get("/", async (req, res) => {
    try {
        const products = await Product.find(); // Lấy dữ liệu từ MongoDB
        res.render("products", { products });
    } catch (err) {
        res.send("Error loading products.");
    }
});

//tạo trang giỏ hàng
app.get("/cart", async (req, res) => {
    res.render("cart");
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});