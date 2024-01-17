const socket = io('ws://localhost:3000')

function sendMessage(e) {
    e.preventDefault()
    const input = document.querySelector('input')
    if (input.value) {
        socket.emit('message', input.value)
        input.value = ""
    }
    input.focus()
}

document.querySelector('form')
    .addEventListener('submit', sendMessage)

socket.on("message", (data) => {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.textContent = data;
		tr.appendChild(td);
    document.querySelector('tbody').appendChild(tr);
})