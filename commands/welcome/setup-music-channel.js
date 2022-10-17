const Discord = require("discord.js");
const config = require("../../config/config.json");
const setupRadioChannel = require("../../modelos/setupRadioChannel.js");
const { asegurar } = require("../../handlers/funciones.js");

module.exports = {
  name: "setup-music-channel",
  aliases: ["music-channel", "canal-de-musica"],
  desc: "Asigna un canal para toda que toda la música se muestre en ese canal de texto.",
  run: async (client, message, args) => {
    const channel = args[0];
    if (!channel) {
      return message.reply(
        `**El canal que ha mencionado no existe!\nUso \`${config.PREFIX}setup-radio-channel <#CANAL>\`**`
      );
    }
    setupRadioChannel.findOne(
      { guildId: message.guild.id },
      async (err, data) => {
        if (data) {
          data.channelId = channel;
          data.save();
        } else {
          new setupRadioChannel({
            guildId: message.guild.id,
            channelId: channel,
          }).save();
        }
        
        message.reply(`**Se ha establecido el canal para la música\nCanal:${data.channelId}**`);
      }
    );
  },
};
