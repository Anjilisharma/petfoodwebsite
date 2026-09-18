const products = {

    dog: {
        name: "Premium Chicken Dog Food",
        category: "DOG FOOD",
        image: "dog food.jpg",
        price: "Rs. 1,299",
        rating: "4.9 (24 Reviews)",
        description: "Give your dog a delicious and nutritious meal made with carefully selected ingredients. This premium chicken food is designed to support your dog's everyday health and energy.",
        benefits: [
            "High Quality Ingredients",
            "Balanced Nutrition",
            "Suitable for Adult Dogs",
            "Delicious Chicken Flavor"
        ]
    },

    cat: {
        name: "Premium Salmon Cat Food",
        category: "CAT FOOD",
        image: "cat food.jpg",
        price: "Rs. 999",
        rating: "4.8 (18 Reviews)",
        description: "A delicious salmon-based meal specially made to provide cats with balanced nutrition and the energy they need every day.",
        benefits: [
            "High Quality Ingredients",
            "Rich in Protein",
            "Supports Healthy Growth",
            "Delicious Salmon Flavor"
        ]
    },

    rabbit: {
        name: "Healthy Rabbit Pellets",
        category: "RABBIT FOOD",
        image: "rabbit food.jpg",
        price: "Rs. 699",
        rating: "4.8 (16 Reviews)",
        description: "Healthy and nutritious rabbit pellets made to support your rabbit's daily nutritional needs and overall well-being.",
        benefits: [
            "High Fiber Content",
            "Balanced Nutrition",
            "Supports Healthy Digestion",
            "Suitable for Rabbits"
        ]
    },

    fish: {
        name: "Premium Fish Food Flakes",
        category: "FISH FOOD",
        image: "fish food.jpg",
        price: "Rs. 499",
        rating: "4.9 (21 Reviews)",
        description: "Nutritious fish food flakes specially made to provide essential nutrients and support healthy growth and vibrant fish.",
        benefits: [
            "Rich in Essential Nutrients",
            "Supports Healthy Growth",
            "Easy to Digest",
            "Suitable for Aquarium Fish"
        ]
    }

};


// Get product from URL

const urlParams = new URLSearchParams(window.location.search);

const productId = urlParams.get("product");




// Find selected product

const product = products[productId];


// Display product details

if (product) {

    document.getElementById("product-image").src = product.image;

    document.getElementById("product-image").alt = product.name;

    document.getElementById("product-category").textContent = product.category;

    document.getElementById("product-name").textContent = product.name;

    document.getElementById("product-rating").textContent = product.rating;

    document.getElementById("product-price").textContent = product.price;

    document.getElementById("product-description").textContent = product.description;


    // Display benefits

    const benefitsContainer = document.getElementById("product-benefits");

    benefitsContainer.innerHTML = "";


    product.benefits.forEach(function(benefit) {

        benefitsContainer.innerHTML += `<p>✓ ${benefit}</p>`;

    });

}
// Add product to cart

const addToCartButton = document.getElementById("add-to-cart");

if (addToCartButton) {

    addToCartButton.addEventListener("click", function() {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push({
    ...product,
    quantity: 1
});

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(product.name + " has been added to your cart! 🛒");
        window.location.href = "cart.html";

    });

}
// Display cart products

const cartContainer = document.getElementById("cart-container");

if (cartContainer) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty 🛒</h2>
                <p>Add some delicious food for your pet!</p>
                <a href="shop.html">Continue Shopping</a>
            </div>
        `;

    } else {

        let total = 0;
cart.forEach(function(item, index) {

    let price = parseInt(item.price.replace(/[^0-9]/g, ""));
    let quantity = item.quantity || 1;

    total += price * quantity;

            cartContainer.innerHTML += `
                <div class="cart-item">

                    <img src="${item.image}" alt="${item.name}">

                    <div class="cart-item-info">

                        <h3>${item.name}</h3>

                        <p>${item.category}</p>

                       <p class="cart-price">${item.price}</p>

<div class="quantity-control">

    <button onclick="decreaseQuantity(${index})">−</button>

    <span>${item.quantity || 1}</span>

    <button onclick="increaseQuantity(${index})">+</button>

</div>

<button onclick="removeFromCart(${index})">
    🗑️ Remove
</button>

                    </div>

                </div>
            `;

        });

        cartContainer.innerHTML += `
            <div class="cart-total">

                <h2>Total: Rs. ${total.toLocaleString()}</h2>
<button class="checkout-btn" onclick="goToCheckout()">
    Proceed to Checkout 🛍️
