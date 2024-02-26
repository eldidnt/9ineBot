    const { splitMessage,MessageEmbed } = require('discord.js')
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

    var blist = await message.guild.fetchBans(); 
    if(blist.size <= 0) return message.channel.send("No hay baneos en el servidor.") 
    var bansID = blist.map(b => '**'+b.user.username +'**: '+ b.user.id).join('\n') 
    const description = '**📌 Usuario y ID:** \n'+bansID 

    let embed = new MessageEmbed() 
    .setColor("RANDOM")
    .setTitle('Lista de Baneos de **'+message.guild.name+'**')
    .setDescription(description)
    .setTimestamp()
    .setThumbnail(message.guild.iconURL({dynamic: true, size: 1024}))

    const splitDescription = splitMessage(description, {
        maxLength: 2048,
        char: "\n",
        prepend: "",
        append: ""
    }); 
  
    splitDescription.forEach(async (m) => {
        embed.setDescription(m);
        message.channel.send(embed).then(m => m.delete({ timeout: 20000 }))
    });

    },
    config: {
        name: 'banlist',
        category: 'Staff',
        cooldown:5,
        aliases: ["BANLIST","Banlist"],
    }
}