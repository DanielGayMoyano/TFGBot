const Discord = require("discord.js");
const config = require("../../config/config.json");
const readirSync = require("fs");
const playlists = require("../../playlist/playlists.json");
const { MessageSelectMenu, MessageActionRow, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "radio",
  aliases: ["playlists"],
  desc: "Muestra un mensaje con una lista desplegable para elegir el género de la música que quieras que sea la radio.",
  run: async (client, message, args) => {
    try {
      let allPlaylist = [];
      //playlists.playlistSpotify.forEach((element) => allPlaylist.push(element));
      //no puede haber listas de spotify por la longitud del enlace que es mayor de 100 caracteres

      playlists.playlistYoutube.forEach((element) => allPlaylist.push(element));
      let embedMessage = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`Radio Lloro's Bot`)
      .setDescription(`Welcome to Radio Lloro's Bot`);

      let cont=1;
      const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("playlists")
          .setPlaceholder("Elige el género de la radio")
          .addOptions([allPlaylist])
      );

      message.channel.send({ embeds: [embedMessage], components: [row] });
    
    } catch (err) {
      console.log(err);
      message.reply(`❌**Se ha producido un error!**`);
    }
  },
};
