const Discord = require("discord.js");
const config = require("../../config/config.json");
module.exports = {
  name: "info",
  aliases: ["information", "stats"],
  desc: "Muestra informacion del bot, como el nombre, fecha de creación, número de servidores donde se usa, autor, nickname del autor...",
  run: async (client, message, args, prefix) => {
    let creationDateMilliseconds = new Date(Date.now() - client.uptime);
    let createdDate =
      creationDateMilliseconds.getDate() +
      "-" +
      creationDateMilliseconds.getUTCMonth() +
      "-" +
      creationDateMilliseconds.getFullYear() +
      " " +
      creationDateMilliseconds.getHours() +
      ":" +
      creationDateMilliseconds.getMinutes() +
      ":" +
      creationDateMilliseconds.getSeconds();

    //message.reply(`Nombre del bot: \`${config.NAME}\``);
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`${config.NAME}'s information`)
      //.setURL("https://discord.js.org/") modificar cuando tenga pagina del bot
      .setAuthor({
        name: config.AUTHOR_NICKNAME,
        iconURL:
          "https://www.geekmi.news/__export/1652632284587/sites/debate/img/2022/05/15/anya2.jpg_903948830.jpg",
      })
      .setDescription(
        `This is some stats and some information about ${config.NAME}`
      )
      .setThumbnail(
        "https://www.geekmi.news/__export/1652632284587/sites/debate/img/2022/05/15/anya2.jpg_903948830.jpg"
      )
      .addFields(
        {
          name: "Servers active",
          value: `${client.guilds.cache.size} servers`,
        },
        //{ name: "\u200B", value: "\u200B" }, guardado para posibles mensajes futuros
        { name: "Author name", value: config.AUTHOR_NAME, inline: true },
        {
          name: "Author nickname",
          value: config.AUTHOR_NICKNAME,
          inline: true,
        },
        { name: "Created at", value: createdDate },
        { name: "Available commands", value: config.totalComandos },
        { name: "Available events", value: config.totalEvents }
      );

    //console.log("local");
    message.channel.send({ embeds: [exampleEmbed] });
  },
};
