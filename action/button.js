
const { MessageType }= require('@adiwajshing/baileys'),
         fs = Ft.fs,
         { servers, yta, ytv } = require("../Lib/y2mate.js")
const { tiktok } = require("../Lib/scrape.js")
const { tiktokmusic } = require("../Lib/scrape")
module.exports = {
async execute(m, {button}) {
try {
switch (button.split(" ")[0].toLowerCase()) {
case "creator": {
this.sendContact(m.chat, conn.user.jid, "Fauzan", m)
}
break
case "tnowm":
   m.reply('sedang memproses')
   download = await tiktok(button.split(" ")[1])
   conn.sendMessage(m.chat, await (await Ft.fetch(download.result.nowm)).buffer(),"videoMessage",{quoted:m})
   break;
   case "tmusic":
   m.reply('sedang memproses')
   let p = await tiktokmusic(button.split(" ")[1])
   conn.sendFile(m.chat, p.meta.music.playUrl, null, null, m)
   break;
case "audio":
  try {
let yt = false
let usedServer = servers[0]
  for (let i in servers) {
    let server = servers[i]
    try {
      yt = await yta(button.split(" ")[1], server)
      usedServer = server
      break
    } catch (e) {
      m.reply(`Server ${server} error!${servers.length >= i + 1 ? '' : '\nmencoba server lain...'}`)
    }
  }
if (yt === false) throw 'semua server gagal'
conn.sendFile(m.chat,yt.dl_link,"m.mp3",null,m)
} catch (e) {
throw e
}
break;

   case "video":
  try {
let yt = false
let usedServer = servers[0]
  for (let i in servers) {
    let server = servers[i]
    try {
      yt = await ytv(button.split(" ")[1], server)
      usedServer = server
      break
    } catch (e) {
      m.reply(`Server ${server} error!${servers.length >= i + 1 ? '' : '\nmencoba server lain...'}`)
    }
  }
if (yt === false) throw 'semua server gagal'
conn.sendFile(m.chat,yt.dl_link,"m.mp4",null,m)
} catch (e) {
throw e
}
break;


}
} catch (e) {
console.log(e)
}
}
}
