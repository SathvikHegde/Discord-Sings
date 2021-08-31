module.exports = {
  name: "test",
  alias: [],
  description: "test command...",
  execute(message, args, cmd, client, Discord) {
    message.channel.send("Yooooo, I am online and responding!!");
  }
};