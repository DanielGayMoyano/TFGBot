const { Discord } = require("discord.js");
const { Distube } = require("distube");
const loop = require("../../commands/music/loop.js");
const play = require("../../commands/music/play.js");
const setupRadioChannel = require("../../modelos/setupRadioChannel.js");
const {
  joinVoiceChannel,
  entersState,
  VoiceConnectionStatus,
} = require("@discordjs/voice");
const { VoiceConnection } = require("@discordjs/voice");
const playlists = require("../../playlist/playlists.json");
module.exports = async (client, interaction, message, args) => {
  if (!interaction.member.voice?.channel)
    return interaction.reply(
      `❌**Tienes que estar en un canal de voz para ejecutar este comando!**`
    );

  let queue = client.distube.getQueue(interaction.guild.id);
  //console.log(queue);
  if (queue !== undefined) {
    if (queue.playing) {
      client.distube.stop(interaction.guild.id);
    }
  }
  //console.log(interaction.values[0]);
  //console.log(client.distube.playing);
  client.distube.play(
    interaction.member.voice?.channel,
    interaction.values[0],
    {
      member: interaction.member,
      textChannel: interaction.channelId,
      message,
    }
  );
  interaction.deferUpdate(`Buena elección`);

  //console.log(queue.songs.length);
  //queue.toogleAutoplay();
  //loop.run(client, message);

  //loop.run(client,message);

  //console.log(queue);
};
