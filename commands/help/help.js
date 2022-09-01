const Discord = require("discord.js");
const { readdirSync } = require("fs");
const config = require("../../config/config.json");
module.exports = {
  name: "help",
  aliases: ["ayuda", "comandos", "comands"],
  desc: "Muestra todos los comandos disponibles con una descripción corta",
  run: async (client, message, args, prefix) => {
    const categorias = readdirSync("./commands");
    if (args[0]) {
      const comando =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.alieases.includes(args[0].toLowerCase())
        );
      const categoria = categorias.find((categoria) =>
        categoria.toLowerCase().endsWith(args[0].toLowerCase())
      );
      if (comando) {
        let embed = new Discord.MessageEmbed()
          .setTitle(`Comando \`${comando.name}\``)
          .setFooter({ text: `Desarrollado por ${config.AUTHOR_NICKNAME}` })
          .setColor(client.color);

          if(comando.desc)embed.addField(`Descripción`,`\`\`\`${comando.desc}\`\`\``);//buscar opcion para escribir addFields y que funcione con variables
          if(comando.aliases && comando.aliases.length>1)embed.addField(`Alias`, `${comando.aliases.map(alias=> `\`${alias}\``).join(", ")}`);
          //if(comando.permisos && comando.permisos.length>1)embed.addField(`Alias`, `${comando.aliases.map(alias=> `\${alias}\``).join(", ")}`);
          //if(comando.permisos_bot && comando.permisos_bot.length>1)embed.addField(`Alias`, `${comando.aliases.map(alias=> `\${alias}\``).join(", ")}`);
          return message.reply({embeds:[embed]});
      };
    }
  },
};
