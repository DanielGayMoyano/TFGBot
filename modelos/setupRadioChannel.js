const mongoose = require("mongoose");
const setupRadioChannel = new mongoose.Schema({
  guildId: String,
  channelId: String,
});
const model=mongoose.model("setupRadioChannel",setupRadioChannel);
module.exports=model;