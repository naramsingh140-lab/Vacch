// --- 1. अपनी API KEY यहाँ डालें ---
const API_KEY = "अपनी_API_KEY_यहाँ_लिखें"; 

// --- 2. UI Elements को कनेक्ट करना ---
const userInput = document.querySelector('input[type="text"]');
const sendBtn = document.querySelector('span[style*="color: #4285f4"]'); // सेंड बटन
const welcomeSection = document.getElementById('welcome-section');
const chatContainer = document.getElementById('main-container');

// मैसेज एरिया बनाने के लिए (ताकि बातें स्क्रीन पर दिखें)
const messagesDiv = document.createElement('div');
messagesDiv.id = "chat-messages";
messagesDiv.style.cssText = "flex: 1; width: 100%; max-width: 800px; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 15px;";
chatContainer.insertBefore(messagesDiv, document.querySelector('.input-box'));

// --- 3. Gemini AI से बात करने का फंक्शन ---
async function callGemini(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// --- 4. स्क्रीन पर मैसेज दिखाने का फंक्शन ---
function displayMessage(text, sender) {
    const msg = document.createElement('div');
    msg.innerText = text;
    msg.style.padding = "12px 18px";
    msg.style.borderRadius = "20px";
    msg.style.maxWidth = "80%;"
    msg.style.wordWrap = "break-word";
    
    if (sender === 'user') {
        msg.style.alignSelf = "flex-end";
        msg.style.backgroundColor = "#4285f4";
        msg.style.color = "white";
    } else {
        msg.style.alignSelf = "flex-start";
        msg.style.backgroundColor = "var(--input-bg)";
        msg.style.color = "var(--text-color)";
    }
    
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// --- 5. सेंड बटन दबाने पर क्या होगा ---
async function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;

    // होम स्क्रीन छुपाएं और मैसेज दिखाएं
    welcomeSection.style.display = "none";
    displayMessage(text, 'user');
    userInput.value = "";

    try {
        const aiResponse = await callGemini(text);
        displayMessage(aiResponse, 'ai');
        
        // हिस्ट्री में सेव करें
        saveHistory(text);
    } catch (error) {
        displayMessage("माफ़ करें, कुछ गड़बड़ हो गई। अपनी API Key चेक करें।", 'ai');
    }
}

// सेंड बटन और Enter की पर काम करना
sendBtn.onclick = handleSend;
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSend();
});

// --- 6. हिस्ट्री सेव करने का लॉजिक ---
function saveHistory(text) {
    let history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
    history.push(text);
    localStorage.setItem("chatHistory", JSON.stringify(history));
}

// --- 7. कैमरा और फाइल के लिए सिर्फ अलर्ट (अभी के लिए) ---
document.querySelectorAll('.icon').forEach(icon => {
    icon.onclick = function() {
        if (this.innerText === "📷") alert("कैमरा फंक्शन चालू हो रहा है...");
        if (this.innerText === "📁") alert("फाइल मैनेजर खुल रहा है...");
    };
});
