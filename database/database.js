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
});

module.exports = connection;
