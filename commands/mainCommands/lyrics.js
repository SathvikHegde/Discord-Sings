require("dotenv").config();

const Genius = require("genius-lyrics");
const Lyrics = new Genius.Client(process.env.LYRICSAPI);

module.exports = {
    name: "lyrics",
    alias: [],
    description: "test command...",
    async execute(message, args, cmd, client, Discord) {
        const searches = await Lyrics.songs.search("Never Gonna Give You Up");

        // Pick first one
        const firstSong = searches[0];
        console.log("About the Song:\n", firstSong, "\n");
        
        // Ok lets get the lyrics
        const lyrics = await firstSong.lyrics();
        console.log("Lyrics of the Song:\n", lyrics, "\n");


    }
};

