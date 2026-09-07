
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

// Get the product name from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("product");

// Find the selected product
const product = products[productId];

// Change product details
if (product) {

    document.getElementById("product-image").src = "dog food.jpg";
    document.getElementById("product-image").alt = product.name;

    document.getElementById("product-category").textContent = product.category;

    document.getElementById("product-name").textContent = product.name;

    document.getElementById("product-rating").textContent = product.rating;

    document.getElementById("product-price").textContent = product.price;

    document.getElementById("product-description").textContent = product.description;

    const benefitsContainer = document.getElementById("product-benefits");

    benefitsContainer.innerHTML = "";

    product.benefits.forEach(function(benefit) {
        benefitsContainer.innerHTML += `<p>✓ ${benefit}</p>`;
    });
}
