// Welcome Popup Functionality
document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('welcomePopup');
    const closeBtn = document.querySelector('.popup-close');
    const form = document.getElementById('popupcorpForm');
    const response = document.getElementById('popupResponse');

    // Show popup after a delay (3 seconds)
    setTimeout(() => {
        showPopup();
    }, 3000);

    // Show popup function
    function showPopup() {
        // Check if popup was already shown in this session
        if (sessionStorage.getItem('popupShown')) {
            return;
        }

        popup.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Mark popup as shown in this session
        sessionStorage.setItem('popupShown', 'true');
    }

    // Close popup function
    function closePopup() {
        popup.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Close popup when clicking the close button
    closeBtn.addEventListener('click', closePopup);

    // Close popup when clicking outside the container
    popup.addEventListener('click', function (e) {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            closePopup();
        }
    });


    // Form submission is now handled globally in the HTML files to ensure unified data capture to Google Sheets.




    // Add animation to gift box on hover
    const giftBox = document.querySelector('.gift-box-icon');
    if (giftBox) {
        giftBox.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });

        giftBox.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Track popup interactions for analytics
    function trackPopupEvent(action) {
        // You can integrate with Google Analytics or other tracking here
        console.log('Popup Event:', action);

        // Example Google Analytics event tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': 'Popup',
                'event_label': window.location.pathname
            });
        }
    }

    // Track when popup is shown
    popup.addEventListener('transitionend', function () {
        if (popup.classList.contains('show')) {
            trackPopupEvent('popup_shown');
        }
    });

    // Track when popup is closed
    closeBtn.addEventListener('click', function () {
        trackPopupEvent('popup_closed_button');
    });

    popup.addEventListener('click', function (e) {
        if (e.target === popup) {
            trackPopupEvent('popup_closed_outside');
        }
    });
});

// Additional utility functions
function showPopupManually() {
    const popup = document.getElementById('welcomePopup');
    if (popup) {
        popup.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function hidePopupManually() {
    const popup = document.getElementById('welcomePopup');
    if (popup) {
        popup.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Export functions for potential external use
window.etisalatPopup = {
    show: showPopupManually,
    hide: hidePopupManually
};
