const {MessageEmbed} = require("discord.js")
module.exports = {
    run: async(client, message, args) => {
        const estadouser = [
            online = "Online",
            idle = "Ausente",
            dnd = "No Molestar",
            invisible = "Invisible/Desconectado"
          ];
          let userm = message.mentions.users.first();
          if (!userm) {
            var user = message.author;
              
            const embed = new MessageEmbed()
              .setThumbnail(user.displayAvatarURL({dynamic: true}))
              .setAuthor("Info de " + user.username + "#" + user.discriminator)
              .setColor("#8C3FAB")
              .addField("Nombre", user.username, true)
              .addField("ID", user.id)
              .addField("Estado", user.presence.status)
              .addField("¿Es un BOT?", user.bot ? user.bot : "No")
              .addField("Apodo", message.member.nickname ? message.member.nickname : "No tiene")
              .addField("Cuenta Creada", user.createdAt.toDateString(),true)
              .addField("Fecha de Ingreso",message.member.joinedAt.toDateString(),true)
      
            message.channel.send(embed);
          } else {
           
            const embed = new MessageEmbed()
              .setThumbnail(userm.displayAvatarURL({dynamic: true}))
              .setAuthor("Info de " + userm.username + "#" + userm.discriminator)
              .setColor("#8C3FAB")
              .addField("Nombre", userm.username, true)
              .addField("ID", userm.id)
              .addField("Estado", estadouser[userm.presence.status])
              .addField("¿Es un BOT?", userm.bot)
              .addField("Cuenta Creada", userm.createdAt.toDateString(), true)
              .addField(
                "Fecha de Ingreso",
                message.member.joinedAt.toDateString(),
                true
              )
              .setFooter(
                "Solicitado por " + message.author.username + "", message.author.avatarURL({dynamic: true}) );
      
            message.channel.send(embed);
          }

    },
    config: {
        name: 'user',
        category: 'Utilidad',
        cooldown:5,
        aliases: ["usuario", "informacion", "userinfo"],
    }
}