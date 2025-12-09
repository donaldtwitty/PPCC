# CDN Update Guide for PPCC Template

## Replace Local Files with CDN Links

### Current Local References (in HTML files):
```html
<!-- Replace these local references -->
<link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">
<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
```

### With Secure CDN Links:
```html
<!-- Bootstrap 5.3.2 CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

<!-- jQuery 3.7.1 -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

<!-- Bootstrap 5.3.2 JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
```

## Benefits of CDN Approach:
- ✅ Always up-to-date with security patches
- ✅ Better performance (cached by browsers)
- ✅ Reduced server load
- ✅ Integrity hashes prevent tampering
- ✅ No need to manually update files

## Migration Notes for Bootstrap 4 → 5:
- Some class names have changed
- jQuery is no longer required for Bootstrap 5
- Review Bootstrap 5 migration guide: https://getbootstrap.com/docs/5.3/migration/