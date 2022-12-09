const Discord = require("discord.js");
const config = require("../../config/config.json");
const setupRoleDefault = require("../../modelos/setupRoleDefault.js");
const { asegurar } = require("../../handlers/funciones.js");
module.exports = {
  name: "setup-role-default",
  aliases: ["role-default"],
  desc: "Asigna el rol por defecto a los nuevos usuarios en cada servidor, para evitar tener que hacerlo a mano.",
  run: async (client, message, args) => {
    const rol = args[0];
    if (!rol) {
      return message.reply(
        `El rol que ha mencionado no existe!\n**Uso** \`${config.PREFIX}setup-role-default <#ROLE>\``
      );
    }
    let text = rol.toString();
    let result = text.substring(3, text.length - 1);

    if (message.guild.roles.cache.get(result) === undefined) {
      return message.reply(
        `**El argumento usado no es un rol!\nUso \`${config.PREFIX}setup-role-default <#CANAL>\`**`
      );
    }
    setupRoleDefault.findOne(
      { guildId: message.guild.id },
      async (err, data) => {
        if (data) {
          data.roleId = rol;
          data.save();
        } else {
          new setupRoleDefault({
            guildId: message.guild.id,
            roleId: rol,
          }).save();
        }
        message.reply(
          `Se ha configurado correctamente el rol por defecto\n**Rol:** ${data.roleId}`
        );
      }
    );
  },
};
