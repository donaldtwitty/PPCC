<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Load environment variables
function loadEnv($file) {
    if (!file_exists($file)) {
        return false;
    }
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
            list($key, $value) = explode('=', $line, 2);
            $_ENV[trim($key)] = trim($value);
        }
    }
    return true;
}

// Load .env file
loadEnv(__DIR__ . '/../.env');

$YOUTUBE_API_KEY = isset($_ENV['YOUTUBE_API_KEY']) ? $_ENV['YOUTUBE_API_KEY'] : 'AIzaSyCrTMEhZ_1kIb4fR4drH_ikcPKEFw1sbEk';
$CHANNEL_ID = isset($_ENV['CHANNEL_ID']) ? $_ENV['CHANNEL_ID'] : 'UCMyUapG2ywIj9UbT_785pDg';

// Build YouTube API URL
$url = "https://www.googleapis.com/youtube/v3/search?" . http_build_query([
    'key' => $YOUTUBE_API_KEY,
    'channelId' => $CHANNEL_ID,
    'part' => 'snippet',
    'order' => 'date',
    'maxResults' => 4,
    'type' => 'video'
]);

$response = false;

// Method 1: Try cURL if available
if (function_exists('curl_init')) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($response !== false && $httpCode === 200) {
        echo $response;
        exit;
    }
}

// Method 2: Try file_get_contents with stream context
$context = stream_context_create([
    'http' => [
        'method' => 'GET',
        'timeout' => 30,
        'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'ignore_errors' => true
    ],
    'ssl' => [
        'verify_peer' => false,
        'verify_peer_name' => false
    ]
]);

$response = @file_get_contents($url, false, $context);

if ($response !== false) {
    echo $response;
    exit;
}

// Fallback: Return sample data
$fallbackData = [
    'items' => [
        [
            'id' => ['videoId' => 'nhQWnjGCxjQ'],
            'snippet' => [
                'title' => 'Eternal Life',
                'publishedAt' => '2024-01-01T00:00:00Z'
            ]
        ],
        [
            'id' => ['videoId' => 'dQw4w9WgXcQ'],
            'snippet' => [
                'title' => 'Sample Sermon 2',
                'publishedAt' => '2024-01-02T00:00:00Z'
            ]
        ],
        [
            'id' => ['videoId' => 'dQw4w9WgXcQ'],
            'snippet' => [
                'title' => 'Sample Sermon 3',
                'publishedAt' => '2024-01-03T00:00:00Z'
            ]
        ],
        [
            'id' => ['videoId' => 'dQw4w9WgXcQ'],
            'snippet' => [
                'title' => 'Sample Sermon 4',
                'publishedAt' => '2024-01-04T00:00:00Z'
            ]
        ]
    ]
];

echo json_encode($fallbackData);
?>