addEventListener('keyup', function($event) {
    if ($event.key === '/' && $event.ctrlKey) {
        document.getElementById('search-input').focus()
    }
})

document.getElementById('new-button').addEventListener('click', function($event) {
    document.getElementById('navbar').classList.add('d-none')
    document.getElementById('write-form').classList.remove('d-none')
    document.getElementById('write-input').focus()
})