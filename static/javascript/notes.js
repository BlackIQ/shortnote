addEventListener('keyup', function($event) {
    if ($event.key === '/' && $event.ctrlKey) {
        document.getElementById('search-input').focus()
    }
})
// document.getElementById('new-button').addEventListener('click', function() {
//     document.getElementById('navbar').classList.add('d-none')
//     document.getElementById('write-section').classList.remove('d-none')
//     document.getElementById('write-input').focus()
// })


// sending form and get it with AJAX
var $counter = 0
var $status = ''
var $color = ''
var $content = ''
function changeStatus() {
    $counter++
    switch ($counter) {
        case 1:
            document.getElementById('status').classList.replace('text-primary', 'text-warning')
            $status = 'warning'
            break
        case 2:
            document.getElementById('status').classList.replace('text-warning', 'text-danger')
            $status = 'important'
            break
        case 3:
            document.getElementById('status').classList.replace('text-danger', 'text-primary')
            $status = 'note'
            $counter = 0
        default:
            break
    }
    switch ($status) {
        case 'important':
            $color = 'danger'
            $content = '<i class="fad fa-exclamation-circle"></i>'
            break
        case 'warning':
            $color = 'warning'
            $content = '<i class="fad fa-exclamation-circle"></i>'
            break
        default:
            $color = 'primary'
            $content = ''
    }
}
changeStatus()

document.getElementById('status').addEventListener('click', changeStatus)

$(document).on('submit', '#write-form', function($event){
    $event.preventDefault()
    $.ajax({
        type: 'POST',
        url: '/notes/',
        data: {
            text: $('#write-input').val(),
            status: $status,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
    })
    .done(function() {
        $('#shortnotes').prepend(`
        <div class="row mb-3" style="max-width: 540px; width: 540px">
            <div class="col-1 d-flex align-items-center">
                <button type="checkbox" class="btn-transparent" style="opacity: 0.5" id="delete-shortnote">
                    <i class="fas fa-check-circle fs-5 text-success opacity-50"></i>
                </button>
            </div>
            <div class="card col-11 p-2 border-0 bg-${$color}" style="--bs-bg-opacity: 0.075">
                <div class="card-body">
                    <strong class="card-subtitle fs-6 text-${$color} user-select-none">
                    ${$content}
                    </strong>
                    <p>
                    ${$('#write-input').val()}
                    </p>
                </div>
            </div>
        </div>
        `)
        $('#write-input').val('')
    })
})