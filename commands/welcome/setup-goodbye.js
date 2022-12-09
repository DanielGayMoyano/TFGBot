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
    let text = channel.toString();
    let result = text.substring(2, text.length - 1);

    //client.channels.fetch(result).then(canal => console.log(canal.name));
    
    
    if(message.guild.channels.cache.get(result) === undefined)  { 
      return message.reply(
        `**El argumento usado no es un canal!\nUso \`${config.PREFIX}setup-goodbye <#CANAL>\`**`
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
