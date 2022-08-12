/* 
    comando para instalar las librerias de discord 
        npm install discord.js dotenv
    
    comando para instalar nodemon (para comodidad al usar node y mejorar el flujo de trabajo)     
*/

//
//por cada pusheo a github reiniciar el token para que funcione el bot
//

const config = require("./config/config.json");
const Discord = require("discord.js");
//const Enmap = require("enmap");
require("colors"); //opcional pero queda mas bonito y sirve para hacer logs en la consola con colores
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    //Discord.Intents.FLAGS.MANAGE_ROLES
  ],
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

function requireHandlers() {
  ["command", "events", "distube"].forEach((handler) => {
    try {
      require(`./handlers/${handler}`)(client,Discord)
    } catch (e) {
      console.warn(e);
    }
  });
}
requireHandlers();


/*
  loguea el bot usando el token del fichero de configuracion y permite usar el resto de metodos
*/
client.login(config.CLIENT_TOKEN);

/*
evento para configurar cada nuevo usuario de una forma predeterminada
*/
/*
client.on("guildMemberAdd", async (member) => {
  console.log("prueba");

  //en caso que no exista una tabla con este id, lo crea y lo devuelve a data
  let data = ensureDb(member.guild.id);

  try {
    //añadir mensaje, canal y role a un nuevo usuario
    if (data) {
      if (member.guild.channels.cache.get(data.welcomeChannel)) {
        const channel = member.guild.channels.cache.get(data.welcomeChannel);

        //console.log("hola mundo");
        //let role = client.guild.roles.cache.get(data.roleDefault);
        //console.log(role);
        //member.roles.add(role);

        //const embedDatos=new Discord.MessageEmbed().setTitle("")
        channel.send(data.welcomeMessage.replace(/{Usuario}/, member));
        //channel.send(data.welcomeMessage.replace(/{NombreBot}/,config.name));
        console.log(member);
      }
    }
  } catch (e) {
    console.log(e);
  }
  console.log(data);
});*/



 /*
client.on("messageCreate", async (message) => {

  //comprueba que el que escribe el mensaje no sea un bot, que el server no sea nulo, y que el canal no sea nulo
  //se hace para que no haya un error con esto


 
 
  //asigna el rol por defecto para cada usuario nuevo que entre en el servidor
  if (command === "setup-role-default") {
    const role =
      message.guild.roles.cache.get(args[0]) || message.mentions.roles.first();
    if (!role) {
      return message.reply(
        `El rol que se ha mencionado no existe!\n**Uso** \`${config.PREFIX}setup-role-default <role>\``
      );
    }
    let obj = {
      roleDefault: role,
    };
    client.setups.set(message.guild.id, obj);
    //console.log(client.setups.get(message.guild.id));
    return message.reply(`El rol se ha asignado correctamente`);
  }
  if (command === "server") {
    //const aux=client.guilds.cache.map(g=>g.name).join(" ");
    //const server=client.guilds.cache.map(aux).join(" ");
    const server = message.guild.name;
    message.reply("El nombre de los servers donde esta " + " son " + server);


  }

  }
});
*/


