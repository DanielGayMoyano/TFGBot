module.exports = {
    name: "loop",
    aliases: ["repetir-lista"],
    desc: "Alterna si la cola se reproduce en bucle o no, mostrando un mensaje del estado del loop",
    run: async (client, message) => {
      try {
        if (!message.member.voice?.channel)
          return message.reply(
            `❌**Tienes que estar en un canal de voz para ejecutar este comando!**`
          );
        let queue = client.distube.getQueue(message.guild.id);
console.log(message.guild.id);
        switch (queue.repeatMode) {
          case 0:
            queue.setRepeatMode(2);
            message.reply(`🔁**Se ha activado el loop a la lista de reproducción**`);
            break;
          case 2:
            queue.setRepeatMode(0);
            message.reply(`❌**Se ha desactivado el loop a la lista de reproducción**`);
            break;
          default:
            queue.setRepeatMode(0);
            message.reply(`❌**Se ha desactivado el loop a la lista de reproducción**`);
            break;
        }
  
      } catch (err) {
        message.reply(`❌**Se ha producido un error!**`);

      }
    },
  };
  