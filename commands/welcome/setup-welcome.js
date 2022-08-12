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
  run: async ( client, message, args) => {
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
        //data.welcomeMessage=`Bienvenido {Usuario} aquí podrás llorar acompañado por su bot de confianza ${config.NAME} `;
        data.save();
      
      } else {
        new setupWelcome({
          guildId: message.guild.id,
          channelId:channel,
          //welcomeMessage:`Bienvenido {Usuario} aquí podrás llorar acompañado por su bot de confianza ${config.NAME} `,
        }).save();
      } 
      message.reply(`Se ha configurado correctamente el canal de bienvenida\n**Canal:** ${data.channelId}\n**Mensaje de bienvenida:** ${config.welcomeMessage}${config.NAME}`);
    });


    /*
    console.log(channel);
    let obj;
    //comprobacion que se pase mensaje de bienvenida o no y lo setea a default o personalizado
    if (args[1]) {
      obj = {
        welcomeChannel: channel,
        welcomeMessage: args[1],
      };
    } else {
      obj = {
        welcomeChannel: channel,
        welcomeMessage: `Bienvenido {Usuario} aquí podrás llorar acompañado por su bot de confianza ${config.NAME} `,
      };
    }
    await asegurar(serverSchema, "guildID", message.guild.id, obj);
    //mensaje de comprobacion que ha ido todo correcto

    console.log("canal de bienvenida: " + obj.welcomeChannel);
    console.log("mensaje de bienvenida: " + obj.welcomeMessage);
    return message.reply(
      `Se ha configurado correctamente el canal de bienvenida\n**Canal:** ${channel}\n**Mensaje de bienvenida:** ${obj.welcomeMessage}`
    );*/
  },
};
