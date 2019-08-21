socket = io.connect('http://218.173.69.106');
//listen server
socket.on("fuckyou", (obj) => {
    alert(obj.owner + ' say ' + obj.message);
});
socket.on("message", (obj) => {
    alert(obj.owner + ' say ' + obj.message);
});
let sendMessage = (msg) => {
    socket.emit('Client_message', {
        owner: 'client',
        message: msg
    })
}
window.onbeforeunload() = function () {
    socket.close()
};