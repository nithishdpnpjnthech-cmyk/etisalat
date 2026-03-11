// Welcome Popup Functionality
document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('welcomePopup');
    
    // Show popup immediately if not already submitted
    showPopup();

    function showPopup() {
        // Check if form was submitted (persistent across sessions)
        if (localStorage.getItem('formSubmitted')) {
            return;
        }

        popup.classList.add('show');
        document.body.style.overflow = 'hidden'; 
    }

    // Closing mechanisms removed for mandatory requirement


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
