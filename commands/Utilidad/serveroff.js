const {MessageEmbed} = require("discord.js")
module.exports = {
    run: async(client, message, args) => {
        const embedEncendido = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Servidor apagado')
        .setDescription('El servidor está en mantenimiento :red_circle: ')
        .setFooter('SkyTerra Network')
        .setTimestamp();
    let permiso = message.member.hasPermission("ADMINISTRATOR");
    if(permiso) message.channel.send(embedEncendido);
    else return message.channel.send("No tienes acceso a eso.");
    message.delete()

    },
    config: {
        name: 'serveroff',
        category: 'Utilidad',
        cooldown:5,
        aliases: ["svoff", "apagado"],
    }
}