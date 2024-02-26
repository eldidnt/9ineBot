module.exports = {
    run: async(client, message, args) => {
        // Comprueba si el miembro tiene el rol requerido
        if (!message.member.roles.cache.has('1188854845214572684')) {
            return message.reply("No tienes permisos para hacer esto.");
        }

        // Comprueba si se especificó una cantidad de mensajes para eliminar
        if (!args[0]) {
            return message.reply("Especifica la cantidad de mensajes que deseas eliminar.");
        }

        // Intenta convertir el primer argumento en un número
        let deleteCount = parseInt(args[0], 10);

        // Incrementa el conteo de borrado en uno para incluir el mensaje del comando
        deleteCount++;

        // Comprueba si el número es válido
        if (!deleteCount || deleteCount < 1 || deleteCount > 100) {
            return message.reply("Por favor, proporciona un número entre 1 y 99 para la cantidad de mensajes a eliminar.");
        }

        // Intenta eliminar los mensajes del canal
        const fetched = await message.channel.messages.fetch({limit: deleteCount});
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`No se pudieron eliminar los mensajes debido a: ${error}`));
    },
    config: {
        name: 'deletemessages',
        category: 'Staff',
        cooldown:5,
        aliases: ['deletemessages','dm'],
    }
};
