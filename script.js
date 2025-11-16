// Initialize Lucide icons
lucide.createIcons();

// 1. Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close menu when a link is clicked
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// 2. Status Modal Logic (Replaces default browser alerts)
const statusModal = document.getElementById('status-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalIcon = document.getElementById('modal-icon');

function showStatusModal(success, title, message) {
    if (success) {
        modalTitle.textContent = title || "Success!";
        modalIcon.setAttribute('data-lucide', 'check-circle');
        modalIcon.style.color = "var(--secondary-color)"; 
    } else {
        modalTitle.textContent = title || "Error";
        modalIcon.setAttribute('data-lucide', 'alert-triangle');
        modalIcon.style.color = "red";
    }
    modalMessage.textContent = message;
    statusModal.classList.remove('hidden');
    statusModal.classList.add('flex');
    lucide.createIcons(); // Re-render icon
}

function closeStatusModal() {
    statusModal.classList.add('hidden');
    statusModal.classList.remove('flex');
}

// 3. Purchase Modal Logic
const purchaseModal = document.getElementById('purchase-modal');
const packageSelect = document.getElementById('package-select');
const purchaseForm = document.getElementById('purchase-form');

function openPurchaseModal(packageName) {
    packageSelect.value = packageName;
    purchaseModal.style.display = 'flex';
}

function closePurchaseModal() {
    purchaseModal.style.display = 'none';
    purchaseForm.reset();
}

function handlePurchaseSubmit(event) {
    event.preventDefault();
    
    if (!purchaseForm.checkValidity()) {
        showStatusModal(false, "Validation Error", "Please fill out all required fields correctly.");
        return;
    }

    const selectedPackage = packageSelect.value;

    // Simulate server interaction delay
    setTimeout(() => {
        closePurchaseModal();
        // Using new Status Modal instead of alert
        showStatusModal(true, "Purchase Successful!", `Success! Your purchase of the "${selectedPackage}" package is complete. Thank you for your purchase! We'll send the details within 24 hours to your submitted email address.`);
    }, 500);
}

// 4. Trial Form Logic
function handleTrialSubmit(event) {
    event.preventDefault();
    const form = event.target;
    if (!form.checkValidity()) {
        showStatusModal(false, "Validation Error", "Please fill in all required fields for the Trial Request.");
        return;
    }
    
    const trialName = document.getElementById('trial-name').value;
    const trialDogName = document.getElementById('trial-dog-name').value;

    setTimeout(() => {
        form.reset();
        // Using new Status Modal instead of alert
        showStatusModal(true, "Trial Requested!", `Thank you, ${trialName}! Your free trial request for ${trialDogName} has been submitted. We'll contact you within 24 hours to confirm the details.`);
    }, 500);
}

// Add keyboard listener to close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (purchaseModal.style.display === 'flex') {
            closePurchaseModal();
        }
        if (statusModal.classList.contains('flex')) {
            closeStatusModal();
        }
    }
});