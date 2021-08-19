const fs = require("fs");

module.exports = (client, Discord) =>{
  loadCommands(client.commands, "./commands");
  console.log("Loaded Commands");

  function loadCommands(collection, directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const path=`${directory}/${file}`;

      if(file.endsWith(".js")) {
        const command = require(`.${path}`);
        collection.set(command.name, command);
      }
      else if(fs.lstatSync(path).isDirectory()) {
        loadCommands(collection, path);
      }
    }
  }
};