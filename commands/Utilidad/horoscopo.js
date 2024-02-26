const {MessageEmbed} = require("discord.js")
module.exports = {
    run: async(client, message, args) => {

        const Amor = Math.floor(Math.random() * 100);
        const Salud = Math.floor(Math.random() * 100);
        const Suerte = Math.floor(Math.random() * 100);
        const Dinero = Math.floor(Math.random() * 100);
        const embedHoroscope = new MessageEmbed()
        .setTitle("**HORÓSCOPO**")
        .setDescription("Tu horoscopo es:\nAmor: " + Amor + "%, Salud: " + Salud + "%, Suerte: " + Suerte + "%, Dinero: " + Dinero + "%" )
        .setColor('PURPLE')
        .setFooter(`Horoscopo de ${message.author.username}#${message.author.discriminator}`);
        message.channel.send(embedHoroscope);
    },
    config: {
        name: 'horoscopo',
        category: 'Utilidad',
        cooldown:5,
        aliases: ["horoscopo", "prediccion"],
    }
}
