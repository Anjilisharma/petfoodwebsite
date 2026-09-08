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

            total += price;

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

                <button class="checkout-btn">
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