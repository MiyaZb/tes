const pokefunc = require("../../Lib/poke.js")
const request = require ("request-promise")
global.pokemon = []
poke = async() => {
const raww = await request.get(`https://pokeapi.co/api/v2/pokemon?offset=1&limit=1118`)
const raw = JSON.parse(raww).results
for (i of raw) {
name = i.name
pokemon.push(name)
}
}
poke()
module.exports = {
name: "pokemon",
command: ["pokemon"],
type: ['information'],
description: "mengetahui informasi pokemon",
utilisation: global.userbot.prefix+ "pokemon" + " list/pokemon_name",

async execute(m) {
let {conn, args, text} = data
if (args[0] == "list") {
txt = `${pokemon.length} total list pokemon\n`
for (i of pokemon) {
txt += `-${i}\n`
}
vb = txt.trim()
return m.reply(vb)
}
if (!text) return m.reply('Give me pokemon name!, used #pokemon list for list pokemon name')
if (pokemon.includes(text.toLowerCase())) {
 pokedta = await pokefunc.pkmzdata(text.toLowerCase())
conn.sendFile(m.chat, pokedta.url, "", pokedta.data, m)
} else {
conn.reply(m.chat, `No such pokemon (${text.toLowerCase()})`, m)
}
}
}