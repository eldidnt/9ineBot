module.exports = {
  run: async(client, message, args) => {
    const paginas = [
      { nombre: '40Servidoresmc', enlace: '<http://40servidoresmc.es/servidor.php?cod=8053>' },
      { nombre: 'Servidoresdeminecraft', enlace: '<https://servidoresdeminecraft.es/server/vote/Ge70iRQ7/play.skyterra.es>' },
      { nombre: 'Topg', enlace: '<https://topg.org/es/servidores-de-minecraft/server-660447>' },
      { nombre: 'Minecraft-mp', enlace: '<https://minecraft-mp.com/server-s328004>' },
      { nombre: 'Topminecraftservers', enlace: '<https://topminecraftservers.org/server/36443>' },
      { nombre: 'McServidores', enlace: '<https://mcservidores.com/servidor/668>' },
      { nombre: 'PlanetMinecraft', enlace: '<https://www.planetminecraft.com/server/skyterra-network-6168609/>' },
      // Agrega más páginas según sea necesario
    ];

    let respuesta = 'Puedes votar en estas páginas:\n';
    for (const pagina of paginas) {
      respuesta += `- ${pagina.nombre} ${pagina.enlace}\n`;
    }

    message.channel.send(respuesta);
  },
  config: {
    name: 'votar',
    category: 'Utilidad',
    cooldown: 5,
    aliases: ["votar", "voto", "vote", "votos", "votación"],
  }
};
