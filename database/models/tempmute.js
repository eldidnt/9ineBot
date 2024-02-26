const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Josesillo',
  password: 'SkyterraDatabaseUser7452',
  database: 'SkyterraBotDiscord'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }

  console.log('Se ha conectado a la base de datos');

  const createTempMuteTable = `CREATE TABLE IF NOT EXISTS TempMute (
    guildID VARCHAR(255),
    channelID VARCHAR(255),
    userID VARCHAR(255),
    rolID VARCHAR(255),
    time INT
  )`;

  connection.query(createTempMuteTable, (err, results) => {
    if (err) {
      console.error('Error al crear la tabla TempMute: ' + err.stack);
      return;
    }

  });
});

module.exports = connection;
