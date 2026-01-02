<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// YouTube API configuration (keep secure on server)
$YOUTUBE_API_KEY = 'AIzaSyCrTMEhZ_1kIb4fR4drH_ikcPKEFw1sbEk';
$CHANNEL_ID = 'UCMyUapG2ywIj9UbT_785pDg';

// Build YouTube API URL
$url = "https://www.googleapis.com/youtube/v3/search?" . http_build_query([
    'key' => $YOUTUBE_API_KEY,
    'channelId' => $CHANNEL_ID,
    'part' => 'snippet',
    'order' => 'date',
    'maxResults' => 4,
    'type' => 'video'
]);

// Use cURL instead of file_get_contents
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === FALSE || $httpCode !== 200) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch videos']);
    exit;
}

// Return the response
echo $response;
?>