require("dotenv").config();

const Lyrics = require("genius-lyrics-api");
const paginationEmbed = require("discordjs-button-pagination");

module.exports = {
  name: "start",
  alias: ["sing"],
  description: "Start Singing!",
  async execute(message, args, cmd, client, Discord) {
    if(!args[0]) return message.channel.send("You need to how to warn a user, if in case they sing wrong!");
    if(args[0].toLowerCase() != "dm" && args[0].toLowerCase() != "direct") return message.channel.send("First argument should be either `dm` or `direct`");
    if(!args[1]) return message.channel.send("You need to specify a song to sing!");

    const warntype = args[0].toLowerCase();
    const searchquery = args.slice(1).join(" ");

    const options = {
      apiKey: process.env.LYRICSAPI,
      title: searchquery,
      artist: "",
      optimizeQuery: true
    };

    const searchresult = await Lyrics.searchSong(options) || "Not Found";

    if(searchresult == "Not Found") {
      const searchembed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**No results found for "${searchquery}"**`);

      return message.channel.send({ embeds: [searchembed]});
    }

    let selected;
    let songID;

    if(searchresult.length >= 5) {

      const searchembed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(`Search Results for "${searchquery}"`)
        .setDescription(`1. ${searchresult[0].title}\n2. ${searchresult[1].title}\n3. ${searchresult[2].title}\n4. ${searchresult[3].title}\n5. ${searchresult[4].title}\n`);

      const searchmessage = await message.channel.send({ embeds: [searchembed]});

      const searchoptions = ["1", "2", "3", "4", "5"];
      const filter = msg => msg.author.id == message.author.id && searchoptions.includes(msg.content);

      const selectedmessage = await searchmessage.channel.awaitMessages({ filter, max: 1, time: 20000, errors: ["time"] })
        .catch(collected => {
          return message.channel.send(`<@${message.author.id}> you didn't replied on time.`);
        });

      if(selectedmessage.author && selectedmessage.author.bot == true) return;

      selected = parseInt(selectedmessage.first().content) - 1;

      songID = searchresult[selected].id;
    } else {
      selected = 0;
      songID = searchresult[selected].id;
    }

    const song = await Lyrics.getSongById(songID, process.env.LYRICSAPI);

    if(song.lyrics.length <= 1000) {
      const embed = new Discord.MessageEmbed()
        .setColor("DARK BLUE")
        .setTitle(searchresult[selected].title)
        .setThumbnail(song.albumArt)
        .setDescription(song.lyrics);

      return message.channel.send({ embeds: [embed] });
    } else {
      // eslint-disable-next-line prefer-const
      let pages = [];
      let buttonList = [];
      for(let i = 0; i < song.lyrics.length; i += 1000) {
        const toSend = song.lyrics.substring(i, Math.min(song.lyrics.length, i + 1000));
        const embed = new Discord.MessageEmbed()
          .setColor("DARK BLUE")
          .setTitle(searchresult[selected].title)
          .setThumbnail(song.albumArt)
          .setDescription(toSend);

        pages.push(embed);
      }
      const previousbutton = new Discord.MessageButton()
        .setCustomId("previousbtn")
        .setLabel("Previous")
        .setStyle("DANGER");
      const nextbutton = new Discord.MessageButton()
        .setCustomId("nextbtn")
        .setLabel("Next")
        .setStyle("SUCCESS");

      buttonList = [
        previousbutton,
        nextbutton
      ];

      paginationEmbed(message, pages, buttonList, 60000);

    }

    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
    const embed = new Discord.MessageEmbed()
      .setDescription(`Everyone get ready for the Discord sings of **${searchresult[selected].title}**\n` + "Starting in at about `5` seconds!")
      .setColor("YELLOW");
    message.channel.send({ embeds: [embed] });

    const songarray = await song.lyrics.split("\n");

    for (let i = songarray.length; i--;) {
      if(songarray[i].includes("[")) songarray.splice(i, 1);
      if(songarray[i] == "") songarray.splice(i, 1);
    }
    console.log(songarray);

    await new Promise(resolve => {
      setTimeout(resolve, 4000);
    });
    const embed2 = new Discord.MessageEmbed()
      .setDescription(`Discord sings of **${searchresult[selected].title}** has started!!\n`)
      .setColor("GREEN");
    message.channel.send({ embeds: [embed2] });

    for (let index = 0; index < songarray.length; index++) {
      message.channel.awaitMessages({time: 200000, errors: ["time"] })
        .then(async collected => {
          const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
          if(collected.content.toLowerCase().replace(regex, "") != songarray[index].toLowerCase().replace(regex, "")) {
            collected.delete();
            const warnmsg = await message.channel.send(`<@${collected.author.id}> You sent the wrong lyric! The correct one is **${songarray[index]}**`);
            await new Promise(resolve => {
              setTimeout(resolve, 10000);
            });
            warnmsg.delete();
          }
        })
        .catch(() => {
          return message.channel.send(`<@${message.author.id}> you didn't replied on time.`);
        });
    }
  }
};
