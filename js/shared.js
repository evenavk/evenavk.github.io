const headerContainer = document.getElementById("header-container");

headerContainer.innerHTML = `
    <header>
        <h1>Petersons Cakes</h1>
    </header>
        <nav>
            <a href="index.html">Home</a>
            <a href="menu.html">Menu</a>
            <a href="order.html" class="order-link" id="order-counter">Order (0)</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
        </nav>
`;
headerContainer.after(headerContainer.querySelector("nav"));

const footerContainer = document.getElementById("footer-container");

footerContainer.innerHTML = `
    <footer>
        <p>Petersons Cakes</p>
        <p>Kongens gate 777, 7013 Trondheim</p>
        <p>+47 123 45 678</p>
        <p>Simonpeterson@email.no</p>
        <p>&copy; 2026 Petersons Cakes</p>
    </footer>
`;

const savedItemCount = Number(localStorage.getItem("itemCount")) || 0;
const orderCounter = document.getElementById("order-counter");

orderCounter.textContent = `Order (${savedItemCount})`;

