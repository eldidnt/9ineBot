const {MessageEmbed} = require("discord.js")
module.exports = {
    run: async(client, message, args) => {
        let pregunta = args.slice(0).join(" ");
        if(!pregunta) return message.channel.send("Debes preguntarme algo para que responda");
        let respuestas = [
            "Si",
            "Por supuesto",
            "No hay duda",
            "Para nada",
            "No",
            "Porque me preguntas eso",
            "No tengo idea",
            "No me preguntes",
            "Tu sabras"
        ];
        let respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];
        const embed_respuesta = new MessageEmbed()
        .setTitle("**8ball**")
        .addField("Pregunta:", pregunta)
        .addField("Respuesta:", respuesta)
        .setColor('#8700FF');
        message.channel.send(embed_respuesta);

    },
    config: {
        name: '8ball',
        category: 'Utilidad', // Siempre que crees un comando debes escribir el nombre de la carpeta si no, no lo reconoce
        cooldown:5,
        aliases: ["futuro","future"]
    }
}
