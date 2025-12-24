document.addEventListener('DOMContentLoaded', () => {
    loadFilterPanel();
});

const filterBtn = document.querySelector(".filter-icon");
const filterPopup = document.getElementById("filter-popup");
const closeFilter = document.getElementById("close-filter");

// Open filter panel 
filterBtn.addEventListener("click", () => {
    filterPopup.classList.add("active"); 
})

// Close popup when clicking close button
closeFilter.addEventListener("click", () => {
    filterPopup.classList.remove("active"); // <-- remove active class
});

// Close popup when clicking outside the content box
filterPopup.addEventListener("click", (e) => {
    if (e.target === filterPopup) {
        filterPopup.classList.remove("active"); // <-- remove active class
    }
});

// load filter panel
function loadFilterPanel() {
    
}