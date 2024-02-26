module.exports = {
  run: async(client, message, args) => {
    // Comprueba si el usuario tiene el rol requerido para reiniciar el bot
    if (!message.member.roles.cache.has('1188854845214572684')) {
      return message.reply('No tienes permiso para usar este comando.');
    }

    // Envía un mensaje al canal antes de que el bot se reinicie
    message.channel.send('Reiniciando...')
      .then(msg => process.exit(1));
  },
  config: {
    name: 'reiniciar',
    category: 'Staff',
    cooldown: 5,
    aliases: ["reiniciar"],
  }
};
