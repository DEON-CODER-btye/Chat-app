
const sender = document.querySelector(".send");
const messageInput = document.querySelector(".messageBox");
const sendBtn = document.querySelector(".sendBtn");
const chatContainer = document.querySelector(".chatContainer");
const cardContainer = document.querySelector('.cardContainer')
function createSidebarChat(user) {
  const imgDiv = document.createElement('div')
  imgDiv.classList.add('imgCard')
  const nameAndMessageContainer = document.createElement('div')
  const timeAndUnreadMessage = document.createElement('div')
  const innerContainer = document.createElement('div')
  innerContainer.classList.add('card')
  const userName = document.createElement('h2')
  const userMessage = document.createElement('p')
  const userTime = document.createElement('div')
  const unreadMessage = document.createElement('div')

  userName.textContent = user.name
  userMessage.textContent = user.lastMessage
  userTime.textContent = user.time
  unreadMessage.textContent = user.unread

  innerContainer.append(imgDiv)
  nameAndMessageContainer.append(userName, userMessage);
  timeAndUnreadMessage.append(userTime, unreadMessage);
  innerContainer.append(nameAndMessageContainer, timeAndUnreadMessage);
  cardContainer.append(innerContainer);

}

const fetchMessage = fetch('message.json')
  .then((res) =>
    res.json()
      .then((data) => {
        data.forEach((el) => {
          createSidebarChat(el)
        })
      }))

let data = JSON.parse(localStorage.getItem("data")) || [];
data.forEach((msg) => {
  if (msg.type === "sender") {
    createMessage(msg);
  } else {
    createMessageReceiver(msg, false);
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
    time: timer(),
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
function createMessageReceiver(el, showTyping) {
  const receiveContainer = document.createElement("div");
  const typingEffect = document.createElement("div");
  receiveContainer.classList.add("margin");
  const receiveTime = document.createElement("span");
  const receiver = document.createElement("span");
  sender.append(receiveContainer);
  receiveTime.classList.add("text");
  receiveContainer.append(receiver);
  receiver.classList.add("receive");

  if (showTyping) {
    typingEffect.textContent = "typing...";
    receiver.append(typingEffect);

    chatContainer.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: "smooth",
    });
    setTimeout(() => {
      receiver.textContent = el.text;
      receiveTime.textContent = el.time;
      receiver.append(receiveTime);
    }, 2000);
  } else {
    receiver.textContent = el.text;
    receiveTime.textContent = el.time;
    receiver.append(receiveTime);
  }
}

function receiverMessage() {
  let randomMessage = Math.floor(Math.random() * receiveMessages.length);
  setTimeout(() => {
    const messageData1 = {
      time: timer(),
      type: "receiver",
      text: receiveMessages[randomMessage],
    };
    data.push(messageData1);
    createMessageReceiver(messageData1, true);
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
