require('./database/database')
const { Client, Collection } = require('discord.js');
const config = require('./config.json')
const client = new Client({ partials: ['MESSAGE'] });

client.cooldowns = new Collection();

['commands', 'aliases'].forEach(collection => client[collection] = new Collection());
['command','event'].forEach(handler => require(`./handlers/${handler}`)(client));


client.login(config.token).then(() => { 
    console.log(`Estoy listo, soy ${client.user.tag}`);
  })
  .catch((err) => {
    console.error("Error al iniciar sesión: " + err);
  });
  