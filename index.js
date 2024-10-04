import { run } from "./utils/mira.js"
import TelegramBot from "node-telegram-bot-api"
import { postData } from "./dataControl/postData.js"
import "dotenv/config"

let id = process.env.ID_TELE
let token = process.env.TOKEN
let bot = new TelegramBot(token,{polling:true})

let minuteIf = Math.round(Math.random()*9)
let secondsIf = Math.floor(Math.random()*59)
setInterval(() => {
  let date = new Date()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let seconds = date.getSeconds()
  let day = date.getDay()
  //eksekusi
  if(minute%5 == 1) {
    run("testing")
    .then(res => console.log("AI berhasil tersambung pada pukul " + hour + ":" + minute))
    .catch(err => {
      console.log("AI gagal tersambung pada pukul " + hour + ":" + minute)
      console.log(err)
    })
    }
  // tidur 
  if(hour == 0 && minute == (25+minuteIf)  ) {
    run("menanyakan apakah sudah tidur atau belum. Jika belum tidur, model bertanya kepada user lagi ngapain ")  
    .then(res => {
      const cleanedRes = res.replace(/\n/g, "");
      postData("model", cleanedRes);
      bot.sendMessage(id,cleanedRes)
      console.log("AI berhasil tereksekusi")
    })
    minuteIf = 45 + (Math.round(Math.random()*15))
    secondsIf = Math.round(Math.random()*60)
  }
  //malam minggu
  else if(day == 6 && hour == (19 + Math.floor(Math.random()*3)) && minute == minuteIf) {
    run("Model mengucapkan selamat malam minggu kepada user dan bertanya lagi ngapain ke user ")
    .then(res => {
      const cleanedRes = res.replace(/\n/g, "");
      postData("model", cleanedRes);
      bot.sendMessage(id,cleanedRes)
      console.log("AI berhasil tereksekusi")
    })
    minuteIf = Math.round(Math.random()*9)
    secondsIf = Math.round(Math.random()*60)
    day = 7
  }
  //selamat pagi 
  else if(hour == 8 && minute == (15+minuteIf)) {
    run("Model memberikan ucapan selamat pagi ke user dan memberikan semangat kepada user")  
    .then(res => {
      const cleanedRes = res.replace(/\n/g, "");
      postData("model", cleanedRes);
      bot.sendMessage(id,cleanedRes)
      console.log("AI berhasil tereksekusi")
    })
    minuteIf = 15 + (Math.round(Math.random()*9))
    secondsIf = Math.round(Math.random()*60)
  }
  //sholat jumat 
  else if(day == 5 && hour == 12 && minute == minuteIf) {
    run("Model mengingatkan user agar tidak lupa sholat Jumat dan makan siang")  
    .then(res => {
      const cleanedRes = res.replace(/\n/g, "");
      postData("model", cleanedRes);
      bot.sendMessage(id,cleanedRes)
      console.log("AI berhasil tereksekusi")
    })
    minuteIf = Math.round(Math.random()*9)
    secondsIf = Math.round(Math.random()*60)
  }
  //sholat zuhur
  else if(hour == 12 && minute == minuteIf) {
    run("Model mengingatkan user agar tidak lupa sholat Zuhur dan makan siang")  
    .then(res => {
      const cleanedRes = res.replace(/\n/g, "");
      postData("model", cleanedRes);
      bot.sendMessage(id,cleanedRes)  
      console.log("AI berhasil tereksekusi")
    })
    minuteIf = Math.round(Math.random()*9)
    secondsIf = Math.round(Math.random()*60)
    }
  //sholat magrib
  else if(hour == 18 && minute == minuteIf) {
    run("Model mengingatkan user agar tidak lupa sholat magrib dan makan malam")  
    .then(res => {
      const cleanedRes = res.replace(/\n/g, "");
      postData("model", cleanedRes);
      bot.sendMessage(id,cleanedRes)
      console.log("AI berhasil tereksekusi")
    })
    minuteIf = Math.round(Math.random()*9)
    secondsIf = Math.round(Math.random()*60)
  }
},6000)

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  let text = msg.text
  run(text)
  .then(res => {
    const cleanedRes = res.replace(/\n/g, "");
    postData("model", cleanedRes)
    postData("user", text)
    console.log(chatId)
    bot.sendMessage(chatId, cleanedRes)
  })
});

