module.exports = {
  name: "addplaylist-to-radio",
  aliases: ["new-playlist-radio"],
  desc: "Añade a la lista de radios una nueva opción, para ello debe pasarse el enlace de Youtube como argumento",
  run: async (client, message, args) => {
    if (args.length == 0)
      return message.reply(
        `❌**Es necesario el enlace de Youtube para añadir la playlist a la lista**`
      );
  },
};
