// ================================
// LOGIN PROTECTION
// ================================

if(localStorage.getItem("loggedIn") !== "true"){
    window.location.href = "login.html";
}

// ================================
// ELEMENTS
// ================================

const salesForm = document.getElementById("salesForm");
const salesTable = document.getElementById("salesTable");
const totalSales = document.getElementById("totalSales");
const totalRecords = document.getElementById("totalRecords");
const currentUser = document.getElementById("currentUser");
const searchInput = document.getElementById("searchInput");
const logoutBtn = document.getElementById("logoutBtn");
const menuToggle = document.getElementById("menuToggle");
const hamburgerMenu = document.getElementById("hamburgerMenu");

let sales = JSON.parse(localStorage.getItem("sales")) || [];
let editIndex = -1;

// ================================
// HAMBURGER MENU TOGGLE
// ================================

menuToggle.addEventListener("click", function() {
    hamburgerMenu.classList.toggle("active");
});

hamburgerMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function() {
        hamburgerMenu.classList.remove("active");
    });
});

window.addEventListener("click", function(event) {
    if (!hamburgerMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        hamburgerMenu.classList.remove("active");
    }
});

// ================================
// HOME SLIDER
// ================================

const homeSlider = document.getElementById('homeSlider');
if (homeSlider) {
    const slides = homeSlider.querySelectorAll('.slide');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // dots
    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'slider-dots';
    slides.forEach((s, i) => {
        const btn = document.createElement('button');
        if (i === 0) btn.classList.add('active');
        btn.addEventListener('click', () => {
            goToSlide(i);
            resetTimer();
        });
        dotsWrap.appendChild(btn);
    });
    homeSlider.appendChild(dotsWrap);

    function goToSlide(idx) {
        slides.forEach((sl, si) => sl.classList.toggle('active', si === idx));
        const dots = dotsWrap.querySelectorAll('button');
        dots.forEach((d, di) => d.classList.toggle('active', di === idx));
        currentSlide = idx;
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % totalSlides);
    }

    let slideTimer = setInterval(nextSlide, 4000);

    function resetTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, 4000);
    }

}

// ================================
// CURRENT USER
// ================================

currentUser.textContent =
localStorage.getItem("currentUser") || "Admin";

// ================================
// DISPLAY SALES
// ================================

function displaySales(data = sales){

    salesTable.innerHTML = "";

    data.forEach((sale, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${sale.date}</td>
            <td>Tsh ${Number(sale.amount).toLocaleString()}</td>
            <td>${sale.seller}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editSale(${index})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteSale(${index})">
                    Delete
                </button>

            </td>
        `;

        salesTable.appendChild(row);

    });

    updateSummary();
}

// ================================
// UPDATE SUMMARY
// ================================

function updateSummary(){

    let total = 0;

    sales.forEach(sale => {
        total += Number(sale.amount);
    });

    totalSales.textContent =
    "Tsh " + total.toLocaleString();

    totalRecords.textContent =
    sales.length;
}

// ================================
// SAVE TO LOCAL STORAGE
// ================================

function saveSales(){

    localStorage.setItem(
        "sales",
        JSON.stringify(sales)
    );

}

// ================================
// ADD / UPDATE SALE
// ================================

salesForm.addEventListener("submit", function(e){

    e.preventDefault();

    const date =
    document.getElementById("saleDate").value;

    const amount =
    document.getElementById("saleAmount").value;

    const seller =
    document.getElementById("sellerName").value;

    if(editIndex === -1){

        sales.push({
            date,
            amount,
            seller
        });

        alert("Sale Added Successfully");

    }else{

        sales[editIndex] = {
            date,
            amount,
            seller
        };

        alert("Sale Updated Successfully");

        editIndex = -1;

        salesForm.querySelector("button")
        .textContent = "Save Sale";

    }

    saveSales();

    displaySales();

    salesForm.reset();

});

// ================================
// EDIT SALE
// ================================

function editSale(index){

    const sale = sales[index];

    document.getElementById("saleDate").value =
    sale.date;

    document.getElementById("saleAmount").value =
    sale.amount;

    document.getElementById("sellerName").value =
    sale.seller;

    editIndex = index;

    salesForm.querySelector("button")
    .textContent = "Update Sale";

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

// ================================
// DELETE SALE
// ================================

function deleteSale(index){

    const confirmDelete =
    confirm("Are you sure you want to delete this sale?");

    if(confirmDelete){

        sales.splice(index, 1);

        saveSales();

        displaySales();

    }

}

// ================================
// SEARCH SALES
// ================================

searchInput.addEventListener("keyup", function(){

    const searchValue =
    searchInput.value.toLowerCase();

    const filteredSales =
    sales.filter(sale =>

        sale.seller
        .toLowerCase()
        .includes(searchValue)

    );

    displaySales(filteredSales);

});

// ================================
// LOGOUT
// ================================

logoutBtn.addEventListener("click", function(){

    const logout =
    confirm("Do you want to logout?");

    if(logout){

        localStorage.removeItem("loggedIn");
        localStorage.removeItem("currentUser");

        window.location.href = "login.html";

    }

});

// ================================
// INITIAL LOAD
// ================================

displaySales();