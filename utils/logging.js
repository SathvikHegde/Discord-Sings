require("dotenv").config();

function joinGuild(client, guild) {
  client.guild.cache.get(process.env.JOIN_LOG).send(`Joined ${guild.name} with ${guild.cache.size} members`);
}

function leaveGuild(client, guild) {
  client.guild.cache.get(process.env.LEAVE_LOG).send(`Left ${guild.name} with ${guild.cache.size} members`);
}

function logError(client, err, guild) {
  const channel = client.guild.cache.get(process.env.ERROR_LOG);
  channel.send(`Encountered error at ${guild.name} with ${guild.cache.size} members`);
  channel.send({err, code: "xl"});
}

function started(client, guild, name, type, warntype) {
  client.guild.cache.get(process.env.START_LOG).send(`Started in ${guild.name} with ${guild.cache.size} members\nSong Name: ${name}\nType: ${type}\nWarn Type: ${warntype}`);
}

function ended(client, guild, name, type, warntype, reason) {
  client.guild.cache.get(process.env.END_LOG).send(`Ended in ${guild.name} with ${guild.cache.size} members\nSong Name: ${name}\nType: ${type}Warn Type: ${warntype}\n Reason: ${reason}`);
}

module.exports = {
  joinGuild,
  leaveGuild,
  logError,
  started,
  ended
};