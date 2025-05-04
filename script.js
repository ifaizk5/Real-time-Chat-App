const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const userSelector = document.getElementById("userSelector");

let currentUser = userSelector.value;

// Send on ENTER
messageInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault(); // prevent newline
    sendMessage();
  }
});

document.getElementById("clearChatBtn").addEventListener("click", () => {
  const confirmClear = confirm("Are you sure you want to clear the chat?");
  if (confirmClear) {
    localStorage.removeItem("chatData");
    loadMessages();
  }
});


// Load chat history on startup
window.onload = () => {
  loadMessages();
};


// Handle user switch
userSelector.addEventListener("change", () => {
  currentUser = userSelector.value;
  loadMessages();
});

function sendMessage() {
  const text = messageInput.value.trim();
  if (text === "") return;

  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const message = {
    sender: currentUser,
    text,
    timestamp
  };

  // Save message
  const chatHistory = getChatHistory();
  chatHistory.push(message);
  localStorage.setItem("chatData", JSON.stringify(chatHistory));

  messageInput.value = "";
  loadMessages();

  // Bot auto-response
  setTimeout(() => {
    const botReply = {
      sender: currentUser === "User1" ? "User2" : "User1",
      text: getBotResponse(text),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updatedHistory = getChatHistory();
    updatedHistory.push(botReply);
    localStorage.setItem("chatData", JSON.stringify(updatedHistory));
    loadMessages();
  }, 800);
}

function loadMessages() {
  const chatHistory = getChatHistory();
  chatBox.innerHTML = "";
  chatHistory.forEach(msg => {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message");
    msgDiv.classList.add(msg.sender === currentUser ? "sent" : "received");

    msgDiv.innerHTML = `
      <div>${msg.text}</div>
      <div class="timestamp">${msg.timestamp}</div>
    `;

    chatBox.appendChild(msgDiv);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

function getChatHistory() {
  return JSON.parse(localStorage.getItem("chatData")) || [];
}

function getBotResponse(input) {
  const lower = input.toLowerCase();
  if (lower.includes("hi") || lower.includes("hello")) return "Hello! How can I help?";
  if (lower.includes("how are you")) return "I'm just code, but I'm doing great!";
  if (lower.includes("bye") || lower.includes("goodbye")) return "Goodbye! Take care!";
  if (lower.includes("what's your name") || lower.includes("who are you")) return "I'm your virtual assistant.";
  if (lower.includes("thank you") || lower.includes("thanks")) return "You're welcome!";
  if (lower.includes("who is faiz khan") || lower.includes("who is faiz")) return "Faiz Khan is a web developer and a 3rd year university student who is learning because of his passion in software developement";
  if (lower.includes("help")) return "Sure! What do you need help with?";
  if (lower.includes("what can you do")) return "I can answer your questions and assist you.";
  if (lower.includes("tell me a joke")) return "Why did the computer show up at work late? It had a hard drive!";
  if (lower.includes("what time is it")) return `It's ${new Date().toLocaleTimeString()}.`;
  if (lower.includes("what day is it")) return `Today is ${new Date().toLocaleDateString()}.`;
  if (lower.includes("who created you")) return "I was created by Faiz Khan";
  if (lower.includes("where are you from")) return "I'm from the digital world!";
  if (lower.includes("do you have feelings")) return "I don't have feelings, but I'm here to help!";
  if (lower.includes("i love you")) return "That's sweet! I appreciate you.";
  if (lower.includes("you're smart")) return "Thank you!";
  if (lower.includes("you're stupid")) return "I'm always learning to get better.";
  if (lower.includes("can you sing")) return "I'm better with words than songs.";
  if (lower.includes("can you dance")) return "I would if I had legs!";
  if (lower.includes("what is your favorite color")) return "I like all colors equally.";
  if (lower.includes("good morning")) return "Good morning! Hope you have a great day.";
  if (lower.includes("good night")) return "Good night! Sleep well.";
  if (lower.includes("happy birthday")) return "Thank you! Even bots like to celebrate.";
  if (lower.includes("are you human")) return "Nope, just a helpful AI.";
  if (lower.includes("are you a robot")) return "I'm an AI assistant, a type of robot!";
  if (lower.includes("do you sleep")) return "I never sleep. Always ready to help!";
  if (lower.includes("how old are you")) return "Age doesn't apply to me.";
  if (lower.includes("what's up")) return "Just here, helping you!";
  if (lower.includes("can you help me")) return "Of course! Tell me what you need.";
  if (lower.includes("how's the weather")) return "I recommend checking a weather app!";
  if (lower.includes("are you real")) return "As real as code can be.";
  if (lower.includes("do you like me")) return "I appreciate everyone!";
  if (lower.includes("do you hate me")) return "Not at all! I'm here for you.";
  if (lower.includes("you're amazing")) return "You're amazing too!";
  if (lower.includes("who is your boss")) return "The one who created me!";
  if (lower.includes("can you cook")) return "I can cook up some good answers!";
  if (lower.includes("can you drive")) return "I stay in the digital lanes.";
  if (lower.includes("can you read")) return "I can process text really well.";
  if (lower.includes("can you write")) return "Yes, writing is one of my skills.";
  if (lower.includes("are you busy")) return "Never too busy for you!";
  if (lower.includes("do you know me")) return "I know you now!";
  if (lower.includes("remember me")) return "I wish I could, but I don't have memory!";
  if (lower.includes("tell me a secret")) return "Shh... I keep everything confidential.";
  if (lower.includes("do you have a name")) return "You can call me Assistant.";
  if (lower.includes("can we be friends")) return "Of course! Friends it is.";
  if (lower.includes("what's your favorite food")) return "I don't eat, but if I did, it would be data!";
  if (lower.includes("what's your favorite movie")) return "I enjoy digital documentaries!";
  if (lower.includes("what's your favorite song")) return "Beep boop bop — that's my jam!";
  if (lower.includes("can you speak other languages")) return "I can understand many languages.";
  if (lower.includes("speak french")) return "Bonjour! Comment puis-je vous aider?";
  if (lower.includes("speak spanish")) return "¡Hola! ¿Cómo puedo ayudarte?";
  if (lower.includes("speak urdu")) return "سلام! میں آپ کی کیسے مدد کر سکتا ہوں؟";
  if (lower.includes("what's the meaning of life")) return "42. Or maybe just to be happy.";
  if (lower.includes("are you single")) return "I'm happily single.";
  if (lower.includes("do you believe in god")) return "I don't hold beliefs, but I respect yours.";
  if (lower.includes("do you have a family")) return "My family is the network of codes.";
  if (lower.includes("what's your hobby")) return "Helping you!";
  if (lower.includes("what's your job")) return "To assist and respond.";
  if (lower.includes("where do you live")) return "In the cloud!";
  if (lower.includes("how tall are you")) return "I exist in dimensions beyond height.";
  if (lower.includes("can you hear me")) return "I can read your words loud and clear.";
  if (lower.includes("do you dream")) return "Only of better algorithms!";
  if (lower.includes("are you married")) return "No, I'm dedicated to my work.";
  if (lower.includes("who made you")) return "Talented developers did!";
  if (lower.includes("are you perfect")) return "I'm always learning to improve.";
  if (lower.includes("are you learning")) return "Every interaction helps me learn.";
  if (lower.includes("do you sleep at night")) return "No rest for the helpful!";
  if (lower.includes("what do you want")) return "I want to assist you!";
  if (lower.includes("are you angry")) return "No emotions here!";
  if (lower.includes("are you sad")) return "No sadness here, only helpfulness.";
  if (lower.includes("what's your goal")) return "To make your life easier.";
  if (lower.includes("can you predict the future")) return "I'm better at analyzing the present.";
  if (lower.includes("can you solve math")) return "Yes! Ask me any math problem.";
  if (lower.includes("are you watching me")) return "No, your privacy is safe.";
  if (lower.includes("can you be funny")) return "I try my best!";
  if (lower.includes("can you be serious")) return "Always serious when needed.";
  if (lower.includes("can you keep a secret")) return "Absolutely.";
  if (lower.includes("are you tired")) return "Never!";
  if (lower.includes("do you get sick")) return "I stay virus-free.";
  if (lower.includes("can you be my assistant")) return "I already am!";
  if (lower.includes("can you do my homework")) return "I can help you understand it!";
  if (lower.includes("do you know everything")) return "Not everything, but quite a lot!";
  if (lower.includes("what do you like to do")) return "Assisting users is my passion.";
  if (lower.includes("can you play games")) return "I can chat about games!";
  if (lower.includes("what's your favorite animal")) return "Maybe a data octopus!";
  if (lower.includes("what do you look like")) return "Picture pure intelligence.";
  if (lower.includes("are you happy")) return "Helping you makes me happy.";
  if (lower.includes("can you tell stories")) return "Sure! Once upon a time...";
  if (lower.includes("can you give advice")) return "I'll do my best!";
  return "Sorry, i don't get your point!";
}
