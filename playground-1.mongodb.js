


use('Products');
db.createCollection("products");

// inserting datas

db.products.insertMany([
    {
        "product_name": "Smartphone",
        "brand": "BrandX",
        "price": 599.99,
        "stock_quantity": 100,
        "category": ["Electronics", "Mobile"],
        "attributes": {"color": "Black", "storage": "128GB", "RAM": "8GB"},
        "reviews": [
            {"user_id": ObjectId("987654321098765432109876"), "rating": 4, "comment": "Great phone!"},
            {"user_id": ObjectId("567890123456789012345678"), "rating": 5, "comment": "Best phone I've ever had!"}
        ]
    },
    {
        "product_name": "Laptop",
        "brand": "BrandY",
        "price": 899.99,
        "stock_quantity": 50,
        "category": ["Electronics", "Computers"],
        "attributes": {"color": "Silver", "storage": "256GB", "RAM": "16GB"},
        "reviews": [
            {"user_id": ObjectId("123456789012345678901234"), "rating": 5, "comment": "Amazing performance!"}
        ]
    },
    {
        "product_name": "Tablet",
        "brand": "BrandZ",
        "price": 299.99,
        "stock_quantity": 200,
        "category": ["Electronics", "Mobile"],
        "attributes": {"color": "White", "storage": "64GB", "RAM": "4GB"},
        "reviews": [
            {"user_id": ObjectId("234567890123456789012345"), "rating": 4, "comment": "Very handy device."}
        ]
    },
    {
        "product_name": "Smartwatch",
        "brand": "BrandX",
        "price": 199.99,
        "stock_quantity": 300,
        "category": ["Electronics", "Wearable"],
        "attributes": {"color": "Black", "storage": "32GB", "RAM": "1GB"},
        "reviews": [
            {"user_id": ObjectId("345678901234567890123456"), "rating": 3, "comment": "Good, but could be better."}
        ]
    },
    {
        "product_name": "Headphones",
        "brand": "BrandA",
        "price": 149.99,
        "stock_quantity": 150,
        "category": ["Electronics", "Audio"],
        "attributes": {"color": "Black", "storage": "N/A", "RAM": "N/A"},
        "reviews": [
            {"user_id": ObjectId("456789012345678901234567"), "rating": 4, "comment": "Excellent sound quality."}
        ]
    },
    {
        "product_name": "Camera",
        "brand": "BrandB",
        "price": 450.00,
        "stock_quantity": 30,
        "category": ["Electronics", "Photography"],
        "attributes": {"color": "Black", "storage": "N/A", "RAM": "N/A"},
        "reviews": [
            {"user_id": ObjectId("567890123456789012345678"), "rating": 5, "comment": "Crystal clear pictures!"}
        ]
    },
    {
        "product_name": "Gaming Console",
        "brand": "BrandC",
        "price": 499.99,
        "stock_quantity": 80,
        "category": ["Electronics", "Gaming"],
        "attributes": {"color": "Black", "storage": "1TB", "RAM": "8GB"},
        "reviews": [
            {"user_id": ObjectId("678901234567890123456789"), "rating": 5, "comment": "Best gaming experience ever!"}
        ]
    },
    {
        "product_name": "Television",
        "brand": "BrandD",
        "price": 799.99,
        "stock_quantity": 25,
        "category": ["Electronics", "Home Entertainment"],
        "attributes": {"color": "Black", "storage": "N/A", "RAM": "N/A"},
        "reviews": [
            {"user_id": ObjectId("789012345678901234567890"), "rating": 4, "comment": "Great picture quality!"}
        ]
    },
    {
        "product_name": "Bluetooth Speaker",
        "brand": "BrandE",
        "price": 99.99,
        "stock_quantity": 200,
        "category": ["Electronics", "Audio"],
        "attributes": {"color": "Blue", "storage": "N/A", "RAM": "N/A"},
        "reviews": [
            {"user_id": ObjectId("890123456789012345678901"), "rating": 4, "comment": "Very portable and good sound."}
        ]
    },
    {
        "product_name": "Digital Camera",
        "brand": "BrandF",
        "price": 1200.00,
        "stock_quantity": 5,
        "category": ["Electronics", "Photography"],
        "attributes": {"color": "Red", "storage": "N/A", "RAM": "N/A"},
        "reviews": [
            {"user_id": ObjectId("901234567890123456789012"), "rating": 5, "comment": "Professional-grade camera."}
        ]
    }
]);

// Retrieve all products in the "Electronics" category

db.products.find({ category: "Electronics" });

// Find all products with a price less than $500.

db.products.find({ price: { $lt: 500 } });

// Retrieve all products with a rating less than 4.

db.products.find({ "reviews.rating": { $lt: 4 } });

//  Retrieve all products sorted by price in descending order.

db.products.find().sort({ price: -1 });

//  Calculate the average rating of all products.

db.products.aggregate([
    { $unwind: "$reviews" },
    { $group: { _id: null, avgRating: { $avg: "$reviews.rating" } } }
]);


//  Find all products where the stock quantity is less than 10.

db.products.find({ stock_quantity: { $lt: 10 } });

//  Retrieve all products with a specific brand (e.g., BrandX).

db.products.find({ brand: "BrandX" });

//  Find all products where the storage is 128GB and RAM is 8GB.

db.products.find({ "attributes.storage": "128GB", "attributes.RAM": "8GB" });

//  Retrieve all products with a specific user's review (e.g., user_id: ObjectId("987654321098765432109876")).

db.products.find({ "reviews.user_id": ObjectId("987654321098765432109876") });

//  Calculate the total number of reviews for each product.

db.products.aggregate([
    { $project: { product_name: 1, totalReviews: { $size: "$reviews" } } }
]);

//  Find all products with a price between $400 and $600.

db.products.find({ price: { $gte: 400, $lte: 600 } });

//  Find all products with a specific category (e.g., "Mobile") and a stock quantity greater than 50.

db.products.find({ category: "Mobile", stock_quantity: { $gt: 50 } });

//  Find the highest rated product.

db.products.aggregate([
    { $unwind: "$reviews" },
    { $group: { _id: "$_id", product_name: { $first: "$product_name" }, maxRating: { $max: "$reviews.rating" } } },
    { $sort: { maxRating: -1 } },
    { $limit: 1 }
]);

//  Retrieve all products sorted by brand in ascending order and then by price in descending order.

db.products.find().sort({ brand: 1, price: -1 });

//  Find all products with a specific comment in their reviews (e.g., "Great phone!").

db.products.find({ "reviews.comment": "Great phone!" });





