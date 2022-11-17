const Discord = require("discord.js");
const config = require("../../config/config.json");
const setupGoodbye = require("../../modelos/setupGoodbye.js");
const { asegurar } = require("../../handlers/funciones");
module.exports = {
  name: "setup-goodbye",
  aliases: ["goodbye-message"],
  desc: "Asigna el canal donde se enviarán los mensajes de bienvenida a cada usuario que se una al servidor, mensaje si se pasa como argumento sobreescribe el mensaje por defecto.",
  run: async (client, message, args) => {
    const channel = args[0];
    if (!channel) {
      return message.reply(
        `El canal que ha mencionado no existe!\n**Uso** \`${config.PREFIX}setup-goodbye <#CANAL o ID>\``
      );
    }
    setupGoodbye.findOne({ guildId: message.guild.id }, async (err, data) => {
      if (data) {
        data.channelId = channel;
        data.save();
      } else {
        new setupGoodbye({
          guildId: message.guild.id,
          channelId: channel,
        }).save();
      }
      message.reply(
        `Se ha configurado correctamente el canal de despedida\n**Canal:** ${data.channelId}\n**Mensaje de despedida:** ${config.goodbyeMessage}`
      );
    });
  },
};
