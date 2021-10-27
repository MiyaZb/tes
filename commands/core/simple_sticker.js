const {default: fetch} = require("node-fetch")
const fs = require('fs');
const { fromBuffer } = require('file-type')
const __path = process.cwd()
const FormData = require("form-data")
const axios = require('axios');
const { tmpdir } = require('os');
const path = require('path')
const Crypto = require("crypto")
const tmp = path.join(
    tmpdir(),
    `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}`
);
function bufferToPath(buffer) {
    if (!Buffer.isBuffer(buffer)) return console.log('do not a buffer')
    return new Promise (async(resolve, reject) => {
const cek_file = await fromBuffer(buffer)
fs.writeFile(tmp+`.${cek_file.ext}`, buffer, (e, f) => {
    if (e) return console.log(e)
    resolve(fs.createReadStream(tmp+`.${cek_file.ext}`))
})
    })
}

function toUrl(path) {
    return new Promise(async(resolve, reject) => {
        const isbuf = await Buffer.isBuffer(path) ? await bufferToPath(path) : fs.createReadStream(path)
        const bodyForm = new FormData()
        bodyForm.append('recfile', isbuf)
        await axios(`https://uploader.hardianto.xyz/upload`,{
            method: 'POST',
            data: bodyForm,
            headers: {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,id;q=0.8",
                "content-type": `multipart/form-data; boundary=${bodyForm._boundary}`
            }
        }).then(({ data }) => {
            console.log(data.file)
            resolve(data.file)

    }).catch(e => console.log(e))
    })
}

async function sticker(buffer, url = false, metadata) {
     const url_or_buffer = url ? url : await toUrl(buffer)
     let data = await fetch('https://me.hardianto.xyz/api/sticker-api', {
        method: "POST",
        body: new URLSearchParams(Object.entries({
            name: metadata.name,
            author: metadata.author,
            file: url_or_buffer,
            crop: metadata.crop || false

        }))
    }).then(v => v.buffer())
    return data
}

const { MessageType } = require('@adiwajshing/baileys')
module.exports = {
    name: "simple_sticker",
    command: ["sticker"],
type: ["create"],
description: "create sticker with simple module",
utilisation: "#stc (reply)",
async execute(m) {
 let { conn } = data
        let stiker = false
        let q = m.quoted ? m.quoted : m
          let img = await q.download()
          if (!img) return m.reply(`balas stiker dengan perintah ${userbot.prefix}stc`)
           stiker = await sticker(img, null, { name: userbot.packname, author: userbot.author, crop: true })
          if (stiker) await conn.sendMessage(m.chat, stiker, MessageType.sticker, {
            quoted: m
          })
        }
      }
