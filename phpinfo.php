<?php
echo "<h3>PHP Configuration Info:</h3>";
echo "<strong>PHP Version:</strong> " . phpversion() . "<br>";
echo "<strong>php.ini file location:</strong> " . php_ini_loaded_file() . "<br>";
echo "<strong>Additional ini files:</strong> " . php_ini_scanned_files() . "<br><br>";

echo "<strong>cURL Status:</strong> ";
if (function_exists('curl_init')) {
    echo "ENABLED";
} else {
    echo "NOT ENABLED";
}

echo "<br><br><strong>Full PHP Info:</strong><br>";
phpinfo();
?>