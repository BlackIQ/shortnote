addEventListener('keyup', function($event) {
    if ($event.key === '/' && $event.ctrlKey) {
        document.getElementById('search-input').focus()
    }
})
document.getElementById('new-button').addEventListener('click', function() {
    document.getElementById('navbar').classList.add('d-none')
    document.getElementById('write-section').classList.remove('d-none')
    document.getElementById('write-input').focus()
})


// sending form and get it with AJAX
var $counter = 0
var $status = ''
function changeStatus() {
    $counter++
    if ($counter === 1) {
        document.getElementById('status').classList.replace('text-primary', 'text-warning')
        $status = 'warning'
    } else if ($counter === 2) {
        document.getElementById('status').classList.replace('text-warning', 'text-danger')
        $status = 'important'
    } else if ($counter === 3) {
        document.getElementById('status').classList.replace('text-danger', 'text-primary')
        $status = 'note'
        $counter = 0
    }
}
changeStatus()

document.getElementById('status').addEventListener('click', changeStatus)

var Status = new Object()
switch ($status) {
    case 'important':
        Status.$colorStatus = 'danger'
        Status.$contentStatus = '<i class="fad fa-exclamation-circle"></i>'
        break
    case 'warning':
        Status.$colorStatus = 'warning'
        Status.$contentStatus = '<i class="fad fa-exclamation-circle"></i>'
        break
    default:
        Status.$colorStatus = 'primary'
        Status.$contentStatus = ''
}

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
            <div class="card col-11 p-2 border-0 bg-${Status.$colorStatus}" style="--bs-bg-opacity: 0.075">
                <div class="card-body">
                    <strong class="card-subtitle fs-6 text-${Status.$colorStatus} user-select-none">
                    ${Status.$contentStatus}
                    </strong>
                    <p>
                    ${$('#write-input').val()}
                    </p>
                </div>
            </div>
        </div>
        `)
        $('#write-input').val('')
        document.body.scrollHeight = 0
    })
})