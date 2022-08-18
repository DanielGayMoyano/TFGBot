module.exports = {
  name: "play",
  aliases: ["reproducir"],
  desc: "Si no está en un canal, se conecta a donde está el usuario que escribió el comando, si está reproduciendo algo, se añade a la cola de reproducción automáticamente.",
  run: async (client, message, args) => {
    if (!args.length)
      return message.reply(
        `❌ **Tienes que especificar el nombre de una cancion**`
      );
    if (!message.member.voice?.channel)
      return message.reply(
        `❌**Tienes que estar en un canal de voz para ejecutar este comando!**`
      );
    if (
      message.guild.me.voice?.channel &&
      message.member.voice?.channel.id != message.guild.me.voice?.channel.id
    )
      return message.reply(
        `❌ **Tienes que estar en el mismo canal de voz __QUE YO__ para ejecutar este comando!**`
      );
    client.distube.play(message.member.voice?.channel, args.join(" "), {
      member: message.member,
      textChannel: message.channel,
      message,
    });
    //client.distube.setVolume(message.guild.id, 100);
    message.reply(`🔎 **Buscando \`${args.join(" ")}\`...**`);

  },
};
