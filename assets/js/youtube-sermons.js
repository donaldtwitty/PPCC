// Secure YouTube API integration

// YouTube API configuration
const YOUTUBE_API_KEY = 'AIzaSyCrTMEhZ_1kIb4fR4drH_ikcPKEFw1sbEk';
const CHANNEL_ID = 'UCMyUapG2ywIj9UbT_785pDg';

// Function to fetch latest videos from YouTube API
async function fetchLatestVideos() {
    try {
        console.log('Fetching from YouTube API...');
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=4&type=video`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('YouTube API Response:', data);
        
        if (data.items && data.items.length > 0) {
            console.log('Found', data.items.length, 'real YouTube videos');
            return data.items.map(item => ({
                videoId: item.id.videoId,
                title: item.snippet.title,
                publishedAt: item.snippet.publishedAt
            }));
        }
        
        return [];
    } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
}

// Function to load sermon thumbnails
async function loadSermonThumbnails() {
    const sermonContainer = document.querySelector('#sermon-library .col-md-12:last-child');
    
    console.log('Sermon container found:', sermonContainer);
    if (!sermonContainer) {
        console.error('Sermon container not found!');
        return;
    }
    
    sermonContainer.innerHTML = '<div class="text-center">Loading sermons...</div>';
    
    const videos = await fetchLatestVideos();
    console.log('Videos received:', videos);
    
    if (videos.length === 0) {
        sermonContainer.innerHTML = '<div class="text-center">No videos found</div>';
        return;
    }
    
    sermonContainer.innerHTML = '<div class="row"></div>';
    const row = sermonContainer.querySelector('.row');
    
    videos.forEach((video, index) => {
        console.log('Creating thumbnail for:', video.title, video.videoId);
        const sermonItem = document.createElement('div');
        sermonItem.className = 'sermon-item col-md-6 mb-4';
        sermonItem.innerHTML = `
            <div class="video-thumbnail" data-toggle="modal" data-target="#videoModal" data-video-id="${video.videoId}">
                <img src="https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg" alt="Sermon Thumbnail">
                <div class="play-button">
                    <i class="fa fa-play"></i>
                </div>
            </div>
            <div class="sermon-info">
                <h4>${video.title}</h4>
                <span>Dr. Patricia Corbitt</span>
            </div>
        `;
        row.appendChild(sermonItem);
    });
    
    console.log('Thumbnails created, setting up click handlers...');
    
    // Update modal video source when thumbnail is clicked
    document.querySelectorAll('.video-thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            const iframe = document.querySelector('#videoModal iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        });
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', loadSermonThumbnails);