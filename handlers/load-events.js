/* Importing dependencies */
const { readdirSync } = require('fs');

/* Export the below code so bot.js can access the below code */
module.exports = (bot) => {
     /* Load function */
	const load = (directories) => {
         /* Variable which will house the events */
		let events = [];

         /* Get all events in the folder that end with the .js prefix, if no events are in the folder, error in the console */
		try {
			events = readdirSync(`${__dirname}/../events/${directories}/`).filter((directoryFile) => directoryFile.endsWith('.js'));
		} catch {
			return console.error(`ERROR! The event folder "${directories}" couldn't be loaded.\nERROR! Please ensure a file is added in it to be loaded.`);
		}

         /* For each event in the folder */
		for (const eventFile of events) {
			const event = require(`${__dirname}/../events/${directories}/${eventFile}`);
			const eventName = eventFile.split('.')[0];

             /* If unable to do e.g. bot.on('ready', (bot, etc) => {}) then error in the console, basically checks to make sure the event name actually exists */
			try {
				bot.on(eventName, event.bind(null, bot));
			} catch {
				return console.error(`${redBright('ERROR!')} The event file "${eventFile}" couldn't be loaded.\nERROR! Please ensure an export is included within the file.`);
			}
		}
	};

     /* For each event folder, run the above function (IF YOU WANT MORE FOLDERS FOR EVENTS, ADD THEM HERE)*/
	['bot', 'cmd-handler'].forEach((folder) => load(folder));
};