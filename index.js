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

require("colors"); //opcional pero queda mas bonito y sirve para hacer logs en la consola con colores
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,

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




