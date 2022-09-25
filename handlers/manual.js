const fs = require("fs");
const config = require("../config/config.json");
const Discord = require("discord.js");
const { MessageActionRow, MessageSelectMenu } = require("discord.js");
module.exports = (client, interaction, message, args) => {
  const comandos = fs.readdirSync(`./commands/${interaction.values[0]}`);

  let chanel=client.channels.cache.get(interaction.channelId);
  chanel.send(args);

};
