module.exports = async (bot, message) => {
    /* Setting the prefix variable */
	let prefix = process.env.PREFIX;

    /* If there is no prefix variable in the .env file, return an error in the console */
    if (!prefix) return console.error('ERROR! Missing PREFIX in .env file.')

    /* If the message author is a bot, return */
	if (message.author.bot) return;

    /* Setting the variable for the command arguments the user has sent */
	const commandArguments = message.content.slice(prefix.length).trim().split(/ +/g);

    /* Setting the variable for the command that was inputted */
	const inputtedCommand = commandArguments.shift().toLowerCase();

    /* If the user's message starts with the prefix set, do the following... */
	if (message.content.startsWith(prefix)) {
        /* Set the commandFile variable to the file of the command */
		const commandFile = bot.commands.get(inputtedCommand) || bot.commands.get(bot.aliases.get(inputtedCommand));

        /* If the user inputs a command that doesn't exist, return */
		if (!commandFile) return;

        /* Attempt to run the command, if an error occurs, log it in the console */
        try {
			await commandFile.run(bot, message, commandArguments);
		} catch (errorMessage) {
			console.error(errorMessage);
		}
    }
};