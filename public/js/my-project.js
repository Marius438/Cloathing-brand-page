document.addEventListener('DOMContentLoaded', () => {
    // State management
    let products = [];
    let cart = [];

    // Fetch products from API
    async function fetchProducts() {
        try {
            const response = await fetch('http://localhost:3000/api/products');
            products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Display products in grid
    function displayProducts(productsToShow) {
        const productGrid = document.createElement('div');
        productGrid.className = 'product-grid';

        productsToShow.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">$${product.price}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productGrid.innerHTML += productCard;
        });

        // Clear and update the new-arrivals section
        const newArrivals = document.querySelector('.new-arrivals');
        newArrivals.innerHTML = '<h2>New Arrivals</h2>';
        newArrivals.appendChild(productGrid);
    }

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

    // Navigation functionality
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const category = this.getAttribute('href').replace('#', '');
            
            if (category === 'sale') {
                const saleProducts = products.filter(p => p.onSale);
                displayProducts(saleProducts);
            } else {
                const categoryProducts = products.filter(p => p.category === category);
                displayProducts(categoryProducts);
            }
        });
    });

    // Cart functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            
            if (product) {
                cart.push(product);
                alert(`${product.name} added to cart!`);
                // Update cart UI here
            }
        }
    });

    // Initialize
    fetchProducts();
});