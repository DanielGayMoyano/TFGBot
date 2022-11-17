const config = require("../../config/config.json");
const { asegurar } = require("../../handlers/funciones.js");
const setupGoodbye = require("../../modelos/setupGoodbye.js");
const setupRoleDefault = require("../../modelos/setupRoleDefault.js");
module.exports = async (client, member) => {
  setupGoodbye.findOne({ guildId: member.guild.id }, async (err, data) => {
    if (!data) return;
    const user = member.user.tag;
    let text = data.channelId.toString();
    let result = text.substring(2, text.length - 1);
    client.channels
      .fetch(result)
      .then((channel) =>
        channel.send(
          config.goodbyeMessage.replace(/{Usuario}/, user) + config.NAME
        )
      );
  });
};
