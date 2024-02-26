module.exports = {
    run: async(client, message, args) => {
	
	let respuesta = '- La ip es `play.skyterra.es`\n' + '- Para bedrock es `play.skyterra.es:19132`';
    message.channel.send(respuesta);

    },
    config: {
        name: 'ip',
        category: 'Utilidad',
        cooldown:5,
        aliases: ["server", "servidor", "sv"],
    }
}