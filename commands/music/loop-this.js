module.exports = {
  name: "loop-this",
  aliases: ["repetir-cancion"],
  desc: "Alterna si se repite la canción que esté sonando en ese momento en bucle, mostrando un mensaje del estado del loop",
  run: async (client, message, args) => {
    try {
      if (!message.member.voice?.channel)
        return message.reply(
          `❌**Tienes que estar en un canal de voz para ejecutar este comando!**`
        );
      let queue = client.distube.getQueue(message.guild.id);
      switch (queue.repeatMode) {
        case 0:
          queue.setRepeatMode(1);
          message.reply(`🔂**Se repetirá la canción actual**`);
          break;
        case 1:
          queue.setRepeatMode(0);
          message.reply(`❌**Se reproducirá el resto de la lista**`);
          break;
        default:
          queue.setRepeatMode(0);
          message.reply(`❌**Se reproducirá el resto de la lista**`);
          break;
      }
    } catch (err) {
      message.reply(`❌**Se ha producido un error!**`);
    }
  },
};
