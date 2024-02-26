const {MessageEmbed} = require("discord.js")
const ms = require("ms")
const MuteDB = require('../../database/models/tempban')
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
            const includeValid = new MessageEmbed()
            .setColor("#c7c1be")
            .setTitle("🚫 `Debes colocar el tiempo que estara baneado, puedes usar: S,M,H`")
            let bantime = args[1]
            if(!bantime) return message.channel.send(includeValid)
            var razon = args.slice(2).join(' ') 
            if(!razon) {
              razon = "`Razon no especificada`"
            }
            const embedUsuario = new MessageEmbed()
             .setAuthor(persona.user.tag)
             .setThumbnail(message.guild.iconURL({format: 'png', dynamic: true, size: 2048}))
             .setDescription(`Has sido baneado temporalmente de: **${message.guild.name}**`)
             .addField("Baneado por:", `\`${message.author.tag}\``)
             .addField("Tiempo:",`\`${bantime}\``)
             .addField("Razón:", `\`${razon}\``)
             .setColor("#FF2323")
             .setFooter("Recuerda que no te podemos notificar por mensaje privado cuando se te agota el tiempo del ban.")
            persona.send(embedUsuario);
            
            const embedError = new MessageEmbed()
             .setAuthor(message.author.username, message.author.displayAvatarURL({format: 'png', dynamic: true, size: 2048}))
             .setDescription("Ocurrio un **Error** desconocido mientras intentaba banear al usuario.")
             .setColor("RED")
            persona.ban({reason: razon}).catch(e => message.channel.send(embedError))
        
            const embedBaneoExitoso = new MessageEmbed()
             .setAuthor(message.author.username, message.author.displayAvatarURL({format: 'png', dynamic: true, size: 2048}))
             .setTitle(`¡Baneo temporal existosamente!`)
             .setDescription(`**Usuario:** \`${persona.user.tag}\`\n**Staff:** \`${message.author.tag}\`\n**Tiempo:** \`${bantime}\`\n**Razon:** \`${razon}\``)
             .setColor("#FF2323")
            message.channel.send(embedBaneoExitoso);

            

            let wc = new MuteDB({ guildID: message.guild.id, channelID:message.channel.id, userID: persona.id, time: Date.now() + ms(bantime) }) //Creamos una colección en la DB con los datos
            await wc.save()

    },
    config: {
      name: 'tempban',
      category: 'Moderacion',
      cooldown:5,
      aliases: ['tpb','tpban']
  }
}