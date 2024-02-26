module.exports = {
    run: async(client, message, args) => {
        message.reply('¡Pong!')

    },
    config: {
        name: 'ping',
        category: 'Utilidad',
        cooldown:5,
        aliases: ["pin"],
    }
}