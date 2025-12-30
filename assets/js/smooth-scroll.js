// Smooth scroll to sermon library
$(document).ready(function() {
    // Check if URL has sermon-library hash
    if (window.location.hash === '#sermon-library') {
        setTimeout(function() {
            $('html, body').animate({
                scrollTop: $('#sermon-library').offset().top - 100
            }, 800);
        }, 100);
    }
});