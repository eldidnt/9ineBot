module.exports = {
    run: async(client, message, args) => {

        message.reply('Puedes entrar con las versiones `1.8 a 1.20.2`')

    },
    config: {
        name: 'version',
        category: 'Utilidad',
        cooldown:5,
        aliases: ["version"],
    }
}