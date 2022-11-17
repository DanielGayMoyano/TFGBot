const mongoose = require("mongoose");
const setupGoodbye = new mongoose.Schema({
  guildId: String,
  channelId: String,
 
});

const model = mongoose.model("setupGoodbye", setupGoodbye);
module.exports=model;