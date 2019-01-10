var socket = io();

function addText() {
    var x = document.getElementById("text");
    socket.emit('textValue', x.value);
}

function focusOutFunction() {
    socket.emit('activeInactive', false);
}

function focusInFunction() {
    socket.emit('activeInactive', true);
}

socket.on('textValue', function (msg) {
    document.getElementById("text").value = msg;
});


socket.on('id', function (id) {

    if (document.activeElement === document.getElementById('text') && socket.id == id) {
        document.getElementById("text").disabled = false;
    } else {
        document.getElementById("text").disabled = true;
    }
});

$(document).ready(function () {
    socket.on('activeInactive', function (msg, id) {
        if (socket.id != id)
            $('#text').prop('disabled', msg);
    });
});