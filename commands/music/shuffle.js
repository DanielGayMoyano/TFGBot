module.exports = {
  name: "shuffle",
  aliases: ["random", "aleatorio"],
  desc: "Activa o desactiva el modo aleatorio en la cola de reproducción.",
  run: async (client, message, args) => {
    if (!message.member.voice?.channel) {
      return message.reply(
        `❌**Tienes que estar en un canal de voz para ejecutar este comando!**`
      );
    }

    client.distube.shuffle(message.guild);
    message.reply(`🔀**El orden de la lista ha cambiado**`);
  },
};
