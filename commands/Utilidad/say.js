module.exports = {
    run: async(client, message, args) => {
        var texto = args.slice(0).join(" ");
        console.log(message.author.tag +" envió:   "+texto);

        message.channel.send(texto);
        message.delete()

    },
    config: {
        name: 'say',
        category: 'Utilidad',
        cooldown:5,
        aliases: ["decir"],
    }
}
