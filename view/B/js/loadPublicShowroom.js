document.addEventListener('DOMContentLoaded', loadAllShowrooms);

    function loadAllShowrooms() {
        fetch('/api/showShowroomByCategory')
            .then(res => res.json())
            .then(data => {
                renderShowrooms(data);
            })
            .catch(err => {
                console.error('Failed to load showrooms', err);
            });
    }

    function renderShowrooms(showrooms) {
        const grid = document.getElementById('showroomGrid');
        grid.innerHTML = '';

        showrooms.forEach(showroom => {
            grid.innerHTML += `
                <div class="col-md-4">
                    <div class="card showroom-card h-100 border-0 shadow-sm">

                        <div class="image-wrapper">
                            <img 
                                src="${showroom.cover_image_url}" 
                                alt="${showroom.name}">
                            <span class="category-badge">${showroom.category_name}</span>
                        </div>

                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${showroom.name}</h5>

                            <a 
                                href="showroomDetail.html?id=${showroom.id}" 
                                class="btn btn-dark view-btn mt-auto">
                                View Showroom
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
}
