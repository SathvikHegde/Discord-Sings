const Discord = require("discord.js");
const fs = require("fs");
require("dotenv").config();

//const mongoose = require("mongoose");

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

/*mongoose.connect(process.env.MONGODBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});*/

["commandHandler", "eventHandler"].forEach(handler =>{
  require(`./handlers/${handler}`)(client, Discord);
});

client.login(process.env.TOKEN);