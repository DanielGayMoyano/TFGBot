module.exports= {
    name:"ping",
    aliases:["latencia","ms"],
    desc:"Sirve para ver la latencia del Bot",
    run:async (client, message,args, prefix)=>{
        message.reply(`El ping del bot es de \`${client.ws.ping}ms\``);
    }

}