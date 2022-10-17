const Discord = require("discord.js");
const { readdirSync } = require("fs");
const config = require("../../config/config.json");
const { MessageSelectMenu, MessageActionRow, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "help",
  aliases: ["ayuda", "comandos", "comands"],
  desc: "Muestra todos los comandos disponibles con una descripción corta",
  run: async (client, message, args, prefix) => {
    const categorias = readdirSync("./commands");
    let listaCategorias=[];
    
    categorias.forEach(c=>{
      let categoria={
        "label":c,
        "value":c
      }
      listaCategorias.push(categoria);
    });
    if (!args[0]) {
      const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("categories")
          .setPlaceholder("Elige la categoria de la ayuda")
          .addOptions(listaCategorias)
      );

      let embed = new Discord.MessageEmbed()
        .setColor(`#0099ff`)
        .setTitle(`General help`)
        .setThumbnail(
          "https://www.geekmi.news/__export/1652632284587/sites/debate/img/2022/05/15/anya2.jpg_903948830.jpg"
        )
        .addFields(
          {
            name: "Total Commands",
            value: `${config.totalComandos}`,
          },
          {
            name: "Tip",
            value: `\`${config.PREFIX}help <#command>\``,
          },
          {
            name: "Author",
            value: `${config.AUTHOR_NICKNAME}`,
          }
        );
      return message.reply({ embeds: [embed],components:[row] });
    }

    if (args[0]) {
      const comando =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );
      const categoria = categorias.find((categoria) =>
        categoria.toLowerCase().endsWith(args[0].toLowerCase())
      );
      if (comando) {
        let embed = new Discord.MessageEmbed()
          .setTitle(`Comando \`${comando.name}\``)
          .setFooter({ text: `Desarrollado por ${config.AUTHOR_NICKNAME}` })
          .setColor(client.color);

        if (comando.desc)
          embed.addField(`Descripción`, `\`\`\`${comando.desc}\`\`\``); //buscar opcion para escribir addFields y que funcione con variables
        if (comando.aliases && comando.aliases.length > 1)
          embed.addField(
            `Alias`,
            `${comando.aliases.map((alias) => `\`${alias}\``).join(", ")}`
          );
        //if(comando.permisos && comando.permisos.length>1)embed.addField(`Alias`, `${comando.aliases.map(alias=> `\${alias}\``).join(", ")}`);
        //if(comando.permisos_bot && comando.permisos_bot.length>1)embed.addField(`Alias`, `${comando.aliases.map(alias=> `\${alias}\``).join(", ")}`);
        return message.reply({ embeds: [embed] });
      }
    }
  },
};
