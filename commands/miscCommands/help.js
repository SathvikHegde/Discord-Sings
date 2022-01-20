module.exports = {
  name: "help",
  alias: [],
  description: "Get information on differnt commands of this bot!",
  execute(message, args, cmd, client, Discord) {
    const helpembed = new Discord.MessageEmbed()
      .setTitle("Commands")
      .addField("**s!lyrics [song_name]**", "Get lyrics for a song.\nParameters:\n[song_name] - Name of the song to search.\nExample Usage - `s!lyrics faded`")
      .addField("**s!sing [warn_type] [song_name]**", "");

    message.channel.send({embeds: [helpembed]});
  }
};