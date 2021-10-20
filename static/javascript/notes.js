addEventListener('keyup', function($event) {
    if ($event.key === '/' && $event.ctrlKey) {
        document.getElementById('search-input').focus()
    }
})
document.getElementById('write-input').addEventListener('keyup', function() {
    if (String(document.getElementById('write-input').value).length > 0) {
        document.getElementById('send-button').classList.remove('d-none')
        document.getElementById('tool-section').classList.add('d-none')
    } else {
        document.getElementById('send-button').classList.add('d-none')
        document.getElementById('tool-section').classList.remove('d-none')
    }
})

// sending form and get it with AJAX
var $pinStatus
var $pinClass = document.getElementById('pin-icon').classList
function changePin() {
    if ($pinClass.contains('bi-pin-fill')) {
        $pinClass.replace('bi-pin-fill', 'bi-pin-angle-fill')
        $pinStatus = 'True'
    } else if ($pinClass.contains('bi-pin-angle-fill')) {
        $pinClass.replace('bi-pin-angle-fill', 'bi-pin-fill')
        $pinStatus = 'False'
    }
}
document.getElementById('pin-button').addEventListener('click', changePin)
changePin()

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
            pin: $pinStatus,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
    })
    .done(function() {
        $('#shortnotes').prepend(`
        <div class="row mb-3" style="max-width: 540px; width: 540px">
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