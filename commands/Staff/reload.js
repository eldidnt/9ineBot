const {MessageEmbed} = require("discord.js")
const fs = require('fs');
const Discord = require('discord.js');
module.exports = {
    run: async(client, message, args) => {

        let eNoPermisos = new Discord.MessageEmbed()
        .setTitle("LemonBOT")
        .setDescription("No tienes permisos para hacer esto.")
        .setColor("#05ed1c")
        .setFooter("Bot en desarrollo por Josesillo     ", client.user.avatarURL())
        .setTimestamp() 
 
         if(!message.author.id == '469624014160265218') return message.channel.send(eNoPermisos);

        const noArgs = new MessageEmbed()
            .setColor("RED")
            .setDescription(`Ingrese un comando para recargar.`)
            .setTimestamp()
            .setFooter(`Ejecutado por ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
        if (!args.length) return message.channel.send(noArgs);

        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName);

        const noCmd = new MessageEmbed()
            .setColor("RED")
            .setDescription(`Lo siento, el comando **${commandName}** no fue encontrado.`)
            .setTimestamp()
            .setFooter(`Ejecutado por ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
        if (!command) return message.channel.send(noCmd);

        const commandFolders = fs.readdirSync('./commands');
        const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));
        delete require.cache[require.resolve(`../${folderName}/${commandName}.js`)];

        try {
            const newCommand = require(`../${folderName}/${commandName}.js`);
            message.client.commands.set(newCommand.config.name, newCommand);
            const reloadSuccess = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`El comando **${commandName}** Fue recargado con éxito.`)
                .setTimestamp()
                .setFooter(`Ejecutado por ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
            message.channel.send(reloadSuccess);
            console.log(`${commandName} fue recargado.`);
        } catch (error) {
            console.error(error);
            const reloadFailure = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Hubo un error al volver a cargar el comando. **${commandName}**.\n\`\`\`${error}\`\`\``)
                .setTimestamp()
                .setFooter(`Ejecutado por ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
            console.error(error);
            message.channel.send(reloadFailure);
        }

    },
    config: {
        name: 'reload',
        category: 'Staff',
        cooldown:5,
        aliases: [],
    }
}