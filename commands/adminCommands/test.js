require("dotenv").config();

module.exports = {
  name: "test",
  alias: [],
  description: "test command...",
  execute(message, args, cmd, client, Discord) {
    if(message.author.id != process.env.OWNER_ID) return;
    message.channel.send("Yooooo, I am online and responding!!");
  }
};