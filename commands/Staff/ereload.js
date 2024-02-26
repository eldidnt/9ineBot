const {MessageEmbed} = require("discord.js")
module.exports = {
    run: async(client, message, args) => {

        if(!args[0])return
  
        let evento = args[0]//obtenemos el evento a reiniciar
        
       eNoPermisos = new MessageEmbed()
       .setTitle("LemonBOT")
       .setDescription("No tienes permisos para hacer esto.")
       .setColor("#05ed1c")
       .setFooter("Bot en desarrollo por Josesillo94     ", client.user.avatarURL())
       .setTimestamp() 

        // Comprueba si el miembro tiene el rol requerido
        if (!message.member.roles.cache.has('1188854845214572684')) {
            return message.channel.send(eNoPermisos);
        }

        try {
          delete require.cache[require.resolve(`../../events/client/${evento}.js`)]
          client.removeAllListeners(`${args[0]}`)
          
          let pull = require(`../../events/client/${evento}.js`)
          
          client.on(evento, pull.bind(null,client))
        }catch(e){
          console.log(e)
          ePermitidoErr = new MessageEmbed()
          .setTitle("LemonBOT")
          .setDescription(`No puedo reiniciar el evento \`${evento.name}\`:\n\`${e.message}\``)
          .setColor("#05ed1c")
          .setFooter("Bot en desarrollo por Josesillo94     ", client.user.avatarURL())
          .setTimestamp() 
          return message.channel.send(ePermitidoErr)
        }
        ePermitido = new MessageEmbed()
        .setTitle("LemonBOT")
        .setDescription(`El evento \`${evento.toUpperCase()}\` ha sido reiniciado`)
        .setColor("#05ed1c")
        .setFooter("Bot en desarrollo por Josesillo94  ", client.user.avatarURL())
        .setTimestamp()
        message.channel.send(ePermitido)

    },
    config: {
        name: 'ereload',
        category: 'Staff',
        cooldown:5,
        aliases: ['ereload'],
    }
};
