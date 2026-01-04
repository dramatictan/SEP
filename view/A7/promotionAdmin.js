let promotions = [];

/* =========================
   INIT
========================= */
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadPromotions();
});

/* =========================
   LOAD PROMOTIONS
========================= */
function loadPromotions(search = '') {

    fetch(`/api/getAllPromotionProducts`)
        .then(res => res.json())
        .then(data => {
            promotions = data.map(p => ({
                id: p.promoId,
                itemId: p.sku,
                name: p.name,
                discountRate: p.discountRate,
                startDate: p.startDate.split('T')[0],
                endDate: p.endDate.split('T')[0]
            }));

            renderPromotions(search);
        })
        .catch(() => showToast('Failed to load promotions', 'error'));
}

/* =========================
   EVENTS
========================= */
function setupEventListeners() {
    document.getElementById('createForm').addEventListener('submit', createPromotion);
    document.getElementById('editForm').addEventListener('submit', saveEdit);

    document.getElementById('searchInput').addEventListener('input', e => {
        renderPromotions(e.target.value);
    });

    ['editModal', 'deleteModal'].forEach(id => {
        document.getElementById(id).addEventListener('click', e => {
            if (e.target.id === id) closeModal(id);
        });
    });
}

/* =========================
   CREATE
========================= */
function createPromotion(e) {
    e.preventDefault();

    const payload = {
        itemId: document.getElementById('itemId').value,
        description: document.getElementById('itemName').value,
        discountRate: parseFloat(document.getElementById('discountRate').value) / 100,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        countryId: 25
    };

    fetch('/api/admin/promotions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(() => {
            e.target.reset();
            loadPromotions();
            showToast('Promotion created successfully');
        })
        .catch(() => showToast('Create failed', 'error'));
}

/* =========================
   EDIT
========================= */
function openEditModal(id) {
    const p = promotions.find(x => x.id === id);
    if (!p) return;

    document.getElementById('editPromoId').value = id;
    document.getElementById('editItemName').value = p.name;
    document.getElementById('editDiscountRate').value = p.discountRate * 100;
    document.getElementById('editStartDate').value = p.startDate;
    document.getElementById('editEndDate').value = p.endDate;

    openModal('editModal');
}

function saveEdit(e) {
    e.preventDefault();

    const id = document.getElementById('editPromoId').value;

    const payload = {
        description: document.getElementById('editItemName').value,
        discountRate: parseFloat(document.getElementById('editDiscountRate').value) / 100,
        startDate: document.getElementById('editStartDate').value,
        endDate: document.getElementById('editEndDate').value
    };

    fetch(`/api/admin/promotions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(() => {
            closeModal('editModal');
            loadPromotions();
            showToast('Promotion updated');
        })
        .catch(() => showToast('Update failed', 'error'));
}

/* =========================
   DELETE
========================= */
function openDeleteModal(id) {
    document.getElementById('deletePromoId').value = id;
    openModal('deleteModal');
}

function confirmDelete() {
    const id = document.getElementById('deletePromoId').value;

    fetch(`/api/admin/promotions/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(() => {
            closeModal('deleteModal');
            loadPromotions();
            showToast('Promotion deleted');
        })
        .catch(() => showToast('Delete failed', 'error'));
}

/* =========================
   UI HELPERS
========================= */
function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').textContent = msg;
    toast.className = `toast active toast-${type}`;
    setTimeout(() => toast.classList.remove('active'), 3000);
}

/* =========================
   RENDER
========================= */
function getStatus(start, end) {
    const t = new Date();
    if (t < new Date(start)) return 'upcoming';
    if (t > new Date(end)) return 'expired';
    return 'active';
}

function renderPromotions(search = '') {
    const table = document.getElementById('promoTable');
    const empty = document.getElementById('emptyState');

    let list = promotions.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.itemId.toLowerCase().includes(search.toLowerCase())
    );

    if (!list.length) {
        table.innerHTML = '';
        empty.style.display = 'block';
        return;
    }

    empty.style.display = 'none';

    table.innerHTML = list.map(p => `
        <tr>
            <td>
                <div class="item-name">${p.name}</div>
                <div class="item-id">${p.itemId}</div>
            </td>
            <td><span class="badge badge-discount">${(p.discountRate * 100).toFixed(0)}% OFF</span></td>
            <td>${p.startDate}</td>
            <td>${p.endDate}</td>
            <td><span class="badge badge-${getStatus(p.startDate, p.endDate)}">${getStatus(p.startDate, p.endDate)}</span></td>
            <td class="actions">
                <button class="btn btn-ghost btn-icon" onclick="openEditModal(${p.id})">✏️</button>
                <button class="btn btn-ghost btn-icon" onclick="openDeleteModal(${p.id})" style="color:red;">🗑</button>
            </td>
        </tr>
    `).join('');
}
