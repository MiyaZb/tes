module.exports = {
name: "antivirtex",
async functions(m) {
if (m.text && m.text.length >= 1000) {
await this.groupRemove(m.chat, [m.sender])
m.reply(Ft.Res("ANTIVIRTEX!!!".repeat(500)))
}
}
}
