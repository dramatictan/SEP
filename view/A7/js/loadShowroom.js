document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/getShowroom', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authToken
        }
    })
    .then(res => res.json())
    .then(data => {
        const showrooms = data; 
        const container = document.getElementById('showroomList');

        container.innerHTML = '';

        if (!showrooms || showrooms.length === 0) {
            container.innerHTML = '<p>No showrooms found.</p>';
            return;
        }

        showrooms.forEach(showroom => {
            const col = document.createElement('div');
            col.className = 'col-md-4';

            col.innerHTML = `
                <div class="showroom-card" data-id="${showroom.id}">
                    <div class="showroom-image">
                        <img src="${showroom.cover_image_url}" alt="${showroom.name}">
                        <span class="category-badge">${showroom.category_name}</span>
                    </div>

                    <div class="showroom-card-body">
                        <h4>${showroom.name}</h4>
                        <p class="description">${showroom.description}</p>

                        <div class="admin-actions">
                            <button class="btn-edit">
                                <i class="icon icon-edit"></i>
                                Edit
                            </button>

                            <button class="btn-delete">
                                <i class="fas fa-trash"></i>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            `;

            container.appendChild(col);
        });
    })
    .catch(err => {
        console.error(err);
        alert('Failed to load showrooms');
    });
});
