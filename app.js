// Load menu from localStorage or default menu
let menu = JSON.parse(localStorage.getItem("menu")) || [
    { name: "🍕Pizza", price: 150, image: "images/pizza.jpg" },
    { name: "Burger", price: 100, image: "images/burger.jpg" },
    { name: "Dosa", price: 80, image: "images/dosa.jpg" }
];

let total = 0;

// Save menu to localStorage
function saveMenu() {
    localStorage.setItem("menu", JSON.stringify(menu));
}

// Login
function login() {
    let role = document.getElementById("role").value;
    document.getElementById("loginBox").style.display = "none";

    if (role === "seller") {
        document.getElementById("sellerPanel").style.display = "block";
        renderSeller();
    } else {
        document.getElementById("buyerPanel").style.display = "block";
        renderBuyer();
    }
}

// SELLER FUNCTIONS
function addOrUpdate() {
    let name = document.getElementById("name").value;
    let price = Number(document.getElementById("price").value);
    let image = document.getElementById("image").value;

    if (!name || !price || !image) {
        alert("Fill all fields");
        return;
    }

    let item = menu.find(i => i.name === name);

    if (item) {
        item.price = price;
        item.image = image;
    } else {
        menu.push({ name, price, image });
    }

    saveMenu();
    renderSeller();

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";
}

function renderSeller() {
    let div = document.getElementById("sellerMenu");
    div.innerHTML = "";

    menu.forEach(i => {
        div.innerHTML += `
            <div class="menu-card">
                <img src="${i.image}" alt="${i.name}">
                <h3>${i.name}</h3>
                <p>₹${i.price}</p>
            </div>
        `;
    });
}

// BUYER FUNCTIONS
function renderBuyer() {
    let div = document.getElementById("buyerMenu");
    div.innerHTML = "";
    total = 0;
    document.getElementById("total").innerText = total;

    menu.forEach(i => {
        div.innerHTML += `
            <div class="menu-card">
                <img src="${i.image}" alt="${i.name}">
                <h3>${i.name}</h3>
                <p>₹${i.price}</p>
                <button onclick="addToCart(${i.price})">Add</button>
            </div>
        `;
    });
}

function addToCart(price) {
    total += price;
    document.getElementById("total").innerText = total;
}

function pay() {
    if (total === 0) {
        alert("Cart is empty!");
    } else {
        alert("Payment Successful! ₹" + total);
        total = 0;
        document.getElementById("total").innerText = total;
    }
}
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

function addReview() {
    const name = document.getElementById("reviewName").value;
    const text = document.getElementById("reviewText").value;
    const rating = document.getElementById("reviewRating").value;

    if (!name || !text || !rating) {
        alert("Please fill all review fields");
        return;
    }

    reviews.push({ name, text, rating });
    localStorage.setItem("reviews", JSON.stringify(reviews));

    document.getElementById("reviewName").value = "";
    document.getElementById("reviewText").value = "";
    document.getElementById("reviewRating").value = "";

    showReviews();
}

function showReviews() {
    const list = document.getElementById("reviewsList");
    list.innerHTML = "";

    reviews.forEach(r => {
        list.innerHTML += `
            <div class="review-card">
                <h4>${r.name} ⭐${r.rating}</h4>
                <p>${r.text}</p>
            </div>
        `;
    });
}


function logout() {
    location.reload();
}
