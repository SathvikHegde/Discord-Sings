module.exports = {
  name: "test",
  alias: [],
  description: "test command...",
  execute(message, args, cmd, client, Discord) {
    let str = "you don't.";
    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    str = str.replace(regex, "");
    console.log(str);
    if(str.includes("bruh")) console.log("Yes");
    message.channel.send("Yooooo, I am online and responding!!");
  }
};