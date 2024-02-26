const {MessageEmbed} = require("discord.js")
module.exports = {
    run: async(client, message, args) => {
        console.log(message.author.tag +" ha usado avatar")
        let img = message.mentions.users.first();
        if (!img) {
          var embed = new MessageEmbed()
            .setImage(message.author.displayAvatarURL({dynamic: true, size : 1024 }))
            .setColor('#8700FF')
            .setFooter(
              `Avatar de ${message.author.username}#${message.author.discriminator}`
            );
          message.channel.send({ embed });
        } else if (img.avatarURL === null) {
          message.channel.sendMessage(
            "¡El usuario (" + img.username + ") no tiene avatar!"
          );
        } else {
          var embed = new MessageEmbed()
            .setImage(img.displayAvatarURL({dynamic: true, size : 1024 }))
            .setColor('#8700FF')
            .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
          message.channel.send({ embed });
        }

    },
    config: {
        name: 'avatar',
        category: 'Utilidad',
        cooldown:5,
        aliases: ["foto","picture"],
    }
}