const command = {
	config: {
		commandName: 'test',
		commandAliases: ['testing'],
	},
	run: async (_bot, message, args) => {
		message.channel.send('Hello World!')
	},
};

module.exports = command;