document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.querySelector(".close-btn");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            document.getElementById("furniture-panel").classList.add("hidden");
        });
    }
});

function showFurniturePanel(event, furnitureId) { 
    fetch(`/api/getFurnitureDetailById?id=${furnitureId}`)
        .then(res => res.json())
        .then(res => {
            if (!Array.isArray(res) || res.length === 0) {
                throw new Error("No furniture data returned");
            }

            const f = res[0];
            const panel = document.getElementById("furniture-panel");

            // Fill data
            document.getElementById("panel-image").src = f.IMAGEURL;
            document.getElementById("panel-name").textContent = f.NAME;
            document.getElementById("panel-category").textContent = f.CATEGORY;

            document.getElementById("panel-length").textContent = `L: ${f._LENGTH} cm`;
            document.getElementById("panel-height").textContent = `H: ${f.HEIGHT} cm`;
            document.getElementById("panel-width").textContent = `W: ${f.WIDTH} cm`;

            // POSITIONING LOGIC
            // Use clientX and clientY for 'fixed' positioning
            // We add 20px offset so the panel doesn't cover the dot itself
            panel.style.left = (event.clientX + 20) + "px"; 
            panel.style.top = (event.clientY - 50) + "px";

            panel.classList.remove("hidden");
        })
        .catch(err => {
            console.error("Error loading furniture panel:", err);
        });
}