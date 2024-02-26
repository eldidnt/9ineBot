const {MessageEmbed} = require('discord.js')
module.exports = {
    run: async(client, message, args) => {
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
          const embed = new MessageEmbed()
            .setDescription("**No tengo el permiso:** `[BAN_MEMBERS]`")
            .setColor("RED")
            return message.channel.send(embed)
          }
        
          if(!message.member.hasPermission("BAN_MEMBERS")){
            const embe = new MessageEmbed()
            .setDescription("**Perdon, pero no tienes el permiso:** `[BAN_MEMBERS]`")
            .setColor("RED")
            return message.channel.send(embe)
          }
      
          let persona = message.mentions.members.first()  || message.guild.members.cache.get(args[0]);
          if(!persona) {
            const embed2 = new MessageEmbed()
            .setDescription('`¡Debes mencionar a alguien para banear!`')
            .setColor("YELLOW")
            return message.channel.send(embed2)
          } else if(persona.roles.highest.comparePositionTo(message.member.roles.highest) > 0){
            const embed3 = new MessageEmbed()
            .setDescription("`Esta persona esta en la misma o mayor nivel de jerarquia que tu, no puedes banearlo`")
            .setColor("RED")
            return message.channel.send(embed3)
          };
          
          var razon = args.slice(1).join(' ') 
          if(!razon) {
            razon = "`Razon no especificada`" 
          }
          
          const embedError = new MessageEmbed()
           .setAuthor(message.author.username, message.author.displayAvatarURL({format: 'png', dynamic: true, size: 2048}))
           .setDescription("Ocurrio un  **Error** desconocido mientras intentaba banear al usuario.")
           .setColor("RED")
          persona.ban({reason: razon}).catch(e => message.channel.send(embedError))
      
          const embedBaneoExitoso = new MessageEmbed()
           .setAuthor(message.author.username, message.author.displayAvatarURL({format: 'png', dynamic: true, size: 2048}))
           .setTitle(`¡Baneo existosamente!`)
           .setDescription(`**Usuario:** \`${persona.user.tag}\`\n**Staff:** \`${message.author.tag}\`\n**Razon:** \`${razon}\``)
           .setColor("#FF2323")
          message.channel.send(embedBaneoExitoso);
      
          const embedUsuario = new MessageEmbed()
           .setAuthor(persona.user.tag)
           .setThumbnail(message.guild.iconURL({format: 'png', dynamic: true, size: 2048}))
           .setDescription(`Has sido baneado de: **${message.guild.name}**`)
           .addField("Baneado por:", `\`${message.author.tag}\``)
           .addField("Razón:", `\`${razon}\``)
           .setColor("#FF2323")
          persona.send(embedUsuario);
    },
    config: {
        name: 'ban',
        category: 'Staff',
        cooldown:5,
        aliases: ['b','B','BAN','Ban']
    }
}