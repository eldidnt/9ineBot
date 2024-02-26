const MuteDB = require('../../database/models/tempmute')
const BanDB = require("../../database/models/tempban")
const mysql = require('mysql2');
const {MessageEmbed} = require("discord.js")

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Josesillo',
  password: 'SkyterraDatabaseUser7452',
  database: 'SkyterraBotDiscord'
});

module.exports = (client) => {

  setInterval(function () { //Inicio del intervalo
    connection.query('SELECT * FROM TempMute', async (err, allData) => {
      if (err) {
        console.error('Error al obtener datos de TempMute: ' + err.stack);
        return;
      }

      allData.map(async a => {
          if (a.time < Date.now()) { //Verificamos cual ya "superó" su tiempo de mute
              let member = client.guilds.resolve(a.guildID).member(a.userID) //Obtenemos el miembro
              client.channels.cache.get(a.channelID).send(new MessageEmbed().setTitle("¡Tiempo terminado del mute!").setDescription(`**Usuario: ** \`${member.user.tag}\``).setColor("GREEN").setTimestamp().setFooter("Skyterra"))
              member.roles.remove(a.rolID) //le quitamos el rol
              member.send(`**${member.user.tag}**,🔊 Se te ha acabado el tiempo del tempmute 🔊`)
              await connection.query('DELETE FROM TempMute WHERE userID = ?', [a.userID]); //Eliminamos el objeto de la DB
          }
      })
    });
  }, 12000)

  setInterval(function () { //Inicio del intervalo
    connection.query('SELECT * FROM TempBan', async (err, allData) => {
      if (err) {
        console.error('Error al obtener datos de TempBan: ' + err.stack);
        return;
      }

      allData.map(async b => {
          if (b.time < Date.now()) { //Verificamos cual ya "superó" su tiempo de mute
         let guild = client.guilds.cache.get(b.guildID)
         let member2 = client.users.cache.get(b.userID)
              guild.members.unban(member2).then(() => {
                  client.channels.cache.get(b.channelID).send(new MessageEmbed().setTitle("¡Tiempo terminado del ban!").setDescription(`**Usuario: ** \`${member.user.tag}\``).setColor("GREEN").setThumbnail(member2.displayAvatarURL()).setTimestamp().setFooter("Skyterra"))
              })
              await connection.query('DELETE FROM TempBan WHERE userID = ?', [b.userID]); //Eliminamos el objeto de la DB
          }
      })
    });
  }, 12000)

  client.user.setActivity('SkyTerra', { type: 'WATCHING'}).catch(console.error);
  console.log("SkyTerra Bot Iniciandose.\nSkyTerra Bot Iniciandose..\nSkyTerra Bot Iniciandose...\nSkyTerra Bot Listo");
}
