addEventListener('keyup', function($event) {
    if ($event.key === '/' && $event.ctrlKey) {
        document.getElementById('search-input').focus()
    }
})