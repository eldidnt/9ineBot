const {MessageEmbed} = require("discord.js")
module.exports = {
    run: async(client, message, args) => {

        let users = message.mentions.users.map(m => m.username).join(" y ");
        if (!users)
        return message.channel.send("> ``Mencione a dos usuarios para calcular``" );
        
        const random = Math.floor(Math.random() * 100);
        let heard = "";
        
        if (random < 50) {
          heard = ":broken_heart:";
        } else if (random < 80) {
          heard = ":sparkling_heart: ";
        } else if (random < 101) {
          heard = ":heart:";
        }
        
        const embed = new MessageEmbed()
          .setTitle("El porcentaje de amor de " + users + " es:")
          .setDescription("         " + heard + " **" + random + "%**" + " " + heard + "\n")
          .setColor("PURPLE")
          .setFooter("Solicitado por " + message.author.username + "", message.author.avatarURL({dynamic: true}));
        
        message.channel.send(embed);

    },
    config: {
        name: 'love',
        category: 'Utilidad',
        cooldown:5,
        aliases: ["amor", "ship"],
    }
}