</button>

            </div>
        `;

    }

}


// Remove product from cart

function removeFromCart(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}


// Increase quantity

function increaseQuantity(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity = (cart[index].quantity || 1) + 1;

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();
}


// Decrease quantity

function decreaseQuantity(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if ((cart[index].quantity || 1) > 1) {

        cart[index].quantity--;

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();
}

// Search products
function searchProducts() {
    let searchText = document.getElementById("searchInput").value.toLowerCase();

    let products = document.querySelectorAll(".shop-product-card");

    products.forEach(function(product) {
        let productText = product.innerText.toLowerCase();

        if (productText.includes(searchText)) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
}
// Filter products by category
function filterCategory(category) {
    let productCards = document.querySelectorAll(".shop-product-card");

    productCards.forEach(function(product) {
        let productCategory = product.getAttribute("data-category");

        if (category === "all" || productCategory === category) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
}
function filterCategoryFromURL() {
    let category = new URLSearchParams(window.location.search).get("category");

    if (category) {
        filterCategory(category);
    }
}
if (document.querySelector(".shop-product-card")) {
    filterCategoryFromURL();
}


// Add product to wishlist
function addToWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Check if product is already in wishlist
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        alert("Product added to your wishlist! ❤️");
    } else {
        alert("This product is already in your wishlist! ❤️");
    }
}
// Display wishlist products
const wishlistContainer = document.getElementById("wishlist-container");

if (wishlistContainer) {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlist.length === 0) {

        wishlistContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your wishlist is empty ❤️</h2>
                <p>Add your favorite pet food to your wishlist!</p>
                <a href="shop.html">Continue Shopping</a>
            </div>
        `;

    } else {

        wishlist.forEach(function(productId) {

            let product = products[productId];

            wishlistContainer.innerHTML += `
                <div class="cart-item">

                    <img src="${product.image}" alt="${product.name}">

                    <div class="cart-item-info">

                        <h3>${product.name}</h3>

                        <p>${product.category}</p>

                        <p class="cart-price">${product.price}</p>

                        <button onclick="removeFromWishlist('${productId}')">
                            🗑️ Remove
                        </button>

                    </div>

                </div>
            `;
        });
    }
}

// Remove product from wishlist
function removeFromWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist = wishlist.filter(function(id) {
        return id !== productId;
    });

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    location.reload();
}

// Add product to cart directly from Shop page
function addToCartFromShop(productId) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = products[productId];

    cart.push({
        ...product,
        quantity: 1
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(product.name + " has been added to your cart! 🛒");

   
}

function createAccount(event) {
    event.preventDefault();

    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    alert("Account created successfully!");

    window.location.href = "login.html";
}
function resetPassword(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;

    alert("A password reset link has been sent to " + email);

    window.location.href = "login.html";
}

function loginUser(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please enter your email and password.");
        return;
    }

    alert("Login successful!");

    window.location.href = "index.html";
}

function togglePassword() {
    let password = document.getElementById("password");
    let button = document.querySelector(".password-box button");

    if (password.type === "password") {
        password.type = "text";
        button.textContent = "🙈";
    } else {
        password.type = "password";
        button.textContent = "👁️";
    }
}

function goToCheckout() {
    window.location.href = "checkout.html";
}

function loadCheckout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let checkoutItems = document.getElementById("checkout-items");
    let checkoutTotal = document.getElementById("checkout-total");

    if (cart.length === 0) {
        checkoutItems.innerHTML = "<p>Your cart is empty.</p>";
        checkoutTotal.textContent = "Total: Rs. 0";
        return;
    }

    let total = 0;

    cart.forEach(function(item) {
        let price = parseInt(item.price.replace(/[^0-9]/g, ""));
        let quantity = item.quantity || 1;
        let itemTotal = price * quantity;

        total += itemTotal;

        checkoutItems.innerHTML += `
            <div class="checkout-item">
                <span>${item.name} × ${quantity}</span>
                <span>Rs. ${itemTotal.toLocaleString()}</span>
            </div>
        `;
    });

    checkoutTotal.textContent = `Total: Rs. ${total.toLocaleString()}`;
}

if (document.getElementById("checkout-items")) {
    loadCheckout();
}
function placeOrder(event) {
    event.preventDefault();

    alert("🎉 Your order has been placed successfully!");

    localStorage.removeItem("cart");

    window.location.href = "index.html";
}

function toggleMenu() {
    let nav = document.querySelector("nav");
    let buttons = document.querySelector(".nav-buttons");

    nav.classList.toggle("mobile-menu");
    buttons.classList.toggle("mobile-buttons");
}