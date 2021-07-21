/* Importing dependencies */
const { Client, Collection } = require('discord.js');
const { config } = require('dotenv');

/* Set up the config for .env to work */
config();

/* Initiating a new bot client */
const bot = new Client({});

/* Creating a new collection for commands + aliases */
bot.commands = new Collection();
bot.aliases = new Collection();

['commands', 'aliases'].forEach((collection) => {
	bot[collection] = new Collection();
});

/* For the load-commands and load-events file, pass the bot variable so it can be used in the files */
['load-commands', 'load-events'].forEach((handlerFile) => require(`./handlers/${handlerFile}.js`)(bot));

/* Logging into the bot with a Discord token */
bot.login(process.env.DISCORD_TOKEN);