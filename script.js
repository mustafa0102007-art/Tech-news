const button = document.getElementById('generate-btn');
const titleElement = document.getElementById('news-title');
const textElement = document.getElementById('news-text');

const API_KEY = "ВСТАВЬ_СЮДА_СВОЙ_КЛЮЧ"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

button.addEventListener('click', async () => {
    button.disabled = true;
    button.innerText = "⏳ ИИ пишет...";
    
    const promptText = "Напиши одну короткую новость про технологии на русском. Ответь строго в формате JSON: {\"title\": \"Заголовок\", \"text\": \"Текст\"}";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
        });
        const data = await response.json();
        const aiResponseText = data.candidates[0].content.parts[0].text;
        const newsData = JSON.parse(aiResponseText);

        titleElement.innerText = newsData.title;
        textElement.innerText = newsData.text;
    } catch (error) {
        titleElement.innerText = "Ошибка!";
        textElement.innerText = "Проверь ключ API.";
    } finally {
        button.disabled = false;
        button.innerText = "🤖 Создать еще одну статью";
    }
});import os
from google import genai

client = genai.Client(
api_key=os.environ.get("GEMINI_API_KEY"),
)

tools = [
{
'type': 'google_search',
},
]

generation_config = {
'temperature': 1,
'max_output_tokens': 65536,
'top_p': 0.95,
'thinking_level': 'high',
}

interaction = client.interactions.create(
model='models/gemini-3-flash-preview',
input='',
tools=tools,
generation_config=generation_config,
)

print(interaction.steps[-1])



