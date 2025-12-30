// Video Modal Handler
$(document).ready(function() {
    $('#videoModal').on('hidden.bs.modal', function () {
        var video = document.getElementById('modalVideo');
        video.pause();
        video.currentTime = 0;
    });
});