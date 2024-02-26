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
        if(!args[0]) return message.channel.send("**Ingresa la ID del usuario.**")
        let id = args[0]
    
        if(isNaN(id)) return message.channel.send("**Ingresa una ID válida.**")
        if(id == client.user.id) return message.channel.send("**Buena crack, a mi no me puedes desbanear**")
        if(message.guild.members.cache.get(id)) return message.channel.send("**Esa ID le pertenece a uno de los usuarios de este servidor.**")
    
        client.users.fetch(id).then(async (usuario) => { 
          let banusers = await message.guild.fetchBans();
          if(!banusers.has(usuario.id)) return message.channel.send('**Este usuario actualmente no se encuentra baneado en este servidor.**');
     
          const unbannedEmbed = new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({format: 'png', dynamic: true, size: 2048}))
          .setTitle(`¡Desbaneo existosamente!`)
          .setDescription(`**Usuario:** \`${usuario.tag}\`\n**Staff:** \`${message.author.tag}\``)
          .setColor(0x43B581)

          message.guild.members.unban(usuario.id).then(() => {
          message.channel.send(unbannedEmbed)
          }).catch(error => {
            const embedError1 = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({format: 'png', dynamic: true, size: 2048}))
            .setDescription("Error: "+error.message)
            .setColor(0xDC2820)
            return message.channel.send(embedError1)
          })
        }).catch(error => {
          const embedError2 = new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({format: 'png', dynamic: true, size: 2048}))
          .setDescription("El usuario con ese ID no existe. " + `(${error.message})`)
          .setColor(0xDC2828)
          return message.channel.send(embedError2)
        })

    },
    config: {
      name: 'unban',
      category: 'Staff',
      cooldown:5,
      aliases: ['ub','uban']
  }
}