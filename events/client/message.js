const config = require('../../config.json')
const {Collection} = require("discord.js")
module.exports = async (client, message) => {
    if(message.author.bot || message.channel.type === "dm") return;

    if(!message.content.startsWith(config.prefix)) return;
    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if(!commandFile){

    } else {
     var cooldowns = client.cooldowns;
      if (!cooldowns.has(commandFile.config.name)) {
        cooldowns.set(commandFile.config.name, new Collection());
      }
      try {
        const now = Date.now();
        const timestamps = cooldowns.get(commandFile.config.name);
        const cooldownAmount = (commandFile.config.cooldown || 3) * 1000;
        
        if (timestamps.has(message.author.id)) {
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        
          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Debes esperar ${timeLeft.toFixed(1)} segundo(s) para volver a usar este comando`);
          }
        } else {
          timestamps.set(message.author.id, now);
          setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }
      } catch(err) {
       console.log(err);
      }
    }
    if(commandFile){        
        commandFile.run(client, message, args);
    }
}