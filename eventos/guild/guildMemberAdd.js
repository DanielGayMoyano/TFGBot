const config = require("../../config/config.json");
const { asegurar } = require("../../handlers/funciones.js");
const setupWelcome = require("../../modelos/setupWelcome.js");
const setupRoleDefault=require("../../modelos/setupRoleDefault.js");
module.exports = async (client, member) => {
  
  //console.log(member.guild.id);
  //en caso que no exista una tabla con este id, lo crea y lo devuelve a data
  setupWelcome.findOne({ guildId: member.guild.id }, async (err, data) => {
    if (!data) return;
    const user = member.user.tag;
    
    let text = data.channelId.toString();
    let result = text.substring(2, (text.length-1));
    client.channels
      .fetch(result)
      .then((channel) =>
        channel.send(
          config.welcomeMessage.replace(/{Usuario}/, user) + config.NAME
        )
      );
  });
  setupRoleDefault.findOne({guildId:member.guild.id},async(err,data)=>{
    if(!data)return;
    //if(!member.hasPermission('MANAGE_ROLES'))return client.channel.send('No permission');
    let text = data.roleId.toString();
    let result = text.substring(3, text.length-1);
    let role=member.guild.roles.cache.find(role=>role.id===result);
    console.log(role);
    try{
    member.roles.add(role).then(console.log('Role added: ' + member.user.tag));
    }catch(error){
      console.log(err)
    }
    
  });
  /*
  try {
    //añadir mensaje, canal y role a un nuevo usuario
    if (data) {
      console.log("primer if");
      console.log(data);
      if (member.guild.channels.cache.get(data.welcomeChannel)) {
        const channel = member.guild.channels.cache.get(data.welcomeChannel);
        console.log("segundo if");
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
    console.log("catch"+e);
  }*/

};
