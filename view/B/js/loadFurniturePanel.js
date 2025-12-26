function showFurniturePanel(furnitureId) {
    fetch(`/api/getFurnitureDetailById?id=${furnitureId}`)
        .then(res => res.json())
        .then(res => {
            if (!Array.isArray(res) || res.length === 0) {
                throw new Error("No furniture data returned");
            }

            const f = res[0];

            document.getElementById("panel-image").src = f.IMAGEURL;
            document.getElementById("panel-name").textContent = f.NAME;
            document.getElementById("panel-category").textContent = f.CATEGORY
            document.getElementById("panel-description").textContent = f.DESCRIPTION;

            document.getElementById("panel-length").textContent = `Length: ${f._LENGTH} cm`;
            document.getElementById("panel-height").textContent = `Height: ${f.HEIGHT} cm`;
            document.getElementById("panel-width").textContent = `Width: ${f.WIDTH} cm`;

            document.getElementById("furniture-panel").classList.remove("hidden");

            
        })
        .catch(err => {
            console.error("Error loading furniture panel:", err);
        })
}