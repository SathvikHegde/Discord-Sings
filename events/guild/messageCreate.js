require("dotenv").config();

const prefix = process.env.PREFIX;

module.exports = (Discord, client, message) => {
  if(message.author.bot || message.channel.type == "dm") return;
  if(!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd) ||
                  client.commands.find(a => a.alias && a.alias.includes(cmd));

  try{
    if(command) command.execute(message, args, cmd, client, Discord);
  }
  catch (err) {
    message.reply("ERROR! Something went wrong. Tell <@531358468989517856> to fix his code.");
    console.log(err);
  }
};