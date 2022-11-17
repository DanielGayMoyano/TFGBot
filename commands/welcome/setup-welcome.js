//corregir error al mandar mensajes al canal, no recibe el mensaje en el
//canal de saludos, creo que no se pasa nada de info del mensaje de set up al server
const Discord = require("discord.js");
const config = require("../../config/config.json");
const setupWelcome = require(`../../modelos/setupWelcome.js`);
const { asegurar } = require("../../handlers/funciones");
module.exports = {
  name: "setup-welcome",
  aliases: ["welcome-message"],
  desc: "Asigna el canal donde se enviarán los mensajes de bienvenida a cada usuario que se una al servidor, mensaje si se pasa como argumento sobreescribe el mensaje por defecto.",
  run: async (client, message, args) => {
    //if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No puedes usar este comando");

    //recuperar el canal como argumento
    const channel = args[0];

    if (!channel)
      //comprobacion que el canal exista o no
      return message.reply(
        `El canal que ha mencionado no existe!\n**Uso** \`${config.PREFIX}setup-welcome <#CANAL O ID>\``
      );

    setupWelcome.findOne({ guildId: message.guild.id }, async (err, data) => {
      if (data) {
        data.channelId = channel;

        data.save();
      } else {
        new setupWelcome({
          guildId: message.guild.id,
          channelId: channel,
        }).save();
      }
      message.reply(
        `Se ha configurado correctamente el canal de bienvenida\n**Canal:** ${data.channelId}\n**Mensaje de bienvenida:** ${config.welcomeMessage}${config.NAME}`
      );
    });
  },
};
