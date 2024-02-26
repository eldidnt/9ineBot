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

        message.delete()
        
        let miembro = message.mentions.members.first()  || message.guild.members.cache.get(args[0]);
        if(!miembro) {
          const embed2 = new MessageEmbed()
          .setDescription('`¡Debes mencionar a alguien para poder mutear!`')
          .setColor("YELLOW")
          return message.channel.send(embed2)
        } else if(miembro.roles.highest.comparePositionTo(message.member.roles.highest) > 0){
          const embed3 = new MessageEmbed()
          .setDescription("`Esta persona está en la misma o mayor nivel de jerarquia que tu, no puedes banearlo`")
          .setColor("RED")
          return message.channel.send(embed3)
        };
        
        const embed4 = new MessageEmbed()
          .setDescription("`No puedes mutearte a ti mismo`")
          .setColor("RED")
        if(miembro.id === message.author.id) return message.channel.send(embed4)

        let role = message.guild.roles.cache.find(val => val.name === "Muted");
    if (!role) {
        try {
            role = await message.guild.roles.create({data:{
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
        
  let razon = args.slice(1).join(" ");
  if(!razon) razon = "`No se dio razon`"

  miembro.roles.add(role.id).catch(console.error);
  const mut = new MessageEmbed()
  .setTitle(`🔇 ¡Mute existosamente! 🔇`)
  .setDescription(`**Usuario:** \`${miembro.user.tag}\`\n**Staff:** \`${message.author.tag}\`\n**Razon:** \`${razon}\``)
  .setTimestamp()
  .setColor("#26FF23")
  message.channel.send(mut);

  const mut2 = new MessageEmbed()
  .setTitle(`🔇 Has sido muteado! 🔇`)
  .setDescription(`**Usuario:** \`${miembro.user.tag}\`\n**Staff:** \`${message.author.tag}\`\n**Razon:** \`${razon}\``)
  .setTimestamp()
  .setColor("#26FF23")
  miembro.send(mut2);
    
    },
    config: {
        name: 'mute',
        category: 'Moderacion',
        cooldown:5,
        aliases: ['m','MUTE','Mute']
    }
}