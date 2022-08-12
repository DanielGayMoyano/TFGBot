const mongoose = require("mongoose");
const setupWelcome = new mongoose.Schema({
  guildId: String,
  channelId: String,
 
});

const model = mongoose.model("setupWelcome", setupWelcome);
module.exports=model;


