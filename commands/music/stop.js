module.exports = {
  name: "stop",
  aliases: ["pausar", "terminar"],
  desc: "Para la lista de reproducción, además de quitar todas las canciones de la lista.",
  run: async (client, message, args) => {
    try {
      if (!message.member.voice?.channel)
        return message.reply(
          `❌**Tienes que estar en un canal de voz para ejecutar este comando!**`
        );
      let queue = client.distube.getQueue(message.guild.id);
      if (queue.songs.length >= 1) {
        client.distube.stop(message.guild);
        return message.reply(`⛔**Se ha terminado la lista**`);
      } else {
        return message.reply(`❌**No hay nada reproduciendose!**`);
      }
    } catch (err) {
      message.reply(`❌**Se ha producido un error!**`);
    }
  },
};
