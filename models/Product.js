const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,  // Ví dụ: "Áo", "Quần", "Giày"
    image: String      // Link ảnh sản phẩm
});

module.exports = mongoose.model("Product", productSchema);
