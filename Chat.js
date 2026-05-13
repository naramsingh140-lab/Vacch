// --- 1. अपनी API KEY यहाँ डालें ---
// नीचे "AIza..." वाली जगह अपनी असली चाबी पेस्ट करें
const API_KEY = "AIzaSyDyDkGWTzZHNg0RO9WhNTrOjYmuYHtjZgI"; 

// --- 2. HTML Elements को पहचानना ---
const inputField = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const messagesDiv = document.getElementById('chat-messages');
const welcome = document.getElementById('welcome-section');

// --- 3. Gemini AI से जवाब मांगने का फंक्शन ---
async function callGemini(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    if (!response.ok) {
        throw new Error("API Response Error");
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// --- 4. स्क्रीन पर मैसेज दिखाने का फंक्शन ---
function addMsg(text, type) {
    // जब पहला मैसेज आए तो वेलकम स्क्रीन हटा दें
    if (welcome) welcome.style.display = "none";
    if (messagesDiv) messagesDiv.style.display = "flex";

    const msgBox = document.createElement('div');
    msgBox.innerText = text;
    
    // स्टाइलिंग (यूज़र के लिए नीला, AI के लिए ग्रे)
    msgBox.style.padding = "10px 15px";
    msgBox.style.borderRadius = "15px";
    msgBox.style.maxWidth = "80%";
    msgBox.style.margin = "5px";
    msgBox.style.fontSize = "16px";
    msgBox.style.lineHeight = "1.4";
    msgBox.style.wordWrap = "break-word";

    if (type === 'user') {
        msgBox.style.alignSelf = "flex-end";
        msgBox.style.backgroundColor = "#4285f4";
        msgBox.style.color = "white";
    } else {
        msgBox.style.alignSelf = "flex-start";
        msgBox.style.backgroundColor = "var(--input-bg)";
        msgBox.style.color = "var(--text-color)";
        msgBox.style.border = "1px solid rgba(0,0,0,0.1)";
    }

    messagesDiv.appendChild(msgBox);
    
    // स्क्रीन को ऑटोमैटिक नीचे स्क्रॉल करना
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// --- 5. चैट शुरू करने का मुख्य फंक्शन ---
async function startChat() {
    const userText = inputField.value.trim();
    
    if (!userText) return; // अगर खाली है तो कुछ न करें

    // 1. यूज़र का मैसेज स्क्रीन पर दिखाएं
    addMsg(userText, 'user');
    inputField.value = ""; // इनपुट बॉक्स खाली करें

    try {
        // 2. AI से जवाब मांगें
        const aiReply = await callGemini(userText);
        
        // 3. AI का जवाब स्क्रीन पर दिखाएं
        addMsg(aiReply, 'ai');
        
        // 4. हिस्ट्री में सेव करें
        saveToHistory(userText);
        
    } catch (error) {
        console.error(error);
        addMsg("माफ़ करें, मैं अभी जवाब नहीं दे पा रहा हूँ। कृपया अपनी API Key चेक करें या बाद में कोशिश करें।", 'ai');
    }
}

// --- 6. इवेंट लिसनर्स (बटन क्लिक और Enter की) ---
if (sendBtn) {
    sendBtn.onclick = startChat;
}

if (inputField) {
    inputField.onkeypress = (e) => {
        if (e.key === 'Enter') startChat();
    };
}

// हिस्ट्री सेव करने के लिए छोटा फंक्शन
function saveToHistory(text) {
    let history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
    history.push(text);
    localStorage.setItem("chatHistory", JSON.stringify(history));
}
