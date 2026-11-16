const prices = {
    "chocolate-cake": 349,
    "carrot-cake": 299,
    "red-velvet-cupcake": 29,
    "peanut-butter-cupcake": 39,
    "cinnamon-roll": 59,
    "pain-au-chocolat": 49
};

const productSelect = document.getElementById("product");
const quantityInput = document.getElementById("quantity");
const addButton = document.getElementById("add-to-order");
const clearButton = document.getElementById("clear-cart");
const placeOrderButton = document.getElementById("place-order");
const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const pickupTimeSelect = document.getElementById("pickup-time");
const orderItems = document.getElementById("order-items");
const orderTotal = document.getElementById("order-total");
let total = 0;
let itemCount = 0;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
    orderItems.innerHTML = "";
    total = 0;
    itemCount = 0;

    cart.forEach(function(item, index) {
        const listItem = document.createElement("li");
        listItem.classList.add("cart-item");

        const productName = document.createElement("span");
        productName.textContent = item.name;
        productName.classList.add("cart-product");
        const productPrice = document.createElement("span");
        productPrice.textContent = `${item.subtotal} NOK`;
        productPrice.classList.add("cart-price");

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.classList.add("quantity-button");
        decreaseButton.addEventListener("click", function() {
            if (item.quantity > 1) {
                const unitPrice = item.subtotal / item.quantity;

                item.quantity -= 1;
                item.subtotal = unitPrice * item.quantity;

                localStorage.setItem("cart", JSON.stringify(cart));
                displayCart();
            }
        });

        const quantityDisplay = document.createElement("span");
        quantityDisplay.textContent = item.quantity;

        const quantityControls = document.createElement("div");
        quantityControls.classList.add("cart-quantity");
        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.classList.add("quantity-button");
        increaseButton.addEventListener("click", function() {
            item.quantity += 1;
            item.subtotal = (item.subtotal / (item.quantity - 1)) * item.quantity;

            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
        });

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");

        removeButton.addEventListener("click", function() {
            cart.splice(index, 1);
        
            itemCount -= item.quantity;
            localStorage.setItem("itemCount", itemCount);

            localStorage.setItem("cart", JSON.stringify(cart));

            location.reload();
        });

        quantityControls.appendChild(decreaseButton);
        quantityControls.appendChild(quantityDisplay);
        quantityControls.appendChild(increaseButton);

        const productDetails = document.createElement("div");
        productDetails.classList.add("cart-product-details");
        productDetails.appendChild(productName);
        productDetails.appendChild(removeButton);

        listItem.appendChild(productDetails);
        listItem.appendChild(quantityControls);
        listItem.appendChild(productPrice);

        orderItems.appendChild(listItem);       

        total += item.subtotal;
        itemCount += item.quantity;
    });

    orderTotal.textContent = `Total: ${total} NOK`;
    orderCounter.textContent = `Order (${itemCount})`;
    localStorage.setItem("itemCount", itemCount);
}

displayCart();


addButton.addEventListener("click", function() {
    const product = productSelect.value;
    const productName = productSelect.options[productSelect.selectedIndex].text;
    const quantity = Number(quantityInput.value);
    if (product === "" || !Number.isInteger(quantity) || quantity < 1) {
        alert("Please select a product and enter a valid quantity.");
        return;
    }

    const price = prices[product];
    const subtotal = price * quantity;
    const cartItem = {
        name: productName,
        quantity: quantity,
        subtotal: subtotal
    };
    
    cart.push(cartItem);
    displayCart();
    
    localStorage.setItem("cart", JSON.stringify(cart));
});

clearButton.addEventListener("click", function() {
    cart = [];
    total = 0;
    itemCount = 0;
    orderItems.innerHTML = "";
    orderTotal.textContent = "Total: 0 NOK";
    orderCounter.textContent = "Order (0)";
    localStorage.removeItem("cart");
    localStorage.removeItem("itemCount");
});

placeOrderButton.addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Your shopping cart is empty. Please add a product before placing an order.");
        return;
    }
    if (fullNameInput.value.trim() === "") {
        alert("Please enter your full name.");
        return;
    }
    if (emailInput.value.trim() === "") {
        alert("Please enter your email address.");
        return;
    }
    if (!emailInput.checkValidity()) {
        alert("Please enter a valid email address.");
        return;
    }
    if (phoneInput.value.trim() === "") {
        alert("Please enter your phone number.");
        return;
    }
    if (!/^\d{8}$/.test(phoneInput.value.trim())) {
        alert("Please enter a valid 8-digit phone number.");
        return;
    }
    if (pickupTimeSelect.value === "") {
        alert("Please select a pickup time.");
        return;
    }
    const selectedPayment = document.querySelector('input[name="payment"]:checked');

    if (selectedPayment === null) {
        alert("Please select a payment method.");
        return;
    }

    const customerName = fullNameInput.value.trim();
    const pickupTime = pickupTimeSelect.value;

    alert(`Thank you for your order, ${customerName}!\n\nTotal: ${total} NOK\nPickup time: ${pickupTime}\nPayment method: ${selectedPayment.value}`);
    cart = [];
    localStorage.removeItem("cart");
    localStorage.removeItem("itemCount");
    displayCart();
    fullNameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    pickupTimeSelect.value = "";
    selectedPayment.checked = false;
});

