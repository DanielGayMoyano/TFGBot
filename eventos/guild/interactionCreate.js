const { DisTube, Queue } = require("distube");
const setupRadioChannel = require("../../modelos/setupRadioChannel.js");
const {
  joinVoiceChannel,
  entersState,
  VoiceConnectionStatus,
} = require("@discordjs/voice");
const { VoiceConnection } = require("@discordjs/voice");
const playlists = require("../../playlist/playlists.json");
module.exports = (client, interaction, message, args) => {
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
  } else {
    let canal=setupRadioChannel.findOne({guildId: interaction.guild.id},
      async(err,data)=>{
        if(!data) return;
        let text = data.channelId.toString();
        let result = text.substring(2, text.length - 1);
        return result;
      });
    queue = new Queue(client.distube, interaction.member.voice, interaction.values[0], canal);
  }
  
  client.distube
    .play(interaction.member.voice?.channel, interaction.values[0], {
      member: interaction.member,
      textChannel: interaction.channelId,
      message,
    });
  interaction.deferUpdate(`Buena elección`);
   
    
  //queue = client.distube.getQueue(interaction.guild); //.toggleAutoplay(interaction);
  //let cola = client.distube.getQueue(interaction.guild.id);
  //console.log(cola);
  queue.setRepeatMode(2);
  console.log(queue);
};
