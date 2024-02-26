const {MessageEmbed} = require('discord.js');
const {Logs} = require("../../config.json")
module.exports = async (client, message) => {
 try {
  if(!message.author || message.author.bot) return;
  if(message.channel.type === 'dm') return;
  if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
  const log = message.guild.channels.cache.find(log => log.name === Logs)
  if(!log) return;
  if(log.type !== "text") return;
  if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
  
      if(message.attachments.size > 0){
        const embed = new MessageEmbed()
        .setTitle("¡Mensaje imagen eliminado!")
        .setURL(JSON.stringify(message.attachments.filter(w=>w.url)).split('"')[3])
        .setImage(JSON.stringify(message.attachments.filter(w=>w.url)).split('"')[3])
        .addField("Canal", `<#${message.channel.id}> (ID: ${message.channel.id})`)
        .addField("Mensaje ID", `${message.id}`)
        .addField("Enviado por", `<@${message.author.id}> (ID: ${message.author.id})`)
        .setThumbnail(message.author.avatarURL())
        .setFooter(message.guild.name, message.guild.iconURL())
        .setColor('RANDOM')
        .setTimestamp()
        
        
            log.send(embed)
        
      } else {
        if(log) {
        const final = message.toString().substr(0, 500); 
        const event = new MessageEmbed()
         .setTitle(`¡Mensaje eliminado!`)
         .setColor('RANDOM')
         .setThumbnail(message.author.avatarURL())
         .addField("Canal", `<#${message.channel.id}> \`(ID: ${message.channel.id})\``)
         .addField("Mensaje ID", `${message.id}`)
         .addField("Enviado por", `<@${message.author.id}> (ID: ${message.author.id})`)
         .addField("TTS", `${message.tts ? message.tts : "No hay mensaje TTS" }`)
         .addField("Fijado", `${message.pinned ? message.pinned : "No hay mensaje fijado"}`)
         .addField("Mensaje", "\`\`\`" + `${final}` + "\`\`\`")
         .setTimestamp()
         .setFooter(message.guild.name, message.guild.iconURL())
        log.send(event)
      }
  }
 } catch (err) {
  console.log(err);
 }

}