module.exports = {
  name: "now-playing",
  aliases: ["reproduciendo", "reproduciendo-ahora", "np"],
  desc: "Muestra un mensaje con la canción que está sonando en ese momento. Siempre que haya música sonando.",
  run: async (client, message, args) => {
    if (!message.member.voice?.channel) {
      return message.reply(
        `❌**Tienes que estar en un canal de voz para ejecutar este comando!**`
      );
    }
    let queue = client.distube.getQueue(message.guild.id);
    if (queue===undefined) {
        return message.reply(`**Queue is empty**`);
    }
    let song = queue.songs[0];
    message.reply(
      `**Now is playing ${song.name}-${song.formattedDuration} by ${song.user}**`
    );
  },
};
