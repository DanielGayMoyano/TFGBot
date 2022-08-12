module.exports= {
    name:"pause",
    aliases:["pausar","parar"],
    desc:"Si está reprodiendo algo lo pone en pausa, y en el caso que no esté reproduciendo nada, mostrará un mensaje de error.",
    run:async (client, message,args)=>{
        try{
        //if(!args.length) return message.reply(`❌ **Tienes que especificar el nombre de una cancion**`);
        if(!message.member.voice?.channel)return message.reply(`❌**Tienes que estar en un canal de voz para ejecutar este comando!**`);
        //if(message.guild.me.voice?.channel && message.member.voice?.channel.id!=message.guild.me.voice?.channel.id) return message.reply(`❌ **Tienes que estar en el mismo canal de voz __QUE YO__ para ejecutar este comando!**`);
        client.distube.pause(message.guild);
        message.reply(`⏸**Se ha pausado la musica**`);
        }catch(err){
            message.reply(`❌**La música ya está parada!**`);
        };
    }

}