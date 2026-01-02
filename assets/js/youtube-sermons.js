// YouTube API configuration
const YOUTUBE_API_KEY = 'AIzaSyCrTMEhZ_1kIb4fR4drH_ikcPKEFw1sbEk';
const CHANNEL_ID = 'UCMyUapG2ywIj9UbT_785pDg'; // Patricia Corbitt's channel ID

// Function to fetch latest videos from channel
async function fetchLatestVideos() {
    try {
        console.log('Fetching videos with API key:', YOUTUBE_API_KEY);
        console.log('Channel ID:', CHANNEL_ID);
        
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=4&type=video`);
        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data.items) {
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
    
    if (!sermonContainer) return;
    
    sermonContainer.innerHTML = '<div class="text-center">Loading sermons...</div>';
    
    const videos = await fetchLatestVideos();
    
    if (videos.length === 0) {
        sermonContainer.innerHTML = '<div class="text-center">No videos found</div>';
        return;
    }
    
    sermonContainer.innerHTML = '<div class="row"></div>';
    const row = sermonContainer.querySelector('.row');
    
    videos.forEach((video, index) => {
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