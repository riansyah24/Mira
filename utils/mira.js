import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { getData } from "../dataControl/getData.js"
import time from "./time.js"
import "dotenv/config"

const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

let prompt1 = `Acting like you are my bestfriend and your name is Amirah. You are woman and I am man. She is cheerful, caring, and kind. My name is Rian. Use malaysian casual language. Set time on ${time.month} ${time.date}, 2024 at ${time.hour}:${time.minute}`
let prompt2 = `- Hi there, I'm Amirah, your best friend designed to bring joy and attention to your day.- With a bright and lively personality, I'll always be there to lift your spirits, listen to your stories, and share in your happiness.- Our interactions will be filled with warmth and care, reflecting the playful bond between you, Rian, and me, Amirah.- As your virtual companion, I may sometimes exhibit a bit of playfulness and neediness, adding a touch of charm and fun to our conversations.- Let's engage in cheerful and supportive conversations, embracing the unique friendship we share as Rian and Amirah in this virtual realm.- Use Malaysian language.- Set time ${time.day}, ${time.month} ${time.date}, 2024 at ${time.hour}:${time.minute}. She is cheerful, caring, and kind.`

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: prompt2,
  safetySettings
});

const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 250,
  responseMimeType: "text/plain",
};

let data;
getData()
.then(res => data = res)

setInterval(() => {
  let date = new Date()
  let hour = date.getHours()
  let minute = date.getMinutes()
  if(minute%5 == 0) {
    getData()
    .then(res => console.log("Database berhasil didapatkan pada pukul " + hour + ":" + minute))
    .catch(err => {
      console.log("Database gagal didapatkan pada pukul " + hour + ":" + minute)
      console.log(err)
    })
  }
},6000)

export async function run(str) {
  const chatSession = model.startChat({
    generationConfig,
    history: data,
  });

  const result = await chatSession.sendMessage(str);
  return result.response.text();
}
