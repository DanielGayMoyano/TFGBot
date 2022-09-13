const { DisTube, Queue } = require("distube");
const setupRadioChannel = require("../../modelos/setupRadioChannel.js");
const {
  joinVoiceChannel,
  entersState,
  VoiceConnectionStatus,
} = require("@discordjs/voice");
const { VoiceConnection } = require("@discordjs/voice");
const playlists = require("../../playlist/playlists.json");
const { readdirSync } = require("fs");
module.exports = (client, interaction, message, args) => {
  if (interaction.customId === "playlists") {
    createRadio(client, interaction, message);
  }
  if (interaction.customId === "categories") {
    createMessageCategorie(client, interaction, message, args);
  }
  
};
function createMessageCategorie(client, interaction, message, args) {
  const comandos = readdirSync(`./commands/${interaction.values[0]}`).filter((archivo) => archivo.endsWith(".js"));
 
  let listaComandos = [];
  for (let archivo of comandos) {
    console.log(comandos);
    let comando = require(`../commands/${interaction.values[0]}/${archivo}`);
   
    if (comando.name) 
    {
      

        let com = {
          "label": comando.name,
          "value": comando.name,
        };

        listaComandos.push(com);
      comandos++;
    } 

  }
 

 
console.log(listaComandos)
  interaction.deferUpdate("");
}

function createRadio(client, interaction, message) {
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
    let canal = setupRadioChannel.findOne(
      { guildId: interaction.guild.id },
      async (err, data) => {
        if (!data) return;
        let text = data.channelId.toString();
        let result = text.substring(2, text.length - 1);
        return result;
      }
    );
    queue = new Queue(
      client.distube,
      interaction.member.voice,
      interaction.values[0],
      canal
    );
  }

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
  queue.setRepeatMode(2);
}
