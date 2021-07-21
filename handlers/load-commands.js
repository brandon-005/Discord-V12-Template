/* Importing dependencies */
const { readdirSync } = require('fs');

/* Export the below code so bot.js can access the below code */
module.exports = (bot) => {
    /* Load function */
	const load = (directories) => {
        /* Variable which will house the commands */
		let commands = [];

        /* Get all commands in the folder that end with the .js prefix, if no commands are in the folder, error in the console */
		try {
			commands = readdirSync(`${__dirname}/../commands/${directories}/`).filter((directoryFile) => directoryFile.endsWith('.js'));
		} catch {
			return console.error(`ERROR! The command folder "${directories}" couldn't be loaded.\nERROR! Please ensure a file is added in it to be loaded.`);
		}

        /* For each command in the folder */
		for (const commandFile of commands) {
			const command = require(`${__dirname}/../commands/${directories}/${commandFile}`);

            /* If the command has no config, give an error in the console */
			if (!command.config) return console.error(`ERROR! The command file "${commandFile}" couldn't be loaded.\nERROR! Please ensure the config options are added for it to be loaded.`);
			
            /* Setting the command through referencing the config command name*/
            bot.commands.set(command.config.commandName, command);

            /* If the command config has aliases, add the alias to the command name */
			if (command.config.commandAliases) command.config.commandAliases.forEach((alias) => bot.aliases.set(alias, command.config.commandName));
		}
	};

    /* For each command folder, run the above function (IF YOU WANT MORE FOLDERS FOR COMMANDS, ADD THEM HERE) */
	['fun'].forEach((folder) => load(folder));
};