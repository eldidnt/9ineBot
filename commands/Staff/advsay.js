module.exports = {
    run: async(client, message, args) => {
        if(!message.member.roles.cache.has("1188854845214572684")) return message.channel.send("No tienes acceso a eso.");
        
        let canal = message.mentions.channels.first();
        if(!canal) return message.channel.send("Debes mencionar un canal")

        let texto = args.slice(1).join(" ");
        if(!texto) return message.channel.send("Coloca un texto")

        console.log(message.member.displayName+". El usuario envió: \n "+texto);
        canal.send(texto);
        message.delete()
    
    },
    config: {
        name: 'advsay',
        category: 'Staff',
        cooldown:5,
        aliases: ["decir_avanzado"],
    }
}
