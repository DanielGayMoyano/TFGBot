const mongoose = require("mongoose");
const setupRoleDefault = new mongoose.Schema({
  guildId: String,
  roleId: String,
 
});

const model = mongoose.model("setupRoleDefault", setupRoleDefault);
module.exports=model;
