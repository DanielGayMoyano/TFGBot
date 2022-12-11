const { DisTube } = require("distube"); //los corchetes son para importar el contructor del objeto
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { joinVoiceChannel } = require("@discordjs/voice");
const setupRadioChannel = require("../modelos/setupRadioChannel.js");

module.exports = (client, Discord, interaction) => {
  console.log(`Modulo de musica cargado`.red);

  client.distube = new DisTube(client, {
    emitNewSongOnly: false, //para evitar que no ponga unicamente canciones nuevas
    leaveOnEmpty: true, //cuando la cola este vacia, se saldra el bot
    leaveOnFinish: false, //cuando la cola este vacia, se saldra el bot
    leaveOnStop: true, //cuando haya un posible error con las canciones, se saldra el bot
    savePreviousSongs: true,
    emitAddSongWhenCreatingQueue: false,
    searchSongs: 0, //en 0 no te pide el numero de la cancion que quieras
    nsfw: false,
    emptyCooldown: 25, //tiempo que esperará el bot antes de irse del canal mientras no tenga ninguna cancion
    ytdlOptions: {
      highWaterMark: 1024 * 1024 * 64,
      quality: "highestaudio",
      format: "audioonly",
      liveBuffer: 60000,
      dlChunkSize: 1024 * 1024 * 4,
      bitrate: 512000,
    },
    youtubeDL: false,
    plugins: [
      /*new SpotifyPlugin({
        parallel: true,
        emitEventsAfterFetching: true,
      }),*/
      new SoundCloudPlugin(),
    ],
  });

  //escuchamos los eventos de distube

  client.distube.on("playSong", (queue, song) => {
    const embedMessage = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle(`${song.name}`)
          .setDescription(
            `Source: **${song.source}**\nDuration: **${song.formattedDuration}**\nUser: **${song.user}**`
          )
          .setThumbnail(song.thumbnail);
    setupRadioChannel.findOne(
      { guildId: queue.textChannel.guildId },
      async (err, data) => {
        if (!data) 
        return;
        
        let text = data.channelId.toString();
        let result = text.substring(2, text.length - 1);
        //client.distube.setVolume(client.guild,100);
        client.channels.fetch(result).then((channel) => {
          channel.send({ embeds: [embedMessage] });
        });
      }
    );
    //console.log(queue);
  });

  client.distube.on("addSong", (queue, song) => {
    setupRadioChannel.findOne(
      { guildId: queue.textChannel.guildId },
      async (err, data) => {
        if (!data) return;

        let text = data.channelId.toString();
        let result = text.substring(2, text.length - 1);

        client.channels.fetch(result).then((channel) => {
          channel.send(
            `**Added ${song.name}-${song.formattedDuration} by ${song.user}**`
          );
        });
      }
    );
  });
};
