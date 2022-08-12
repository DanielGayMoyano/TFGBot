const config = require(`../../config/config.json`);
const serverSchema = require(`${process.cwd()}/modelos/servidor.js`);
const { asegurar } = require(`${process.cwd()}/handlers/funciones.js`);

module.exports = async (client,message) => {
  if (message.author.bot || !message.guild || !message.channel) return;

  let data = await asegurar(serverSchema, "guildID", message.guild.id, {
    guildID: message.guild.id,
    prefijo: config.PREFIX,
  });
  if(!message.content.startsWith(data.prefijo))return;
  const args=message.content.slice(data.prefijo.length).trim().split(" ");
  const cmd=args.shift()?.toLowerCase();
  const command=client.commands.get(cmd) || client.commands.find(c=> c.aliases && c.aliases.includes(cmd));

  if(command){
    command.run(client, message,args, data.prefijo)
  }else{
    return message.reply("No he encontrado que me has especificado!");
  }
};
