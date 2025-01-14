const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Sample product data
const products = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 29.99,
        category: "men",
        image: "https://via.placeholder.com/300x400"
    },
    {
        id: 2,
        name: "Denim Jacket",
        price: 89.99,
        category: "women",
        image: "https://via.placeholder.com/300x400"
    },
    {
        id: 3,
        name: "Slim Fit Jeans",
        price: 59.99,
        category: "men",
        image: "https://via.placeholder.com/300x400"
    },
    {
        id: 4,
        name: "Floral Summer Dress",
        price: 79.99,
        category: "women",
        image: "https://via.placeholder.com/300x400"
    },
    {
        id: 5,
        name: "Kids Dinosaur T-Shirt",
        price: 24.99,
        category: "kids",
        image: "https://via.placeholder.com/300x400"
    },
    {
        id: 6,
        name: "Sport Running Shoes",
        price: 119.99,
        category: "men",
        onSale: true,
        image: "https://via.placeholder.com/300x400"
    },
    {
        id: 7,
        name: "Leather Handbag",
        price: 149.99,
        category: "women",
        image: "https://via.placeholder.com/300x400"
    },
    {
        id: 8,
        name: "Kids Denim Overall",
        price: 39.99,
        category: "kids",
        onSale: true,
        image: "https://via.placeholder.com/300x400"
    }
];

// Routes
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:category', (req, res) => {
    const categoryProducts = products.filter(p => p.category === req.params.category);
    res.json(categoryProducts);
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
}); 