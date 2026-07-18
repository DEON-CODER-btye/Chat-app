const sender = document.querySelector(".send");
const messageInput = document.querySelector(".messageBox");
const sendBtn = document.querySelector(".sendBtn");
const chatContainer = document.querySelector(".chatContainer");
let data = JSON.parse(localStorage.getItem("data")) || [];
data.forEach((msg) => {
  if (msg.type === "sender") {
    createMessage(msg);
  } else {
    createMessageReceiver(msg);
  }
  chatContainer.scrollTo({
    top: chatContainer.scrollHeight,
    behavior: "smooth",
  });
});
function createMessage(val) {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("property");
  sender.append(messageContainer);
  const message = document.createElement("span");
  const sendTime = document.createElement("span");
  message.classList.add("sender");
  messageContainer.append(message);
  message.textContent = val.text;
  sendTime.classList.add("text");
  sendTime.textContent = val.time;
  message.append(sendTime);
}
function sendMessage() {
  if (messageInput.value.trim() === "") return;
  const messageData = {
    text: messageInput.value.trim(),
    time: new Date().toLocaleTimeString(),
    type: "sender",
  };
  data.push(messageData);
  createMessage(messageData);
  chatContainer.scrollTo({
    top: chatContainer.scrollHeight,
    behavior: "smooth",
  });
  localStorage.setItem("data", JSON.stringify(data));
  messageInput.value = "";
  receiverMessage();
}

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

let receiveMessages = ["hello", "how are you", "where should we go tommoro?"];
function createMessageReceiver(el) {
  const receiveContainer = document.createElement("div");
  receiveContainer.classList.add("margin");
  const receiver = document.createElement("span");
  const receiveTime = document.createElement("span");
  receiver.classList.add("receive");
  receiver.textContent = el.text;
  sender.append(receiveContainer);
  receiveContainer.append(receiver);
  receiveTime.classList.add("text");
  receiveTime.textContent = el.time;
  receiver.append(receiveTime);
}
function receiverMessage() {
  let randomMessage = Math.floor(Math.random() * receiveMessages.length);
  setTimeout(() => {
    const messageData1 = {
      time: new Date().toLocaleTimeString(),
      type: "receiver",
      text: receiveMessages[randomMessage],
    };
    data.push(messageData1);
    createMessageReceiver(messageData1);
    chatContainer.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: "smooth",
    });
    localStorage.setItem("data", JSON.stringify(data));
  }, 2000);
}

function timer() {
  const time = new Date();
  let hours = time.getHours();
  hours = hours % 12 || 12;
  hours = String(hours).padStart(2, "0");
  let minute = time.getMinutes();
  minute = String(minute).padStart(2, "0");
  const amPm = time.getHours() >= 12 ? "pm" : "am";
  return `${hours}:${minute}${amPm}`;
}
