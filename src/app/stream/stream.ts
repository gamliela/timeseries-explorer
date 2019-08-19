const socket = new WebSocket("ws://localhost:8081/ws");

socket.onopen = function () {
  console.log("Socket is open");
};

let ackSender : number;

socket.onmessage = function (e) {
  const json = JSON.parse(e.data);
  console.log("Got message:", json);
  ackSender = window.setTimeout(() => {
    console.log("Sendind ack...");
    socket.send("true");
  }, 1000)
};

socket.onclose = function () {
  window.clearTimeout(ackSender);
  console.log("Socket closed");
};

socket.onerror = function (e) {
  console.log("Socket error!", e);
};
