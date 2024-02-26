const {MessageEmbed} = require('discord.js')
const MuteDB = require('../../database/models/tempmute')
const ms = require("ms");
function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

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
      var user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
      if(user == client.user.id) return message.channel.send("**Buena crack, a mi no me puedes desmutear**")
      if(!user) {
        const embed2 = new MessageEmbed()
        .setDescription('`¡Debes mencionar a alguien para poder mutear!`')
        .setColor("YELLOW")
        return message.channel.send(embed2)
      } else if(user.roles.highest.comparePositionTo(message.member.roles.highest) > 0){
        const embed3 = new MessageEmbed()
        .setDescription("`Esta persona esta en la misma o mayor nivel de jerarquia que tu, no puedes banearlo`")
        .setColor("RED")
        return message.channel.send(embed3)
      };
      let data = await MuteDB.findOne({ userID: user.id })
      if (data) return message.channel.send("Ya está Muteado")
        message.delete()
        const cantFindUser = new MessageEmbed()
          .setColor("#c7c1be")
          .setTitle("🚫 Debes mencionar a un usuario")
        const includeValid = new MessageEmbed()
          .setColor("#c7c1be")
          .setTitle("🚫 Debes colocar el tiempo que estara muteado, puedes usar: S,M,H")

         
                
        let mutetime = args[1]
        if(!mutetime) return message.channel.send(includeValid)
    
        var reason = args.splice(2).join(' ') || "`No se dio razon`";

        let role = message.guild.roles.cache.find(val => val.name === "Muted");
    if (!role) {
        try {
            muteRole = await message.guild.roles.create({data:{
                name:"Muted",
                color: "#000000",
                permissions:[]
            }});
      } catch(e) {
        console.log(e.stack);
    }
    }
    message.guild.channels.cache.forEach((channel) => {
      channel.updateOverwrite(role.id, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        CONNECT: false
      }).catch(() => {});
    });
    
        
    
        if(!user) {const fail = await message.channel.send(cantFindUser); wait(3000); fail.delete(); return}
        if(!reason) {const fail = await message.channel.send(includeValid); wait(3000); fail.delete(); return}
       
    
        user.roles.add(role.id)
        
        
        const muted = new MessageEmbed()
            .setColor("#c7c1be")
            .setTitle(`🤐 ¡Mute temporal existosamente! 🤐`)
            .setDescription(`**Usuario:** \`${user.user.tag}\`\n**Staff:** \`${message.author.tag}\`\n**Tiempo:** \`${ms(ms(mutetime))}\`\n**Razon:** \`${reason}\``)
    
        message.channel.send(muted)

        const muted2 = new MessageEmbed()
            .setColor("#c7c1be")
            .setTitle(`🤐 Has sido silenciado temporalmente! 🤐`)
            .setDescription(`**Usuario:** \`${user.user.tag}\`\n**Staff:** \`${message.author.tag}\`\n**Tiempo:** \`${ms(ms(mutetime))}\`\n**Razon:** \`${reason}\``)
            .setTimestamp()
            user.send(muted2);
    
            let wc = new MuteDB({ guildID: message.guild.id, channelID:message.channel.id, userID: user.id, rolID: role.id, time: Date.now() + ms(mutetime) }) //Creamos una colección en la DB con los datos
            await wc.save()

    },
    config: {
      name: 'tempmute',
      category: 'Staff',
      cooldown:5,
      aliases: ['tpm','tpmute']
  }
}