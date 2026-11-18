// TrainSphere Corporate Training & Workshops — Interactive Flexbox & Estimator Engine

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Flexbox Menu Toggle
    const toggleBtn = document.getElementById("tsMobileToggle");
    const navMenu = document.getElementById("tsNavMenu");

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener("click", () => {
            navMenu.classList.toggle("mobile-active");
        });
    }

    // 2. Click-support for Flexbox Dropdown Menus (Blog & Plans)
    const dropdownBtns = document.querySelectorAll(".ts-dropdown-btn");
    dropdownBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const parentItem = btn.parentElement;
            const isAlreadyOpen = parentItem.classList.contains("open");
            document.querySelectorAll(".ts-nav-item.ts-dropdown").forEach(el => el.classList.remove("open"));
            if (!isAlreadyOpen) {
                parentItem.classList.add("open");
            }
        });
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".ts-nav-item.ts-dropdown").forEach(el => el.classList.remove("open"));
    });

    // 3. Interactive Corporate Workshop Budget Estimator
    const seatsSlider = document.getElementById("seatsSlider");
    const daysSlider = document.getElementById("daysSlider");
    const formatSelect = document.getElementById("formatSelect");

    const seatsDisplay = document.getElementById("seatsDisplay");
    const daysDisplay = document.getElementById("daysDisplay");
    const totalCost = document.getElementById("totalCost");
    const discountNote = document.getElementById("discountNote");

    function recalculateWorkshopBudget() {
        const seats = parseInt(seatsSlider.value, 10);
        const days = parseInt(daysSlider.value, 10);
        const multiplier = parseFloat(formatSelect.value);

        seatsDisplay.textContent = seats;
        daysDisplay.textContent = days;

        const basePerSeatDay = 150;
        let discountRate = 0;
        if (seats >= 50) {
            discountRate = 0.20;
        } else if (seats >= 20) {
            discountRate = 0.10;
        }

        const rawTotal = seats * days * basePerSeatDay * multiplier;
        const finalTotal = Math.round(rawTotal * (1 - discountRate));

        totalCost.textContent = finalTotal.toLocaleString();
        discountNote.textContent = discountRate > 0
            ? `Includes ${Math.round(discountRate * 100)}% corporate volume discount & digital credentials.`
            : "Standard cohort rate. Add 20+ participants to unlock volume discounts.";
    }

    if (seatsSlider && daysSlider && formatSelect) {
        seatsSlider.addEventListener("input", recalculateWorkshopBudget);
        daysSlider.addEventListener("input", recalculateWorkshopBudget);
        formatSelect.addEventListener("change", recalculateWorkshopBudget);
        recalculateWorkshopBudget();
    }

    // 4. Contact Form Submission
    const contactForm = document.getElementById("tsContactForm");
    const contactStatus = document.getElementById("tsContactStatus");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            contactStatus.textContent = "✓ Workshop inquiry received! Our curriculum lead will contact you shortly.";
            contactForm.reset();
        });
    }

    // 5. Auth Modal Form Submission
    const modalForm = document.getElementById("tsModalForm");
    const modalStatus = document.getElementById("tsModalStatus");
    if (modalForm) {
        modalForm.addEventListener("submit", (e) => {
            e.preventDefault();
            modalStatus.textContent = "✓ Authenticated! Opening your TrainSphere learning portal...";
            setTimeout(() => {
                closePortalModal();
                modalStatus.textContent = "";
                modalForm.reset();
            }, 1300);
        });
    }
});

// Highlight selected tier from Navbar Dropdown
function highlightTier(tierName) {
    document.querySelectorAll(".ts-plan-card").forEach(card => card.classList.remove("tier-highlight"));
    const target = document.getElementById("tier-" + tierName);
    if (target) {
        target.classList.add("tier-highlight");
    }
}

// Pre-fill workshop topic in contact form
function bookWorkshop(topicName) {
    const topicInput = document.getElementById("tsTopicInput");
    if (topicInput) {
        topicInput.value = topicName;
    }
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// Pre-select membership tier in contact form
function selectMembership(tierName) {
    const planDropdown = document.getElementById("tsPlanDropdown");
    if (planDropdown) {
        planDropdown.value = tierName;
    }
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// Modal Controls
function openPortalModal(mode) {
    const modal = document.getElementById("tsAuthModal");
    const heading = document.getElementById("tsModalHeading");
    const subtext = document.getElementById("tsModalSubtext");
    const actionBtn = document.getElementById("tsModalActionBtn");

    if (mode === "signup") {
        heading.textContent = "Create Your TrainSphere Account";
        subtext.textContent = "Register your team to book corporate workshops and track certifications.";
        actionBtn.textContent = "Create Account";
    } else if (mode === "quote") {
        heading.textContent = "Save & Download Workshop Quote";
        subtext.textContent = "Sign in to export your custom cohort proposal PDF.";
        actionBtn.textContent = "Download Quote";
    } else {
        heading.textContent = "Log In to TrainSphere";
        subtext.textContent = "Access your workshop schedules, lab sandboxes, and certificates.";
        actionBtn.textContent = "Log In";
    }

    modal.classList.add("open");
}

function closePortalModal() {
    document.getElementById("tsAuthModal").classList.remove("open");
}
