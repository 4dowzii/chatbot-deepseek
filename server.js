const express = require('express');
const { OpenAI } = require('openai'); // DeepSeek API kullanıyorsanız, ona göre değiştirin
const app = express();

app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY, // API key'iniz doğru şekilde set edildiğinden emin olun
});

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    console.log("User Message:", userMessage);

    try {
        const response = await openai.chat({
            messages: [{ role: 'user', content: userMessage }]
        });

        res.json({ botResponse: response });
    } catch (error) {
        console.error("API error:", error);
        res.status(500).send('Sunucu hatası');
    }
});

app.listen(5000, () => {
    console.log('Server 5000 portunda çalışıyor.');
});
