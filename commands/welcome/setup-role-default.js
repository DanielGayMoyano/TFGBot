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
    console.log(rol);
    if (!rol) {
      return message.reply(
        `El rol que ha mencionado no existe!\n**Uso** \`${config.PREFIX}setup-role-default <#ROLE>\``
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
        console.log(data);
        message.reply(`Se ha configurado correctamente el rol por defecto\n**Rol:** ${data.roleId}`);
      }
    );
  },
};
