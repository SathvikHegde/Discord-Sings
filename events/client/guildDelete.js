const Logger = require("../../utils/logging.js");

module.exports = (Discord, client, guild) =>{
  Logger.leaveGuild(client, guild);
};