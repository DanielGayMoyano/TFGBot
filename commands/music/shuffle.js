module.exports = {
  name: "shuffle",
  aliases: ["random", "aleatorio"],
  desc: "Aleatoriza el orden de las canciones en la cola. Pero siempre manteniendo la que suena y la siguiente en ese orden.",
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
