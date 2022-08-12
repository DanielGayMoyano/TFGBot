const { joinVoiceChannel,entersState,VoiceConnectionStatus } = require("@discordjs/voice");
const { VoiceConnection } =require ("@discordjs/voice");
module.exports={
    name:"join",
    aliases:["unirse"],
    desc:"Se une a un canal de voz, pero no reproduce nada.",
    run:async(client,message,args)=>{
        connection=VoiceConnection;
        //if(!args.length) return message.reply(`❌ **Tienes que especificar el nombre de un canal**`);
        if(!message.member.voice?.channel)return message.reply(`❌**Tienes que estar en un canal de voz para ejecutar este comando!**`);
        let channel=message.member.voice?.channel;
        const connection=joinVoiceChannel({
            channelId: channel,
            guildId:channel.guild.id,
            adapterCreator:channel.guild.voiceAdapterCreator,
        });
        
        try {
            await entersState(this.connection, VoiceConnectionStatus.Ready, TIMEOUT);
          } catch {
            if (this.connection.state.status === VoiceConnectionStatus.Ready) return this;
            if (this.connection.state.status !== VoiceConnectionStatus.Destroyed) this.connection.destroy();
            this.voices.remove(this.id);
            throw new DisTubeError("VOICE_CONNECT_FAILED", TIMEOUT / 1e3);
          }
        message.reply(`Me he unido al canal ${channel}`);
    }
}