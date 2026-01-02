<?php
if (function_exists('curl_init')) {
    echo "cURL is enabled";
} else {
    echo "cURL is NOT enabled";
}

// Also show all loaded extensions
echo "<br><br>Loaded extensions:<br>";
print_r(get_loaded_extensions());
?>