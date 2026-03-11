// Font size adjustment
const fontSizeBtn = document.querySelector('.font-size');
let fontSize = 1;

fontSizeBtn.addEventListener('click', () => {
    fontSize = fontSize === 1 ? 1.2 : 1;
    document.body.style.fontSize = `${fontSize}rem`;
});

// Search functionality
const searchBtn = document.querySelector('.search-btn');
let searchOpen = false;

searchBtn.addEventListener('click', () => {
    if (!searchOpen) {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search...';
        searchInput.className = 'search-input';
        searchBtn.parentNode.insertBefore(searchInput, searchBtn);
        searchOpen = true;
    } else {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.remove();
        }
        searchOpen = false;
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Simple countdown timer
function startCountdown() {
    // Get elements
    const days = document.getElementById('days');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');

    // Set initial time (43 days, 22 hours, 45 minutes, 15 seconds in seconds)
    let totalSeconds = (43 * 24 * 60 * 60) + (22 * 60 * 60) + (45 * 60) + 15;

    // Update the display
    function updateDisplay() {
        const remainingDays = Math.floor(totalSeconds / (24 * 60 * 60));
        const remainingHours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const remainingMinutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const remainingSeconds = totalSeconds % 60;

        // Update DOM with new values
        if (days) days.textContent = String(remainingDays).padStart(2, '0');
        if (hours) hours.textContent = String(remainingHours).padStart(2, '0');
        if (minutes) minutes.textContent = String(remainingMinutes).padStart(2, '0');
        if (seconds) seconds.textContent = String(remainingSeconds).padStart(2, '0');

        // Add flip animation
        [days, hours, minutes, seconds].forEach(element => {
            if (element) {
                element.classList.remove('flip');
                void element.offsetWidth; // Trigger reflow
                element.classList.add('flip');
            }
        });

        // Decrease total seconds
        if (totalSeconds > 0) {
            totalSeconds--;
        } else {
            // Timer finished
            clearInterval(countdownInterval);
            const countdownContainer = document.querySelector('.countdown-container');
            if (countdownContainer) {
                countdownContainer.style.display = 'none';
            }
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                const endMessage = document.createElement('p');
                endMessage.textContent = 'Offer has ended!';
                endMessage.className = 'countdown-end-message';
                heroContent.appendChild(endMessage);
            }
        }
    }

    // Initial update
    updateDisplay();

    // Update every second
    const countdownInterval = setInterval(updateDisplay, 1000);
}

// Start the countdown immediately
startCountdown();

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenuToggle && navLinks && !mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Add hover effect to offer cards
const offerCards = document.querySelectorAll('.offer-card');
offerCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Mobile dropdown toggles
document.querySelectorAll('.nav-item > a').forEach(item => {
    item.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const parent = item.parentElement;
            const wasActive = parent.classList.contains('active');
            
            // Close all other dropdowns
            document.querySelectorAll('.nav-item').forEach(navItem => {
                navItem.classList.remove('active');
            });

            // Toggle current dropdown
            if (!wasActive) {
                parent.classList.add('active');
            }
        }
    });
});

// Language toggle
const langBtn = document.querySelector('.lang');
langBtn.addEventListener('click', () => {
    const currentLang = langBtn.textContent;
    langBtn.textContent = currentLang === 'عربي' ? 'English' : 'عربي';
    // Here you would typically implement the actual language change logic
}); 