async function sendMessage() {
    const messageBox = document.getElementById('messageBox');
    const userMessage = document.getElementById('userMessage').value;

    if (userMessage.trim() === "") return;

    // Kullanıcı mesajını ekle
    messageBox.innerHTML += `<div class="message user-message">${userMessage}</div>`;

    // API'ye istek gönder
    const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    const botMessage = data.botResponse.message || 'Sorry, I didn\'t understand that.';

    // Bot mesajını ekle
    messageBox.innerHTML += `<div class="message bot-message">${botMessage}</div>`;

    // Mesaj kutusunu kaydır
    messageBox.scrollTop = messageBox.scrollHeight;

    // Mesaj kutusunu temizle
    document.getElementById('userMessage').value = '';
}
