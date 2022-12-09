const distube = require("../../handlers/distube");

module.exports = {
  name: "skip",
  aliases: ["next", "siguiente"],
  desc: "si hay un elemento en la cola, pasa al siguiente, en caso que no exista, mostrará un mensaje",
  run: async (client, message, args) => {
    //if(!args.length) return message.reply(`❌ **Tienes que especificar el nombre de una cancion**`);

    let queue = client.distube.getQueue(message.guild.id);
    if (!message.member.voice?.channel)
      return message.reply(
        `❌**Tienes que estar en un canal de voz para ejecutar este comando!**`
      );
    //if(message.guild.me.voice?.channel && message.member.voice?.channel.id!=message.guild.me.voice?.channel.id) return message.reply(`❌ **Tienes que estar en el mismo canal de voz __QUE YO__ para ejecutar este comando!**`);
    if (queue !== undefined) {
      if (queue.songs.length > 1 || queue.autoplay) {
        client.distube.skip(message.guild);
      } else {
        client.distube.stop(message.guild);
        message.reply(`❌ **No hay más canciones!**`);
      }
    } else {
      message.reply(`❌ **No hay canciones!**`);
    }
  },
};
